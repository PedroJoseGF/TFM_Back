const  userService = require('../services/userService');
const { createUserValidations, updateUserValidations, getUserValidations } = require('../validations/userValidations');

const userController = {
    getUsers: [
        ...getUserValidations,
        async (req, response) => {
            try {
                const data = await userService.getUsers();
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger los usuarios de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger usuarios de la BBDD' });
            }
        }
    ],

    getUserById: [
        ...getUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const data = await userService.getUserById(id);
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger el usuario de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger usuario de la BBDD' });
            }
        }
    ],

    createUser: [
        ...createUserValidations,
        async (req, response) => {
            try {
                const newUser = await userService.createUser(req.body);
                response.status(201).json(newUser);
            } catch(e) {
                console.log('Error al crear usuario', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    updateUser: [
        ...updateUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const userData = req.body;
                const updatedUser = await userService.updateUser(id, userData);
                response.status(200).json(updatedUser);
            } catch(e) {
                console.log('Error al actualizar usuario', e);
                response.status(500).json({ error: 'Error al actualizar usuario' });
            }
        }
    ],

    restorePassword:  [
        ...updateUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const userData = req.body;
                const updatedUser = await userService.restorePassword(id, userData);
                response.status(200).json(updatedUser);
            } catch(e) {
                console.log('Error al actualizar usuario', e);
                response.status(500).json({ error: 'Error al actualizar usuario' });
            }
        }
    ],

    deleteUser: [
        ...getUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const deletedUser = await userService.deleteUser(id);
                response.status(200).json(deletedUser);
            } catch(e) {
                console.log('Error al eliminar usuario', e);
                response.status(500).json({ error: 'Error al eliminar usuario' });
            }
        }
    ]
};

module.exports = userController;