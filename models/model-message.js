const mongoose = require('mongoose')

const Message  = new mongoose.Schema({
  email: String,
  hash: String,
  dateExpire: Date,
})

// EXPORTS =======================
module.exports = mongoose.model('Message', Message);
