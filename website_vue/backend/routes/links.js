const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const { verifyToken } = require('../middleware/auth');

router.get('/', linkController.list);
router.get('/:id', linkController.getById);
router.post('/', verifyToken, linkController.create);
router.put('/:id', verifyToken, linkController.update);
router.delete('/:id', verifyToken, linkController.remove);

module.exports = router;
