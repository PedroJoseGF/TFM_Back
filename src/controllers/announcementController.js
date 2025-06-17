const { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../services/announcementService');
const { createAnnouncementValidations, updateAnnouncementValidations, getAnnouncementValidations } = require('../validations/announcementValidations');

const announcementController = {
    getAnnouncements: [
        ...getAnnouncementValidations,
        async (req, response) => {
            try {
                const filterAnnouncements = req.body;
                const data = await getAnnouncements(filterAnnouncements);
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger los anuncios de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger los anuncios de la BBDD' });
            }
        }
    ],

    createAnnouncement: [
        ...createAnnouncementValidations,
        async (req, response) => {
            try {
                const newAnnouncement = await createAnnouncement(req.body);
                response.status(201).json(newAnnouncement);
            } catch(e) {
                console.log('Error al crear anuncio', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    updateAnnouncement: [
        ...updateAnnouncementValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const announcementData = req.body;
                const updatedAnnouncement = await updateAnnouncement(id, announcementData);
                response.status(200).json(updatedAnnouncement);
            } catch(e) {
                console.log('Error al actualizar anuncio', e);
                response.status(500).json({ error: 'Error al actualizar anuncio' });
            }
        }
    ],

    deleteAnnouncement: [
        ...getAnnouncementValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const deletedAnnouncement = await deleteAnnouncement(id);
                response.status(200).json(deletedAnnouncement);
            } catch(e) {
                console.log('Error al eliminar anuncio', e);
                response.status(500).json({ error: 'Error al eliminar anuncio' });
            }
        }
    ]
};

module.exports = announcementController;