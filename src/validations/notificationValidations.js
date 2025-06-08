const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createNotificationValidations = [
    body('title')
        .notEmpty()
        .withMessage('El título es requerido')
        .isString()
        .withMessage('El título debe ser texto'),

    body('content')
        .notEmpty()
        .withMessage('El contenido es requerido')
        .isString()
        .withMessage('El contenido debe ser texto'),
    
    body('status')
        .notEmpty()
        .withMessage('El estado de la notificación es requerido')
        .isString()
        .withMessage('El estado de la notificación debe ser texto'),
    
    validateResult
];

const getNotificationValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    validateResult
];

module.exports = { createNotificationValidations, getNotificationValidations };