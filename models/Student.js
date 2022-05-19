const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    prof: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'profs',
        required: true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
    },
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculties',
        required: true,
    },
    cvMedia: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'media'
    }]
}, {
    collection: 'students'
})

module.exports = mongoose.model('Student', studentSchema);