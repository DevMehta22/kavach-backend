const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    civilianId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['theft', 'accident', 'fire', 'medical', 'other'], 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'in-progress', 'resolved', 'closed'],
        default: 'pending',
    },
    attachments: [
        {
            url: {
                type: String,
            },
            fileType: {
                type: String,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Add a 2dsphere index to enable geospatial queries
incidentSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Incident', incidentSchema);