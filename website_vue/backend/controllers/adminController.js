const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const { success, error } = require('../utils/response');

exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, nickname, avatar, role, status, created_at FROM admin_users ORDER BY id ASC');
    success(res, rows);
  } catch (err) {
    error(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, nickname, avatar, role, status FROM admin_users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return error(res, '记录不存在', 404, 404);
    success(res, rows[0]);
  } catch (err) {
    error(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { username, password, nickname, role, status } = req.body;
    const [exists] = await pool.query('SELECT id FROM admin_users WHERE username = ?', [username]);
    if (exists.length > 0) return error(res, '用户名已存在', 400, 400);
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO admin_users (username, password, nickname, role, status) VALUES (?, ?, ?, ?, ?)',
      [username, hash, nickname, role || 'editor', status !== undefined ? status : 1]
    );
    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { username, nickname, role, status } = req.body;
    const updates = [];
    const params = [];
    if (nickname !== undefined) { updates.push('nickname = ?'); params.push(nickname); }
    if (role !== undefined) { updates.push('role = ?'); params.push(role); }
    if (status !== undefined) { updates.push('status = ?'); params.push(status); }
    if (req.body.password) {
      const hash = await bcrypt.hash(req.body.password, 10);
      updates.push('password = ?'); params.push(hash);
    }
    params.push(req.params.id);
    await pool.query(`UPDATE admin_users SET ${updates.join(', ')} WHERE id = ?`, params);
    success(res, null, '更新成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM admin_users WHERE id = ?', [req.params.id]);
    success(res, null, '删除成功');
  } catch (err) {
    error(res, err.message);
  }
};
