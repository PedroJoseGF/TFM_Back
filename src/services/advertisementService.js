const Advertisement = require('../models/Advertisement');

async function getAdvertisements() {
    try {
        let advertisements = [];
        advertisements = await Advertisement.find();
        return advertisements;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
};

const createAdvertisement = async (advertisementData) => {
    const proceeding = await Advertisement.countDocuments({ proceeding: { $regex: new Date().getFullYear(), $options: "i" }}).exec();

    const advertisement = new Advertisement({
        proceeding: (proceeding + 1) + '/' + new Date().getFullYear(),
        ...advertisementData
    });

    await advertisement.save();
    return advertisement;
};

async function updateAdvertisement(id, advertisementData) {
    try {
        advertisementData.lastUpdate = new Date();
        
        const advertisement = await Advertisement.findByIdAndUpdate(
            id,
            advertisementData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!advertisement) {
            throw new Error('Anuncio no encontrado');
        }

        console.log('Anuncio actualizado:', advertisement);
        return advertisement;
    } catch (err) {
        console.error('Error al actualizar anuncio:', err);
        throw err;
    }
}

const deleteAdvertisement = async (_id) => {
    const advertisement = await Advertisement.findOne({_id});
    if(!advertisement) {
        throw new Error('Anuncio no encontrado');
    }
    await Advertisement.findByIdAndDelete(advertisement._id);
    return true;
};

module.exports = { getAdvertisements, createAdvertisement, updateAdvertisement, deleteAdvertisement };