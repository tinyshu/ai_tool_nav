const pool = require('../config/db');
const { success, error } = require('../utils/response');

exports.list = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const category_id = req.query.category_id;
    let where = 'WHERE 1=1';
    const params = [];
    if (category_id) { where += ' AND n.category_id = ?'; params.push(category_id); }
    const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM news n ${where}`, params);
    const [rows] = await pool.query(
      `SELECT n.*, c.name as category_name FROM news n LEFT JOIN news_categories c ON n.category_id = c.id ${where} ORDER BY n.sort_order ASC, n.id DESC LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );
    success(res, { list: rows, total: countRows[0].total, page, pageSize });
  } catch (err) {
    error(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT n.*, c.name as category_name FROM news n LEFT JOIN news_categories c ON n.category_id = c.id WHERE n.id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return error(res, '记录不存在', 404, 404);
    await pool.query('UPDATE news SET views = views + 1 WHERE id = ?', [req.params.id]);
    rows[0].views += 1;
    success(res, rows[0]);
  } catch (err) {
    error(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { category_id, title, summary, content, cover_image, sort_order, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO news (category_id, title, summary, content, cover_image, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [category_id, title, summary, content, cover_image, sort_order || 0, status !== undefined ? status : 1]
    );
    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { category_id, title, summary, content, cover_image, sort_order, status } = req.body;
    await pool.query(
      'UPDATE news SET category_id = ?, title = ?, summary = ?, content = ?, cover_image = ?, sort_order = ?, status = ? WHERE id = ?',
      [category_id, title, summary, content, cover_image, sort_order, status, req.params.id]
    );
    success(res, null, '更新成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM news WHERE id = ?', [req.params.id]);
    success(res, null, '删除成功');
  } catch (err) {
    error(res, err.message);
  }
};
