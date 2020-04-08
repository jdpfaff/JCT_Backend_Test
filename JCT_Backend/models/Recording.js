const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordingSchema = new mongoose.Schema({
  appointment: {
    type: Schema.Types.ObjectID,
    ref: 'appointment'
  },
  id:{
    type: String
  },
  private: {
        type: Boolean,
        default: false,
  },
  name: {
    type: String
  },
  composer: {
    type: String
  },


});

module.exports = Recording = mongoose.model('schedule', RecordingSchema);
