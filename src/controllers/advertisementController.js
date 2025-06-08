const { getAdvertisements, createAdvertisement, updateAdvertisement, deleteAdvertisement } = require('../services/advertisementService');
const { createAdvertisementValidations, updateAdvertisementValidations, getAdvertisementValidations } = require('../validations/advertisementValidations');

const advertisementController = {
    getAdvertisements: [
        ...getAdvertisementValidations,
        async (req, response) => {
            try {
                const filterAdvertisements = req.body;
                const data = await getAdvertisements(filterAdvertisements);
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger los anuncios de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger los anuncios de la BBDD' });
            }
        }
    ],

    createAdvertisement: [
        ...createAdvertisementValidations,
        async (req, response) => {
            try {
                const newAdvertisement = await createAdvertisement(req.body);
                response.status(201).json(newAdvertisement);
            } catch(e) {
                console.log('Error al crear anuncio', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    updateAdvertisement: [
        ...updateAdvertisementValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const advertisementData = req.body;
                const updatedAdvertisement = await updateAdvertisement(id, advertisementData);
                response.status(200).json(updatedAdvertisement);
            } catch(e) {
                console.log('Error al actualizar anuncio', e);
                response.status(500).json({ error: 'Error al actualizar anuncio' });
            }
        }
    ],

    deleteAdvertisement: [
        ...getAdvertisementValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const deletedAdvertisement = await deleteAdvertisement(id);
                response.status(200).json(deletedAdvertisement);
            } catch(e) {
                console.log('Error al eliminar anuncio', e);
                response.status(500).json({ error: 'Error al eliminar anuncio' });
            }
        }
    ]
};

module.exports = advertisementController;