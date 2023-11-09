const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  Name: {
    type: String
  },
  Age: {
    type: String
  },
  ClassName: {
    type: String
  },
  Mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
    
  },
  PreviousMentor : {
    type: String
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;