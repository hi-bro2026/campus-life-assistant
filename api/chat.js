const fs = require("fs");
const path = require("path");

loadLocalEnvFiles();
module.exports = async function handler(req, res) {
  applyCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const message = String(req.body && req.body.message ? req.body.message : "").trim();
    const conversationId = req.body && req.body.conversationId ? String(req.body.conversationId) : "";

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const result = await callCozeAgent(message, conversationId);
    return res.status(200).json({
      reply: result.reply,
      conversationId: result.conversationId || conversationId || ""
    });
  } catch (error) {
    console.error("[api/chat]", error);
    return res.status(500).json({ error: "Failed to call Coze agent" });
  }
};

async function callCozeAgent(message, conversationId) {
  const token = process.env.COZE_API_TOKEN;
  const botId = process.env.COZE_BOT_ID;
  const baseUrl = normalizeBaseUrl(process.env.COZE_API_BASE_URL || "https://api.coze.com");

  if (!token || !botId) {
    throw new Error("Missing COZE_API_TOKEN or COZE_BOT_ID");
  }

  const response = await fetch(buildCozeChatUrl(baseUrl, conversationId), {
    method: "POST",
    headers: buildCozeHeaders(token),
    body: JSON.stringify(buildCozeChatPayload(message, botId))
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Coze stream request failed (${response.status}): ${text.slice(0, 500)}`);
  }

  const result = parseCozeStream(text);
  if (!result.reply) {
    throw new Error("Coze stream did not include an assistant answer");
  }

  return {
    reply: result.reply,
    conversationId: result.conversationId || conversationId || ""
  };
}

function buildCozeChatPayload(message, botId) {
  return {
    bot_id: botId,
    user_id: "campus-life-assistant-user",
    stream: true,
    auto_save_history: true,
    additional_messages: [
      {
        role: "user",
        content: message,
        content_type: "text"
      }
    ]
  };
}

function buildCozeChatUrl(baseUrl, conversationId) {
  const url = `${baseUrl}/v3/chat`;
  if (!conversationId) {
    return url;
  }
  return `${url}?conversation_id=${encodeURIComponent(conversationId)}`;
}

function buildCozeHeaders(token) {
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

function parseCozeStream(text) {
  const blocks = String(text || "").split(/\n\n+/);
  let conversationId = "";
  let deltaReply = "";
  let completedReply = "";

  for (const block of blocks) {
    const eventMatch = block.match(/^event:(.*)$/m);
    const dataMatch = block.match(/^data:(.*)$/m);
    if (!dataMatch) {
      continue;
    }

    const eventName = eventMatch ? eventMatch[1].trim() : "";
    const dataText = dataMatch[1].trim();
    if (!dataText || dataText === "[DONE]") {
      continue;
    }

    let data;
    try {
      data = JSON.parse(dataText);
    } catch (error) {
      continue;
    }

    if (data.conversation_id && !conversationId) {
      conversationId = String(data.conversation_id);
    }

    if (data.role === "assistant" && data.type === "answer") {
      const content = normalizeMessageContent(data.content);
      if (!content) {
        continue;
      }

      if (eventName === "conversation.message.completed") {
        completedReply = content;
      } else if (eventName === "conversation.message.delta") {
        deltaReply += content;
      }
    }
  }

  return {
    reply: completedReply || deltaReply,
    conversationId
  };
}

function normalizeMessageContent(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map(normalizeMessageContent).filter(Boolean).join("\n");
  }
  if (typeof content === "object") {
    return content.text || content.content || content.value || "";
  }
  return String(content);
}

function loadLocalEnvFiles() {
  const projectRoot = path.resolve(__dirname, "..");
  const candidates = [".env.local", ".env", path.join("server", ".env")];

  for (const relativePath of candidates) {
    const envPath = path.join(projectRoot, relativePath);
    if (!fs.existsSync(envPath)) {
      continue;
    }

    const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
      if (!match) {
        continue;
      }

      const key = match[1];
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}
function normalizeBaseUrl(value) {
  return String(value || "https://api.coze.com").replace(/\/+$/, "");
}

function applyCorsHeaders(req, res) {
  const origin = req.headers.origin || "";
  const allowedOrigin = getAllowedOrigin(origin);

  if (allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function getAllowedOrigin(origin) {
  if (!origin) {
    return "";
  }

  const configuredOrigin = normalizeBaseUrl(process.env.STATIC_SITE_ORIGIN || "");
  if (configuredOrigin && origin === configuredOrigin) {
    return origin;
  }

  if (/^https:\/\/[a-z0-9-]+\.github\.io$/i.test(origin)) {
    return origin;
  }

  if (origin === "https://campus-life-assistant.vercel.app") {
    return origin;
  }

  return "";
}
