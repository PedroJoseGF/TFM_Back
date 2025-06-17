const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
     let token;
     const authHeader = req.headers['authorization'];
     if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
     } else if (req.signedCookies.token) {
        token = req.signedCookies.token;
     } else if(req.cookies.token) {
        token = req.cookies.token;
     }

     if (!token) {
        console.log('No se encontró token en cookies firmadas');
        return res.status(401).json({
            sucess: "NOK",
            message: 'Se requiere un token para la autenticación'
        });
     }

     try {
        const decoded = jwt.verify(token, config.config.JWT_SECRET);
        req.user = decoded;
        next();
     } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(401).json({
            sucess: "NOK",
            message: 'Token inválido o expirado'
        });
     }
};

module.exports = verifyToken;