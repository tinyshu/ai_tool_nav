const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, adminController.list);
router.get('/:id', verifyToken, adminController.getById);
router.post('/', verifyToken, adminController.create);
router.put('/:id', verifyToken, adminController.update);
router.delete('/:id', verifyToken, adminController.remove);

module.exports = router;
