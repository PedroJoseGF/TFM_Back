const errorHandler = (error, request, response, next) => {
    console.log('Ejecutamos el middleware de error,', error);
    response.status(500).json({ success: 'NOK', mesaage: 'Error interno del servidor'});
};

module.exports = errorHandler;