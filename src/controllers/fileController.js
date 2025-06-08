const fileService = require('../services/fileService');

async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
        }

        const filename = await fileService.uploadFile(req.file);
        res.status(201).json({ message: 'Archivo subido exitosamente', filename });
    } catch (e) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error al subir el archivo' });
    }
};

async function downloadFile(req, res) {
    try {
        const { filename } = req.params;
        const fileBuffer = await fileService.downloadFile(filename);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.send(fileBuffer);
    } catch (e) {
        console.error('Error al descargar archivo:', error);
        res.status(404).json({ error: 'Archivo no encontrado' });
    }
};

async function listFiles(req, res) {
    try {
        const files = await fileService.listFiles();
        res.json(files);
    } catch (e) {
        console.error('Error al listar archivos:', error);
        res.status(500).json({ error: 'Error al listar los archivos' });
    }
};

async function deleteFile(req, res) {
    try {
        const { filename } = req.params;
        await fileService.deleteFile(filename);
        res.json({ message: 'Archivo eliminado exitosamente' });
    } catch (e) {
        console.error('Error al eliminar archivo:', error);
        res.status(404).json({ error: 'Archivo no encontrado' });
    }
};

async function sendImage(req, res) {
    try {
        const { folder, filename } = req.params;
        res.sendFile(await fileService.sendImage(folder, filename));
    } catch (e) {
        console.error('Error al enviar imagen:', error);
        res.status(404).json({ error: 'Imagen no encontrada' });
    }
};

async function getLogoEmail(req, res) {
    try {
        const { filename } = req.params;
        res.sendFile(await fileService.sendLogo(filename));
    } catch (e) {
        console.error('Error al enviar logo:', error);
        res.status(404).json({ error: 'Logo no encontrado' });
    }
};

module.exports = { uploadFile, downloadFile, listFiles, deleteFile, sendImage, getLogoEmail };