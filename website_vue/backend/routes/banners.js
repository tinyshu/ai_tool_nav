const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const { verifyToken } = require('../middleware/auth');

router.get('/', bannerController.list);
router.get('/:id', bannerController.getById);
router.post('/', verifyToken, bannerController.create);
router.put('/:id', verifyToken, bannerController.update);
router.delete('/:id', verifyToken, bannerController.remove);

module.exports = router;
