const { body, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const loginUserValidations = [
    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido'),

    
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isString()
        .withMessage('La contraseña debe ser texto'),

    validateResult
];

module.exports = { loginUserValidations }; 