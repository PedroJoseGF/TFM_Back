const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createAnnouncementValidations = [
    body('title')
        .notEmpty()
        .withMessage('El título es requerido')
        .isString()
        .withMessage('El título debe ser texto'),
    
    body('procedure')
        .notEmpty()
        .withMessage('El procedimiento es requerido')
        .isString()
        .withMessage('El procedimiento debe ser texto'),
    
    body('category')
        .notEmpty()
        .withMessage('La categoria es requerido')
        .isString()
        .withMessage('La categoria debe ser texto'),
    
    body('description')
        .notEmpty()
        .withMessage('La decripción es requerido')
        .isString()
        .withMessage('La descripción debe ser texto'),
    
    validateResult
];

const updateAnnouncementValidations = [
    body('title')
        .notEmpty()
        .withMessage('El título es requerido')
        .isString()
        .withMessage('El título debe ser texto'),
    
    body('procedure')
        .notEmpty()
        .withMessage('El procedimiento es requerido')
        .isString()
        .withMessage('El procedimiento debe ser texto'),
    
    body('category')
        .notEmpty()
        .withMessage('La categoria es requerido')
        .isString()
        .withMessage('La categoria debe ser texto'),
    
    body('description')
        .notEmpty()
        .withMessage('La decripción es requerido')
        .isString()
        .withMessage('La descripción debe ser texto'),
    
    validateResult
];

const getAnnouncementValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    validateResult
];

module.exports = { createAnnouncementValidations, updateAnnouncementValidations, getAnnouncementValidations };