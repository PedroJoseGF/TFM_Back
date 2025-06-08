const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'notified', 'rejected'],
        default: 'pending'
    },
    type: {
        type: Object,
        required: true
    },
    record: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    notifiedDate: {
        type: Date,
    }
});

module.exports = mongoose.model('Notification', notificationSchema); 