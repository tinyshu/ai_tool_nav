const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { success, error } = require('../utils/response');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return error(res, '用户名和密码不能为空', 400, 400);
    }
    const [rows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return error(res, '用户名或密码错误', 401, 401);
    }
    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return error(res, '用户名或密码错误', 401, 401);
    }
    if (!user.status) {
      return error(res, '账号已被禁用', 403, 403);
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    success(res, { token, user: { id: user.id, username: user.username, nickname: user.nickname, role: user.role } }, '登录成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, nickname, avatar, role, status FROM admin_users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return error(res, '用户不存在', 404, 404);
    success(res, rows[0]);
  } catch (err) {
    error(res, err.message);
  }
};
