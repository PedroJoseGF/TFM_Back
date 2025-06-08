const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createProcedureValidations = [
    body('title')
        .notEmpty()
        .withMessage('El título es requerido')
        .isString()
        .withMessage('El título debe ser texto'),

    body('description')
        .notEmpty()
        .withMessage('La descripción es requerido')
        .isString()
        .withMessage('La descripción debe ser texto'),
    
    body('type')
        .notEmpty()
        .withMessage('El tipo de trámite es requerido')
        .isString()
        .withMessage('El tipo de trámite debe ser texto'),
        
    body('status')
        .notEmpty()
        .withMessage('El estado es requerido')
        .isString()
        .withMessage('El estado debe ser texto'),
    
    body('user')
        .notEmpty()
        .withMessage('El usuario es requerido')
        .isString()
        .withMessage('El usuario debe ser texto'),
    
    validateResult
];

const updateProcedureValidations = [
    body('title')
        .notEmpty()
        .withMessage('El título es requerido')
        .isString()
        .withMessage('El título debe ser texto'),

    body('description')
        .notEmpty()
        .withMessage('La descripción es requerido')
        .isString()
        .withMessage('La descripción debe ser texto'),
        
    body('status')
        .notEmpty()
        .withMessage('El estado es requerido')
        .isString()
        .withMessage('El estado debe ser texto'),
    
    validateResult
];

const getProcedureValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    validateResult
];

module.exports = { createProcedureValidations, updateProcedureValidations, getProcedureValidations };