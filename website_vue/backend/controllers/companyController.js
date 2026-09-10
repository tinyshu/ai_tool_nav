const pool = require('../config/db');
const { success, error } = require('../utils/response');

exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM company_profiles ORDER BY sort_order ASC, id ASC');
    success(res, rows);
  } catch (err) {
    error(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM company_profiles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return error(res, '记录不存在', 404, 404);
    success(res, rows[0]);
  } catch (err) {
    error(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { title, content, type, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO company_profiles (title, content, type, sort_order) VALUES (?, ?, ?, ?)',
      [title, content, type || 'about', sort_order || 0]
    );
    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { title, content, type, sort_order } = req.body;
    await pool.query(
      'UPDATE company_profiles SET title = ?, content = ?, type = ?, sort_order = ? WHERE id = ?',
      [title, content, type, sort_order, req.params.id]
    );
    success(res, null, '更新成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM company_profiles WHERE id = ?', [req.params.id]);
    success(res, null, '删除成功');
  } catch (err) {
    error(res, err.message);
  }
};
