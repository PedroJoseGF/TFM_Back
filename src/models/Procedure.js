const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: Object
    },
    type: {
        type: String,
        required: true
    },
    proceeding: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    closingDate: {
        type: Date
    }
});

module.exports = mongoose.model('Procedure', procedureSchema);