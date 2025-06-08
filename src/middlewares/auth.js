const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({ mensaje: 'No hay token de autenticación' });
        }

        const decoded = jwt.verify(token, config.config.JWT_SECRET);
        req.userId = decoded.userId;
        req.dni = decoded.dni;
        next();
    } catch (err) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: 'Token expirado' })
        }

        res.status(401).json({ mensaje: 'Token inválido' });
    }
};

module.exports = auth;