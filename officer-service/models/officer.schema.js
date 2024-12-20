const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    badgeNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    rank: {
        type: String,
        required: true,
        enum: ['Constable', 'Sergeant', 'Inspector', 'Captain', 'Chief'], // Example ranks, modify as needed
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    assignedCases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Case', // Refers to the Case model
        },
    ],
    status: {
        type: String,
        enum: ['active', 'leave', 'retired'],
        default: 'active',
    },
    hiredAt: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

module.exports = mongoose.model('Officer', officerSchema);