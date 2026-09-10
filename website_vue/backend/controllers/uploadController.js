const { success, error } = require('../utils/response');

exports.upload = (req, res) => {
  try {
    if (!req.file) {
      return error(res, '未上传文件', 400, 400);
    }
    const url = '/uploads/' + req.file.filename;
    success(res, { url, filename: req.file.filename }, '上传成功');
  } catch (err) {
    error(res, err.message);
  }
};
