const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/search', userController.getUsers);
router.post('/', verifyToken, userController.createUser);
router.put('/:id', verifyToken, userController.updateUser);
router.put('/restore-password/:id', userController.restorePassword);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;