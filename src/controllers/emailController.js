const emailService = require('../services/emailService');
const  userService = require('../services/userService');

const sendEmail = async (req, res) => {
    try {
        const result = await emailService.sendEmail(req.body);

        if (result.sucess) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error en el controller de email:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const sendWelcomeEmail = async (req, res) => {
    try {
        let userData = req.body;
        const result = await emailService.sendWelcomeEmail(userData);
        if (result.sucess) {
            let date = new Date();
            userData.restorePasswordDate = new Date(date.setDate(new Date().getDate() + 1));
            await userService.updateUser(userData._id, userData);
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error en el controller de email:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const testRoute = (req, res) => {
    res.send('Servidor de emails funcionando correctamente.');
};

module.exports = { sendEmail, sendWelcomeEmail, testRoute };