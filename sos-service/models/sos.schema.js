const mongoose = require('mongoose');

const sosRequestSchema = new mongoose.Schema({
    civilianId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number], 
            required: true,
        },
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved', 'Cancelled'],
        default: 'Pending',
    },
});

sosRequestSchema.index({ location: '2dsphere' }); 

module.exports = mongoose.model('SosRequest', sosRequestSchema);