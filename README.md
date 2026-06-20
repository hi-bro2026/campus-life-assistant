# 江财现经管校园生活助手

江财现经管校园生活助手是一个面向学生的校园生活服务网站，整合新生指南、校园办事、常用路线、校园服务查询和小橘 AI 校园问答，帮助同学更快找到校园生活中常用的信息与流程。

在线访问：<https://campus-life-assistant.vercel.app>

## 项目功能

- 首页：提供校园服务入口、搜索入口和项目导航。
- 新生指南：整理入学、生活、校园路线等新生常用信息。
- 校园办事：展示校园卡、请假、电费、报修、成绩查询、校园网/VPN 等事务流程。
- 小橘校园助手：通过前端聊天面板调用后端接口，再由后端安全请求 Coze Bot。
- 登录/注册/个人中心：使用前端本地存储模拟基础账号与资料管理流程。
- Vercel 部署：使用 Serverless Function 隐藏 Coze Token，前端统一请求 `/api/chat`。

## 技术栈

- 前端：HTML、CSS、JavaScript
- 后端接口：Vercel Serverless Function / Node.js
- AI 能力：Coze API
- 部署平台：Vercel

## 项目结构

```text
.
├── api/
│   └── chat.js              # Vercel Serverless Function，负责安全调用 Coze API
├── css/
│   └── style.css            # 全站样式
├── images/
│   └── vercel-assets/       # 部署用图片资源
├── js/
│   ├── common.js            # 公共导航、小橘助手等逻辑
│   ├── main.js              # 首页逻辑
│   ├── guide.js             # 新生指南逻辑
│   ├── service.js           # 校园办事页逻辑
│   └── auth.js              # 登录注册相关逻辑
├── index.html               # 首页
├── guide.html               # 新生指南
├── service.html             # 校园办事
├── about.html               # 关于项目
├── login.html               # 登录页
├── register.html            # 注册页
├── profile.html             # 个人中心
├── vercel.json              # Vercel 部署配置
└── package.json             # 项目脚本配置
```

## 本地运行

本项目的聊天接口依赖 Vercel 本地开发环境，建议使用 `vercel dev` 启动，不要直接双击 HTML 文件测试小橘助手。

```powershell
cd D:\campus-life-assistant
npx vercel dev
```

启动后访问：

```text
http://localhost:3000
```

## 环境变量

本地开发时，在项目根目录创建 `.env.local`：

```env
COZE_API_TOKEN=你的 Coze API Token
COZE_BOT_ID=你的 Coze Bot ID
COZE_API_BASE_URL=https://api.coze.cn
```

线上部署时，需要在 Vercel 项目后台配置同名环境变量：

```text
COZE_API_TOKEN
COZE_BOT_ID
COZE_API_BASE_URL
```

如果使用海外 Coze 服务，`COZE_API_BASE_URL` 可能需要改为：

```text
https://api.coze.com
```

## 安全说明

- 不要把 `.env`、`.env.local`、`server/.env` 上传到 GitHub。
- Coze Token 只能放在本地环境变量或 Vercel 后台环境变量里。
- 前端代码不能直接写 Coze Token。
- 当前前端统一请求 `/api/chat`，由 `api/chat.js` 在服务端读取环境变量并调用 Coze API。

## Vercel 部署步骤

1. 将项目推送到 GitHub。
2. 在 Vercel 中导入 GitHub 仓库。
3. Framework Preset 选择 `Other` 或保持默认。
4. Root Directory 保持项目根目录。
5. 在 Vercel 的 Environment Variables 中添加 `COZE_API_TOKEN`、`COZE_BOT_ID`、`COZE_API_BASE_URL`。
6. 触发部署。
7. 部署完成后打开 Vercel 提供的网址测试页面与小橘助手。

## 当前说明

当前仓库是适合 Vercel 部署的轻量版本，包含网站运行所需页面、脚本、样式、Serverless API 和已适配的图片资源。部分原始大文件资料没有放入仓库，以减少部署体积并提升上传稳定性。
