const Notification = require('../models/Notification');
const User = require('../models/User');

async function getNotifications() {
    try {
        let notifications = [];
        notifications = await Notification.find();
        return notifications;
    } catch (err) {
        console.error('Error al obtener notificaciones:', err);
        throw err;
    }
};

async function getNotificationsById(id) {
     try {
        let notifications = [];
        notifications = await Notification.find({ 'content.user': id });
        return notifications;
    } catch (err) {
        console.error('Error al obtener notificaciones:', err);
        throw err;
    }
}

const createNotification = async (notificationData) => {
    const { content, ...rest } = notificationData;

    let record = await Notification.countDocuments({ record: { $regex: new Date().getFullYear(), $options: "i" }}).exec();

    const notification = new Notification({
        content: content,
        record: new Date().getFullYear() + "-RCD-" + (record + 1),
        type: 'Notificación electrónica',
        ...rest
    });

    await notification.save();
    return notification;
};

const updateNotification = async (id) => {
    let notificationData = [];
    notificationData.notifiedDate = new Date();

    const notification = await Notification.findByIdAndUpdate(
            id,
            notificationData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!notification) {
            throw new Error('Notificación no encontrada');
        }

        console.log('Notificación actualizada:', notification);
        return notification;
};

const deleteNotification = async (_id) => {
    const notification = await Notification.findOne({_id});
    if(!notification) {
        throw new Error('Notificación no encontrado');
    }
    await Notification.findByIdAndDelete(notification._id);
    return true;
};

module.exports = { getNotifications, getNotificationsById, createNotification, updateNotification, deleteNotification };