const pool = require('../config/db');
const { success, error } = require('../utils/response');

exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count
       FROM product_categories c
       ORDER BY c.sort_order ASC, c.id ASC`
    );
    success(res, rows);
  } catch (err) {
    error(res, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product_categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return error(res, '记录不存在', 404, 404);
    success(res, rows[0]);
  } catch (err) {
    error(res, err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, sort_order, status } = req.body;
    if (!name || !name.trim()) return error(res, '分类名称不能为空');
    const [result] = await pool.query(
      'INSERT INTO product_categories (name, sort_order, status) VALUES (?, ?, ?)',
      [name.trim(), sort_order || 0, status !== undefined ? status : 1]
    );
    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, sort_order, status } = req.body;
    if (!name || !name.trim()) return error(res, '分类名称不能为空');
    await pool.query(
      'UPDATE product_categories SET name = ?, sort_order = ?, status = ? WHERE id = ?',
      [name.trim(), sort_order || 0, status !== undefined ? status : 1, req.params.id]
    );
    success(res, null, '更新成功');
  } catch (err) {
    error(res, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const [[row]] = await pool.query(
      'SELECT COUNT(*) AS cnt FROM products WHERE category_id = ?',
      [req.params.id]
    );
    if (row.cnt > 0) {
      return error(res, `该分类下仍有 ${row.cnt} 个产品, 请先移除或改分类`);
    }
    await pool.query('DELETE FROM product_categories WHERE id = ?', [req.params.id]);
    success(res, null, '删除成功');
  } catch (err) {
    error(res, err.message);
  }
};
