const mongoose = require('mongoose');

var mediaSchema = new mongoose.Schema({
    useType: String,
    media: {
        data: Buffer,
        contentType: String
    },
    desc: String
}, {
    ref: 'media'
});

module.exports = mongoose.model('Media', mediaSchema);