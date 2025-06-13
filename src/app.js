const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/userRoutes');
const advertisementRoutes = require('./routes/advertismentsRoutes');
const procedureRoutes = require('./routes/procedureRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const verifyToken = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');
const helmet = require('helmet');

const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
app.use(express.json());

const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173', 'https://tfm-front-pi.vercel.app'];

app.use(cors({
    origin: function(origin, callback) {
        if(!origin) return callback(null, true);

        if(allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política CORS para este sitio no permite el acceso desde el origen especificado.';
            return callback(new Error(msg), true);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}));

app.use(cookieParser('tu_secreto_jwt'));

app.use(helmet());

app.use(mongoSanitize());

const apiLimiter = rateLimit({ 
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Demasiadas peticiones desde esta IP'
});

app.use('/', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/email', verifyToken, emailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/procedures', verifyToken, procedureRoutes);
app.use('/api/notifications', verifyToken, notificationRoutes);
app.use('/api/files', fileRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;