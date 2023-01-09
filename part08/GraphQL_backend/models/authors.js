const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }],
});

module.exports = mongoose.model('Authors', schema);
