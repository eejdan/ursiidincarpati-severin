const mongoose = require('mongoose');

var profSchema = new mongoose.Schema({
    fullName: {
        type: String,
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
    title: {
        type: String
    }
}, {
    collection: 'profs'
});

//Export the model
module.exports = mongoose.model('Prof', profSchema);