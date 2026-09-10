const THEME_IDS = new Set(['default', 'tech', 'traditional', 'fashion']);

function isValidTheme(id) {
  return THEME_IDS.has(id);
}

module.exports = { THEME_IDS, isValidTheme };
