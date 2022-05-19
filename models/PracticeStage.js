const mongoose = require('mongoose');
var practiceStageSchema = new mongoose.Schema({
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculties',
        required: true,
    },
    techUsed: String,
    firm: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'firms'
    },
    title: String,
    desc: String,
    dateStart: Date,
    weeks: Number,
    workHours: String,
    registrationEnded: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'practiceStages'
});
module.exports = mongoose.model('PracticeStage', practiceStageSchema);

