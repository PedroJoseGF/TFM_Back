const User = require('../models/User');
const bcrypt = require('bcrypt');

async function getUsers() {
    try {
        let users = [];
        users = await User.find();
        return users;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
};

async function getUserById(id) {
    try {
        let user = await User.findOne({ _id: id});
        return user;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
}

const createUser = async (userData) => {
    const { email, password, ...rest } = userData;

    const existingUser = await User.find({ email });
    if(existingUser.length > 0) {
        throw new Error('El usuario ya existe');
    }

    const user = new User({
        email,
        password,
        ...rest
    });

    await user.save();
    return user;
};

async function updateUser(id, userData) {
    try {
        userData.lastUpdate = new Date();
        
        const user = await User.findByIdAndUpdate(
            id,
            userData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        console.log('Usuario actualizado:', user);
        return user;
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        throw err;
    }
};

async function restorePassword(id, userData) {
    try {
        userData.lastUpdate = new Date();
        userData.password =  await bcrypt.hash(userData.password, 10);
        
        const user = await User.findByIdAndUpdate(
            id,
            userData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        console.log('Usuario actualizado:', user);
        return user;
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        throw err;
    }
};

const deleteUser = async (_id) => {
    const user = await User.findOne({_id});
    if(!user) {
        throw new Error('Usuario no encontrado');
    }
    await User.findByIdAndDelete(user._id);
    return true;
};

module.exports = { getUsers, getUserById, createUser, updateUser, restorePassword, deleteUser };