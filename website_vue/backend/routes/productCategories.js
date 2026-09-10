const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productCategoryController');
const { verifyToken } = require('../middleware/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', verifyToken, ctrl.create);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
