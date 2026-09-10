const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyToken } = require('../middleware/auth');

router.get('/', newsController.list);
router.get('/:id', newsController.getById);
router.post('/', verifyToken, newsController.create);
router.put('/:id', verifyToken, newsController.update);
router.delete('/:id', verifyToken, newsController.remove);

module.exports = router;
