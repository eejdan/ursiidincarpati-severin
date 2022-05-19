const mongoose = require('mongoose');

var studentPracticeSessionSchema = new mongoose.Schema({
    practiceStage: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'practiceStages'
    },
    presence: [String],
    student: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'students'
    }
}, {
    collection: 'studentPracticeSessions'
});

//Export the model
module.exports = mongoose.model('StudentPracticeSession', studentPracticeSessionSchema);