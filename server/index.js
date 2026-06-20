const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;
const PROJECT_ROOT = path.resolve(__dirname, "..");

app.use(express.json({ limit: "1mb" }));
app.use(express.static(PROJECT_ROOT));

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body && req.body.message ? req.body.message : "").trim();
    const conversationId = req.body && req.body.conversationId ? String(req.body.conversationId) : "";

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const result = await callCozeAgent(message, conversationId);
    return res.json({
      reply: result.reply,
      conversationId: result.conversationId || conversationId || ""
    });
  } catch (error) {
    console.error("[api/chat]", error);
    return res.status(500).json({ error: "Failed to call Coze agent" });
  }
});
app.post("/api/chat/stream", async (req, res) => {
  try {
    const message = String(req.body && req.body.message ? req.body.message : "").trim();
    const conversationId = req.body && req.body.conversationId ? String(req.body.conversationId) : "";

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    });

    await streamCozeAgent(message, conversationId, {
      onConversationId: (id) => writeServerEvent(res, "conversation", { conversationId: id }),
      onDelta: (content) => writeServerEvent(res, "delta", { content }),
      onDone: (id) => writeServerEvent(res, "done", { conversationId: id || conversationId || "" })
    });
    res.end();
  } catch (error) {
    console.error("[api/chat/stream]", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to call Coze agent" });
    }
    writeServerEvent(res, "error", { message: "Failed to call Coze agent" });
    res.end();
  }
});
async function callCozeAgent(message, conversationId) {
  const token = process.env.COZE_API_TOKEN;
  const botId = process.env.COZE_BOT_ID;
  const baseUrl = normalizeBaseUrl(process.env.COZE_API_BASE_URL || "https://api.coze.com");

  if (!token || !botId) {
    throw new Error("Missing COZE_API_TOKEN or COZE_BOT_ID in server/.env");
  }

  // Coze PAT may not have listMessage permission. To avoid requiring that
  // extra scope, the server reads Coze's SSE stream internally and returns the
  // complete answer to the static frontend after aggregation.
  const createPayload = buildCozeChatPayload(message, conversationId);
  const response = await fetch(buildCozeChatUrl(baseUrl, conversationId), {
    method: "POST",
    headers: buildCozeHeaders(token),
    body: JSON.stringify(createPayload)
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

async function streamCozeAgent(message, conversationId, handlers) {
  const token = process.env.COZE_API_TOKEN;
  const botId = process.env.COZE_BOT_ID;
  const baseUrl = normalizeBaseUrl(process.env.COZE_API_BASE_URL || "https://api.coze.com");

  if (!token || !botId) {
    throw new Error("Missing COZE_API_TOKEN or COZE_BOT_ID in server/.env");
  }

  const response = await fetch(buildCozeChatUrl(baseUrl, conversationId), {
    method: "POST",
    headers: buildCozeHeaders(token),
    body: JSON.stringify(buildCozeChatPayload(message, conversationId))
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Coze stream request failed (${response.status}): ${text.slice(0, 500)}`);
  }

  await readCozeStream(response, handlers || {});
}

function buildCozeChatPayload(message) {
  const payload = {
    bot_id: process.env.COZE_BOT_ID,
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

  return payload;
}
function buildCozeChatUrl(baseUrl, conversationId) {
  const url = `${baseUrl}/v3/chat`;
  if (!conversationId) {
    return url;
  }
  return `${url}?conversation_id=${encodeURIComponent(conversationId)}`;
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

async function readCozeStream(response, handlers) {
  const reader = response.body && response.body.getReader ? response.body.getReader() : null;
  if (!reader) {
    const text = await response.text();
    replayCozeStreamBlocks(text, handlers);
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) {
      break;
    }

    buffer += decoder.decode(chunk.value, { stream: true });
    const blocks = buffer.split(/\n\n+/);
    buffer = blocks.pop() || "";
    replayCozeStreamBlocks(blocks.join("\n\n"), handlers);
  }

  buffer += decoder.decode();
  replayCozeStreamBlocks(buffer, handlers);
}

function replayCozeStreamBlocks(text, handlers) {
  const blocks = String(text || "").split(/\n\n+/);
  for (const block of blocks) {
    const event = parseCozeStreamBlock(block);
    if (!event) {
      continue;
    }

    const data = event.data;
    if (data.conversation_id && handlers.onConversationId) {
      handlers.onConversationId(String(data.conversation_id));
    }

    if (data.role === "assistant" && data.type === "answer") {
      const content = normalizeMessageContent(data.content);
      if (content && event.name === "conversation.message.delta" && handlers.onDelta) {
        handlers.onDelta(content);
      }
      if (event.name === "conversation.message.completed" && handlers.onDone) {
        handlers.onDone(data.conversation_id ? String(data.conversation_id) : "");
      }
    }
  }
}

function parseCozeStreamBlock(block) {
  const eventMatch = String(block || "").match(/^event:(.*)$/m);
  const dataMatch = String(block || "").match(/^data:(.*)$/m);
  if (!dataMatch) {
    return null;
  }

  const dataText = dataMatch[1].trim();
  if (!dataText || dataText === "[DONE]") {
    return null;
  }

  try {
    return {
      name: eventMatch ? eventMatch[1].trim() : "",
      data: JSON.parse(dataText)
    };
  } catch (error) {
    return null;
  }
}

function writeServerEvent(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data || {})}\n\n`);
}
async function waitForCozeChatCompleted(baseUrl, token, conversationId, chatId) {
  const maxAttempts = 30;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const result = await cozeRequest(`${baseUrl}/v3/chat/retrieve?conversation_id=${encodeURIComponent(conversationId)}&chat_id=${encodeURIComponent(chatId)}`, {
      method: "GET",
      headers: buildCozeHeaders(token)
    });
    const data = unwrapCozeData(result);
    const status = String(data.status || "").toLowerCase();

    if (["completed", "success", "succeeded"].includes(status)) {
      return data;
    }
    if (["failed", "error", "canceled", "cancelled"].includes(status)) {
      throw new Error(`Coze chat failed with status: ${status}`);
    }

    await delay(1000);
  }

  throw new Error("Timed out waiting for Coze chat completion");
}

async function cozeRequest(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error(`Coze returned non-JSON response (${response.status}): ${text.slice(0, 200)}`);
  }

  if (!response.ok) {
    throw new Error(`Coze request failed (${response.status}): ${JSON.stringify(json)}`);
  }

  if (json.code && json.code !== 0) {
    throw new Error(`Coze API error: ${JSON.stringify(json)}`);
  }

  return json;
}

function buildCozeHeaders(token) {
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

function unwrapCozeData(payload) {
  return payload && payload.data ? payload.data : payload || {};
}

function extractReply(payload) {
  const data = unwrapCozeData(payload);
  const messageLists = [
    data.messages,
    data.message_list,
    data.items,
    Array.isArray(data) ? data : null,
    payload && payload.messages
  ].filter(Array.isArray);

  for (const messages of messageLists) {
    const answer = [...messages].reverse().find((item) => {
      const role = String(item.role || "").toLowerCase();
      const type = String(item.type || "").toLowerCase();
      return role === "assistant" || type === "answer";
    });
    const content = normalizeMessageContent(answer && answer.content);
    if (content) return content;
  }

  return normalizeMessageContent(data.answer || data.reply || data.content || data.output_text);
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

function cleanReplyText(text) {
  return String(text || "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\s+\*\s*$/gm, "")
    .trim();
}

function normalizeBaseUrl(value) {
  return String(value || "https://api.coze.com").replace(/\/+$/, "");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Campus Life Assistant server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, callCozeAgent, streamCozeAgent, parseCozeStream, cleanReplyText };
