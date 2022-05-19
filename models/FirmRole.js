const mongoose = require('mongoose');

var firmRoleSchema = new mongoose.Schema({
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculties'
    },
    firm: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'firms'
    }
}, {
    collection: 'firmRoles'
});

module.exports = mongoose.model('FirmRole', firmRoleSchema);