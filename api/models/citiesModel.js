const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true
    }
});

module.exports = mongoose.model('City', citySchema);
