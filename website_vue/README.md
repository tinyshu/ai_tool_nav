# 企业官网 / 管理后台（website_vue）

Vue 3 前台 + Express API + MySQL。  
**公网演示推荐：子域名**（改动最小、与 EdgeOne 导航站隔离）。

## 为什么用子域名而不是 `/corp` 路径

| | 子域名 `corp.导航域名` | 路径 `/corp` |
|--|--|--|
| 前端改动 | 几乎无（根路径 `/`） | 需改 Vite base、Router、API、硬编码跳转 |
| 与导航站 | 完全隔离 | 要塞进 EdgeOne Pages + 反代 API |
| 后端 | 一台小主机即可 | 仍需外挂 Express+MySQL |

导航站继续留在 [EdgeOne Pages](https://console.cloud.tencent.com/edgeone/makers)；官网单独部署到可公网访问的主机，DNS 加一条子域名即可，**无需新购域名**。

## 访问示例

- 官网：`https://corp.你的导航域名.com/`
- 后台：`https://corp.你的导航域名.com/admin/login`
- API：同域 `/api/*`（前端已用相对路径，无需改）

## 本地开发

```bash
# 1. 依赖
npm run install:all
# 或分别：frontend / backend 目录 npm install

# 2. 配置 backend/.env（参考 backend/.env.example）
# 3. 初始化库
npm run init-db

# 4. 两个终端
npm run dev:backend   # 默认 :3000
npm run dev:frontend  # :5173，已代理 /api、/uploads
```

## 生产部署（最小流程）

### 1. 服务器

任意可公网访问的 Linux 小主机（轻量云服务器即可）：Node 18+、MySQL 8。

### 2. 构建并启动

```bash
cd website_vue
npm run install:all
cp backend/.env.example backend/.env   # 填写 JWT_SECRET、数据库等
npm run init-db
npm run build                          # 生成 frontend/dist
npm install                            # 安装根目录 cross-env（可选）
NODE_ENV=production node backend/app.js
# 或：npm start（需先 npm install 根目录）
```

生产模式下 Express 会：

- 提供 `/api`、`/uploads`
- 托管 `frontend/dist`，并做 SPA History fallback

建议用 **pm2** 守护：`pm2 start backend/app.js --name corp-site --env production`

### 3. HTTPS + 子域名（推荐 Nginx）

在导航域名的 DNS（腾讯云解析 / EdgeOne 域名管理）增加：

```text
类型  CNAME 或 A
主机  corp
记录  指向你的服务器 IP 或负载均衡
```

Nginx 示例：

```nginx
server {
  listen 443 ssl;
  server_name corp.你的导航域名.com;

  # ssl_certificate ...;
  # ssl_certificate_key ...;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 20m;
  }
}
```

`.env` 中设置 `TRUST_PROXY=1`。前后端同域时 **CORS_ORIGIN 可留空**。

### 4. 安全清单（必做）

- [ ] `JWT_SECRET` 使用长随机串，生产未配置会拒绝启动
- [ ] 数据库账号最小权限，不使用弱默认密码
- [ ] 仅开放 80/443，Node 端口不对公网暴露
- [ ] 后台账号使用强密码；演示结束后可关停或改防火墙
- [ ] 勿将 `backend/.env`、`uploads` 明文提交仓库

## 与导航站的关系

- 导航：EdgeOne Pages，域名根站不变
- 官网：`corp.` 子域名 → 本项目服务器
- 客户访问两个入口即可；无需改导航站代码、无需 `/corp` 路径改造
