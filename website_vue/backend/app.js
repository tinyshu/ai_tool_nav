const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_DIST = path.join(__dirname, '..', 'frontend', 'dist');

if (!process.env.JWT_SECRET) {
  console.error('[安全] 请在 .env 中设置 JWT_SECRET，否则无法安全签发登录令牌');
  if (NODE_ENV === 'production') process.exit(1);
}

// 生产环境建议置于反向代理后（Nginx / Caddy / 云负载均衡）
if (process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1);
}

// CORS：同域托管前端时可不放开；开发或前后端分离时用 CORS_ORIGIN 白名单
const corsOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // 同域请求、服务端请求无 Origin
      if (!origin) return callback(null, true);
      if (NODE_ENV !== 'production' && corsOrigins.length === 0) {
        return callback(null, true);
      }
      if (corsOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// 上传文件
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/site', require('./routes/site'));
app.use('/api/banners', require('./routes/banners'));
app.use('/api/company', require('./routes/company'));
app.use('/api/product-categories', require('./routes/productCategories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/news', require('./routes/news'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/links', require('./routes/links'));
app.use('/api/upload', require('./routes/upload'));

// 生产：同源托管 Vue 构建产物（子域名方案，前端无需改 base）
const serveFrontend = NODE_ENV === 'production' || process.env.SERVE_FRONTEND === '1';
if (serveFrontend && fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
  });
} else if (serveFrontend) {
  console.warn(`[提示] 未找到前端构建目录 ${FRONTEND_DIST}，请先执行 frontend 的 npm run build`);
}

app.use((err, _req, res, _next) => {
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ code: 403, message: 'CORS 拒绝' });
  }
  console.error(err);
  res.status(500).json({ code: 500, message: '服务器错误' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${NODE_ENV})`);
});
