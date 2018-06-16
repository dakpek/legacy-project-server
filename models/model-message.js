const mongoose = require('mongoose')

const Message  = new mongoose.Schema({
  senderEmail: String,
  receiverEmail: String,
  hashes: Array,
  dateExpire: Date,
  emailHash: String,
})


// EXPORTS =======================
module.exports = mongoose.model('Message', Message);
