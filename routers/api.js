const router = require('express').Router();
const batchController = require('../controllers/batchController');

router.post('/batches', batchController.createBatch);

module.exports = router;
