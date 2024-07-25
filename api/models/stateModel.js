const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
});

module.exports = mongoose.model('State', stateSchema);
