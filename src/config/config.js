require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    USER_BBDD: process.env.USER_BBDD,
    PASS_BBDD: process.env.PASS_BBDD,
    NAME_BBDD: process.env.NAME_BBDD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

};

const createTransport = () => {
    const nodemailer = require('nodemailer');

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
        }
    });
};

module.exports = { config, createTransport };