const mongoose = require('mongoose');

var firmSchema = new mongoose.Schema({
    logo: String,
    displayName: {
        type: String,
        required: true
    }, 
    desc: {
        type: String
    },
    area: {
        type: String
    },
    adresa: {
        type: String
    }
}, {
    collection: 'firms'
});

module.exports = mongoose.model('Firm', firmSchema);