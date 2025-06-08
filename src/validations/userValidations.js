const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createUserValidations = [
    body('name')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('surname')
        .notEmpty()
        .withMessage('Los apellidos es requerido')
        .isString()
        .withMessage('Los apellidos debe ser texto'),
    
    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido'),
        
    body('dni')
        .notEmpty()
        .withMessage('El dni es requerido')
        .isString()
        .withMessage('El dni debe ser texto'),
    
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerido')
        .isString()
        .withMessage('La contraseña debe ser texto'),
    
    body('role')
        .notEmpty()
        .withMessage('El rol es requerido')
        .isString()
        .withMessage('El rol debe ser texto'),
    
    validateResult
];

const updateUserValidations = [
    body('name')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('surname')
        .notEmpty()
        .withMessage('Los apellidos son requeridos')
        .isString()
        .withMessage('Los apellidos deben ser texto'),
    
    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido'),
    
    body('password')
        .isString()
        .withMessage('La contraseña debe ser texto'),
    
    body('role')
        .notEmpty()
        .withMessage('El rol es requerido')
        .isString()
        .withMessage('El rol debe ser texto'),

    body('enabled')
        .notEmpty()
        .withMessage('El rol es requerido')
        .isBoolean()
        .withMessage('El rol debe ser un booleano'),
    
    validateResult
];

const getUserValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    validateResult
];

module.exports = { createUserValidations, updateUserValidations, getUserValidations };