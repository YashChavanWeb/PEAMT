const mongoose = require('mongoose');

const districtSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    }
});

module.exports = mongoose.model('District', districtSchema);
