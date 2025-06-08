const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/:folder/:filename', fileController.sendImage);
router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/download/:filename', verifyToken, fileController.downloadFile);
router.get('/list', verifyToken, fileController.listFiles);
router.delete('/delete/:filename', verifyToken, fileController.deleteFile);

module.exports = router;