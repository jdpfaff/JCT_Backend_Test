const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordingSchema = new mongoose.Schema({
  appointment: {
    type: Schema.Types.ObjectID,
    ref: 'appointment'
  },
  user: {
    type:String
  },
  date: {
    type: Date
  },
  composer: {
    type: String
  },
  title: {
    type: String
  },
  time: {
    type: Number
  },
  id: {
    type: String
  },
  length: {
    type: Number
  },
  filename: {
    type: String,
  },
  type: {
    type: String
  },
  private: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  }
});

module.exports = Recording = mongoose.model('schedule', RecordingSchema);
