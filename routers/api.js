const router = require('express').Router();
const batchController = require('../controllers/batchController');

router.post('/batches', batchController.createBatch);

router.get('/batches', batchController.findBatches);

module.exports = router;
