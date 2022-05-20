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
/*     faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculties',
        required: true,
    }, */
    cvMedia: String,
    meta: {
        firstName: String,
        lastName: String,
        email: String,
        aptitudes: String,

    }
}, {
    collection: 'students'
})  

module.exports = mongoose.model('Student', studentSchema);