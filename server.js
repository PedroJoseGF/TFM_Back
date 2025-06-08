const app = require('./src/app');
const connectDB = require('./src/config/database');
const config = require('./src/config/config');

const startServer = async() => {
    try {
        await connectDB();

        app.listen(config.config.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${config.config.PORT}`);
        });
    } catch (error) {
        console.log('No se ha podido levantar el servidor', error);
        process.exit(1);
    }
};

startServer();