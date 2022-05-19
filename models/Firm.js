const mongoose = require('mongoose');

var firmSchema = new mongoose.Schema({
    logo: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'media'
    },
    displayName: {
        type: String,
        required: true
    }, 
    desc: {
        type: String
    },
    area: {
        type: String
    }
}, {
    collection: 'firms'
});

module.exports = mongoose.model('Firm', firmSchema);