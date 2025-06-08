const fs = require('fs').promises;
const path = require('path');
const uploadDir = path.join(__dirname, '../../uploads');

async function initializeUploadsDir() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true } );
    }
};

async function uploadFile(file, folder) {
    let filePath = '';
    if (folder) {
        fs.mkdir(path.join(uploadDir, folder + ''), { recursive: true }, err => {
            if (err) {
                console.err('Error al crear la carpeta:', err);
                return;
            }
        });
        
        filePath = path.join(uploadDir, folder + '/' + file.originalname);
    } else {
        filePath = path.join(uploadDir, file.originalname);
    }
    await fs.writeFile(filePath, file.buffer);
    return file.originalname;
};

async function downloadFile(filename) {
    const filePath = path.join(uploadDir, filename);
    return await fs.readFile(filePath);
};

async function listFiles() {
    return await fs.readdir(uploadDir);
};

async function deleteFile(filename) {
    const filePath = path.join(uploadDir, filename);
    await fs.unlink(filePath);
};

async function sendImage(folder, filename) {
    const filePath = path.join(uploadDir, folder, filename);
    return filePath;
}

initializeUploadsDir();

module.exports = { uploadFile, downloadFile, listFiles, deleteFile, sendImage };