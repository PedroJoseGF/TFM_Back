const  notificationService = require('../services/notificationService');
const { createNotificationValidations, getNotificationValidations } = require('../validations/notificationValidations');

const notificationController = {
    getNotifications: [
        ...getNotificationValidations,
        async (req, response) => {
            try {
                const data = await notificationService.getNotifications();
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger las notificaciones de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger las notificaciones de la BBDD' });
            }
        }
    ],

    getNotificationsById: [
        ...getNotificationValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const data = await notificationService.getNotificationsById(id);
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger las notificaciones de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger las notificaciones de la BBDD' });
            }
        }
    ],

    createNotification: [
        ...createNotificationValidations,
        async (req, response) => {
            try {
                const newNotification = await notificationService.createNotification(req.body);
                response.status(201).json(newNotification);
            } catch(e) {
                console.log('Error al crear la notificación', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    updateNotification: [
        async (req, response) => {
            try {
                const { id } = req.params;
                const updateNotification = await notificationService.updateNotification(id);
                response.status(201).json(updateNotification);
            } catch(e) {
                console.log('Error al actualizar la notificación', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    deleteNotification: [
        ...getNotificationValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const deletedNotification = await notificationService.deleteNotification(id);
                response.status(200).json(deletedNotification);
            } catch(e) {
                console.log('Error al eliminar la notificación', e);
                response.status(500).json({ error: 'Error al eliminar la notificación' });
            }
        }
    ]
};

module.exports = notificationController;