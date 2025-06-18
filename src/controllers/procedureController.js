const procedureService = require('../services/procedureService');
const notificationService = require('../services/notificationService');
const fileService = require('../services/fileService');

async function getProceduresController(req, response) {
    try {
        const filterProcedures = req.body;
        let data = await procedureService.getProcedures(filterProcedures);
        response.status(200).json(data);
    } catch(e) {
        console.log('Error al recoger los trámites de la BBDD', e);
        response.status(500).json({ error: 'Error al recoger los trámites de la BBDD' });
    }
}

async function getProceduresById(req, response) {
    try {
        const { id } = req.params;
        let data = await procedureService.getProceduresById(id);
        response.status(200).json(data);
    } catch(e) {
        console.log('Error al recoger los trámites de la BBDD', e);
        response.status(500).json({ error: 'Error al recoger los trámites de la BBDD' });
    }
}
        
async function createdProcedure(req, response) {
    try {
        const newProcedure = await procedureService.createProcedure(req.body);
        if (req.file) {
            await fileService.uploadFile(req.file, newProcedure._id);
            newProcedure['file'] = req.file;
            req.body.file = req.file;
        }
        data = await procedureService.updateProcedure(newProcedure._id, newProcedure);

        let notification = {
            "title": "Creación de " + newProcedure.title.toLocaleLowerCase(),
            "content": {
                "proceeding": newProcedure.proceeding,
                ...req.body
            }
        };
        notificationService.createNotification(notification);
        response.status(201).json(newProcedure);
    } catch(e) {
        console.log('Error al crear el trámite', e);
        response.status(500).json({ error: e.message });
    }
};
        
async function updatedProcedure(req, response) {
    try {
        const { id } = req.params;
        const procedureData = req.body;
        const updatedProcedure = await procedureService.updateProcedure(id, procedureData);
        response.status(200).json(updatedProcedure);
    } catch(e) {
        console.log('Error al actualizar el trámite', e);
        response.status(500).json({ error: 'Error al actualizar el trámite' });
    }
};

async function deletedProcedure(req, response) {
    try {
        const { id } = req.params;
        const deletedProcedure = await procedureService.deleteProcedure(id);
        response.status(200).json(deletedProcedure);
    } catch(e) {
        console.log('Error al eliminar el trámite', e);
        response.status(500).json({ error: 'Error al eliminar el trámite' });
    }
};

module.exports = { getProceduresController, getProceduresById, createdProcedure, updatedProcedure, deletedProcedure };