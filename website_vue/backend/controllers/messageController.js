const pool = require('../config/db');
const { success, error } = require('../utils/response');

exports.list = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const status = req.query.status;
    let where = 'WHERE 1=1';
    const params = [];
    if (status !== undefined) { where += ' AND status = ?'; params.push(status); }
    const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM messages ${where}`, params);
    const [rows] = await pool.query(
      `SELECT * FROM messages ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );
    success(res, { list: rows, total: countRows[0].total, page, pageSize });
  } catch (err) {
    error(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return error(res, '记录不存在', 404, 404);
    success(res, rows[0]);
  } catch (err) {
    error(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, phone, email, content } = req.body;
    if (!name || !content) return error(res, '姓名和留言内容不能为空', 400, 400);
    const [result] = await pool.query(
      'INSERT INTO messages (name, phone, email, content) VALUES (?, ?, ?, ?)',
      [name, phone, email, content]
    );
    success(res, { id: result.insertId }, '提交成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.reply = async (req, res) => {
  try {
    const { reply } = req.body;
    await pool.query('UPDATE messages SET reply = ?, status = 1 WHERE id = ?', [reply, req.params.id]);
    success(res, null, '回复成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM messages WHERE id = ?', [req.params.id]);
    success(res, null, '删除成功');
  } catch (err) {
    error(res, err.message);
  }
};
