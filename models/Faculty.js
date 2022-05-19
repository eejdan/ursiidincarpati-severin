const mongoose = require('mongoose');

var facultySchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    }
}, {
    collection: 'faculties'
});

module.exports = mongoose.model('Faculty', facultySchema);