const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordingSchema = new mongoose.Schema({
  schedule: {
    type: Schema.Types.ObjectID,
    ref: 'schedules'
  },
  private: {
        type: Boolean,
        default: false,
  },
  


});

module.exports = Recording = mongoose.model('schedule', RecordingSchema);
