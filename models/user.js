const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: ObjectId,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
