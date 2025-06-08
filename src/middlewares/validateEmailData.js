const validateEmailData = (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Faltan datos en el formulario.' });
    }
    
    if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'El nombre no es válido.' });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'El email no es válido.' });
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'El mensaje no es válido.'});
    }

    next();
};

module.exports = validateEmailData;