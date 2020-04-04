const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordingSchema = new mongoose.Schema({
  private: {
        type: Boolean,
        default: false,
  },
});

module.exports = Recording = mongoose.model('schedule', RecordingSchema);
