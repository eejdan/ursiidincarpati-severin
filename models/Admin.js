const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {
    collection: 'admins'
});

//Export the model
module.exports = mongoose.model('Admin', adminSchema);