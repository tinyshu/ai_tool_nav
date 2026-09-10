const pool = require('../config/db');
const { success, error } = require('../utils/response');
const { isValidTheme } = require('../utils/theme');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT `key`, `value`, description FROM site_settings');
    const settings = {};
    rows.forEach(row => { settings[row.key] = row.value; });
    success(res, settings);
  } catch (err) {
    error(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const updates = req.body || {};
    if (Object.prototype.hasOwnProperty.call(updates, 'site_theme')) {
      if (!isValidTheme(updates.site_theme)) {
        return error(res, '风格模版无效，请选择 default/tech/traditional/fashion', 400, 400);
      }
    }
    for (const key in updates) {
      await pool.query(
        'INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?',
        [key, updates[key], updates[key]]
      );
    }
    success(res, null, '配置更新成功');
  } catch (err) {
    error(res, err.message);
  }
};
