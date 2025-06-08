const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.get('/', emailController.testRoute);
router.post('/send-email', emailController.sendEmail);
router.post('/sendWelcomeEmail', emailController.sendWelcomeEmail);

module.exports = router;