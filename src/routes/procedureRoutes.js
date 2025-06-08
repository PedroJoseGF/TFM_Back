const express = require('express');
const multer = require('multer');
const router = express.Router();
const procedureController = require('../controllers/procedureController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', procedureController.getProceduresController);
router.get('/:id', procedureController.getProceduresById);
router.post('/', upload.single('file'), procedureController.createdProcedure);
router.put('/:id', upload.single('file'), procedureController.updatedProcedure);
router.delete('/:id', procedureController.deletedProcedure);

module.exports = router;