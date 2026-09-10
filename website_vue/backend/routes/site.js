const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const { verifyToken } = require('../middleware/auth');

router.get('/', siteController.getAll);
router.put('/', verifyToken, siteController.update);

module.exports = router;
