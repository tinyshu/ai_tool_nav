const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/auth');

router.get('/', productController.list);
router.get('/:id', productController.getById);
router.post('/', verifyToken, productController.create);
router.put('/:id', verifyToken, productController.update);
router.delete('/:id', verifyToken, productController.remove);

module.exports = router;
