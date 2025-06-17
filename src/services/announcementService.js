const Announcement = require('../models/Announcement');

async function getAnnouncements(filters) {
    try {
        let announcements = [];
        if (Object.keys(filters).length !== 0) {
            announcements = await Announcement.find({
                $and: [
                    { title: { $regex: filters.title, $options: "i" } },
                    { proceeding: { $regex: filters.proceeding, $options: "i" } },
                    { procedure: { $regex: filters.procedure, $options: "i" } },
                    { category: { $regex: filters.category, $options: "i" } },
                ],
            });
        } else {
            announcements = await Announcement.find();
        }
        return announcements;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
};

const createAnnouncement = async (announcementData) => {
    const proceeding = await Announcement.countDocuments({ proceeding: { $regex: new Date().getFullYear(), $options: "i" }}).exec();

    const announcement = new Announcement({
        proceeding: (proceeding + 1) + '/' + new Date().getFullYear(),
        ...announcementData
    });

    await announcement.save();
    return announcement;
};

async function updateAnnouncement(id, announcementData) {
    try {
        announcementData.lastUpdate = new Date();
        
        const announcement = await Announcement.findByIdAndUpdate(
            id,
            announcementData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!announcement) {
            throw new Error('Anuncio no encontrado');
        }

        console.log('Anuncio actualizado:', announcement);
        return announcement;
    } catch (err) {
        console.error('Error al actualizar anuncio:', err);
        throw err;
    }
}

const deleteAnnouncement = async (_id) => {
    const announcement = await Announcement.findOne({_id});
    if(!announcement) {
        throw new Error('Anuncio no encontrado');
    }
    await Announcement.findByIdAndDelete(announcement._id);
    return true;
};

module.exports = { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };