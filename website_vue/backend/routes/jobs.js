const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { verifyToken } = require('../middleware/auth');

router.get('/', jobController.list);
router.get('/:id', jobController.getById);
router.post('/', verifyToken, jobController.create);
router.put('/:id', verifyToken, jobController.update);
router.delete('/:id', verifyToken, jobController.remove);

module.exports = router;
