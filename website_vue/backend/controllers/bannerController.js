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
    const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM banners ${where}`, params);
    const [rows] = await pool.query(
      `SELECT * FROM banners ${where} ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );
    success(res, { list: rows, total: countRows[0].total, page, pageSize });
  } catch (err) {
    error(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM banners WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return error(res, '记录不存在', 404, 404);
    success(res, rows[0]);
  } catch (err) {
    error(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { title, image, link, sort_order, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO banners (title, image, link, sort_order, status) VALUES (?, ?, ?, ?, ?)',
      [title, image, link, sort_order || 0, status !== undefined ? status : 1]
    );
    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { title, image, link, sort_order, status } = req.body;
    await pool.query(
      'UPDATE banners SET title = ?, image = ?, link = ?, sort_order = ?, status = ? WHERE id = ?',
      [title, image, link, sort_order, status, req.params.id]
    );
    success(res, null, '更新成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM banners WHERE id = ?', [req.params.id]);
    success(res, null, '删除成功');
  } catch (err) {
    error(res, err.message);
  }
};
