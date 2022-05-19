const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reprezentantSchema = new mongoose.Schema({
    firm: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'firms'
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
    }
}, {
    collection: 'reprezentanti'
});

//Export the model
module.exports = mongoose.model('Reprezentant', reprezentantSchema);