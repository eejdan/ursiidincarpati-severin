const mongoose = require('mongoose');
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
module.exports = mongoose.model('Reprezentant', reprezentantSchema);