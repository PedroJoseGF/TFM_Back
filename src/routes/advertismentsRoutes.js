const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', advertisementController.getAdvertisements);
router.post('/', verifyToken, advertisementController.createAdvertisement);
router.put('/:id', verifyToken, advertisementController.updateAdvertisement);
router.delete('/:id', verifyToken, advertisementController.deleteAdvertisement);

module.exports = router;