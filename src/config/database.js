const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${config.config.USER_BBDD}:${config.config.PASS_BBDD}@cluster0.aes5a.mongodb.net/${config.config.NAME_BBDD}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB;