const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, '未提供Token', 401, 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, 'Token无效或已过期', 401, 401);
  }
}

module.exports = { verifyToken };
