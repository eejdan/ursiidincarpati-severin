const mongoose = require('mongoose');

var profRoleSchema = new mongoose.Schema({
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculties'
    },
    prof: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'prof'
    }
}, {
    collection: 'profRole'
});

module.exports = mongoose.model('ProfRole', profRoleSchema);