const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { verifyToken } = require('../middleware/auth');

router.get('/', companyController.list);
router.get('/:id', companyController.getById);
router.post('/', verifyToken, companyController.create);
router.put('/:id', verifyToken, companyController.update);
router.delete('/:id', verifyToken, companyController.remove);

module.exports = router;
