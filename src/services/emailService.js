const { createTransport, config } = require('../config/config');
const templateEmail = require('../templates/welcomeEmail');
const path = require('path');

const sendEmail = async (data) => {
    const { name, email } = data;
    const transporter = createTransport();

    const mailOptions = {
        from: config.EMAIL_USER,
        to: email,
        name: name
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ', info.response);
        return { sucess: true, message: 'Correo enviado exitosamente.' };
    } catch (error) {
        console.error('Error al enviar el email:', error);
        return { sucess: false, error: 'Error al enviar el correo.'}
    }
};

const sendWelcomeEmail = async (data) => {
    const { _id, email, name, surname, role } = data;
    const imagenPath = path.join(__dirname, '../templates/logos/logo.png');
    const transporter = createTransport();

    const mailOptions = {
        from: config.EMAIL_USER,
        to: email,
        subject: 'Bienvenido a Mi Ayuntamiento',
        html: templateEmail.welcomeEmail(_id, name + ' ' + surname, role),
        attachments: [
            {
              filename: 'logo.png',
              path: imagenPath,
              contentType: 'image/png',
              cid: 'logo'
            }
          ]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ', info.response);
        return { sucess: true, message: 'Correo enviado exitosamente.' };
    } catch (error) {
        console.error('Error al enviar el email:', error);
        return { sucess: false, error: 'Error al enviar el correo.'}
    }
};

module.exports = { sendEmail, sendWelcomeEmail };