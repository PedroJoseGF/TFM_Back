const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const userService = require('../services/userService');
const emailService = require('../services/emailService');
const config = require('../config/config');

exports.verifyToken = async (req, res) => {
    try {
        let token;
        let message;
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
            if(token !== 'null') {
                message = 'Token encontrado en header Authorization';
            }
        } else if (req.signedCookies.token) {
            token = req.signedCookies.token;
            message = 'Token encontrado en cookies firmadas';
        } else if (req.cookies.token) {
            token = req.cookies.token;
            message = 'Token encontrado en cookies normales';
        }

        const decoded = jwt.verify(token, config.config.JWT_SECRET);
        const user = await User.findOne({ dni: decoded.dni });
        res.json({
            message: message,
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                dni: user.dni,
                role: user.role
            }
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado' })
        }

        res.status(401).json({ message: 'Token inválido' });
    }
};

exports.login = async (req, res) => {
    try {
        let { dni, password } = req.body;
        const user = await User.findOne({ dni });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                sucess: "NOK",
                message: 'Credenciales inválidas'
            });
        };

        if (!user.enabled) {
            return res.status(401).json({ message: 'Usuario bloqueado' });
        }

        const token = jwt.sign(
            { dni: user.dni, password: user.password, role: user.role },
            config.config.JWT_SECRET,
            { expiresIn: config.config.JWT_EXPIRES_IN }
        );
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log('Token generado:', token);
        console.log('Cookie configurada:', res.getHeader('Set-Cookie'));

        res.json({
            message: 'Login exitoso',
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                dni: user.dni,
                role: user.role
            },
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });
    res.json({ message: 'Logout exitoso' });
};

exports.deleteUser = async (req, res) => {
    try {
        await deleteUser(req._id);
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};