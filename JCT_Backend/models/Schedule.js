const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: 'users'
  },
  composer: {
    type: String
  },
  email: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date
  },
  members: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);
