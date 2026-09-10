const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, messageController.list);
router.get('/:id', verifyToken, messageController.getById);
router.post('/', messageController.create);
router.put('/:id', verifyToken, messageController.reply);
router.delete('/:id', verifyToken, messageController.remove);

module.exports = router;
