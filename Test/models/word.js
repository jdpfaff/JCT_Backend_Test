const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WordSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Word = mongoose.model('word', WordSchema);
