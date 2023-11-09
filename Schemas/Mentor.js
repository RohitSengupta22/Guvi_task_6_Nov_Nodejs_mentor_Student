const mongoose = require('mongoose');
const { Schema } = mongoose;

const MentorSchema = new Schema({
  Name: {
    type: String
  },
  Age: {
    type: String
  },
  Subject: {
    type: String
  },
  Students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Student'
    
  }
});

const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = Mentor;