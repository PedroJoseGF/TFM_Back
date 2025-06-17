const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', announcementController.getAnnouncements);
router.post('/', verifyToken, announcementController.createAnnouncement);
router.post('/search', announcementController.getAnnouncements);
router.put('/:id', verifyToken, announcementController.updateAnnouncement);
router.delete('/:id', verifyToken, announcementController.deleteAnnouncement);

module.exports = router;