function success(res, data = null, message = '操作成功') {
  res.json({ code: 200, message, data });
}

function error(res, message = '操作失败', code = 500, statusCode = 500) {
  res.status(statusCode).json({ code, message, data: null });
}

module.exports = { success, error };
