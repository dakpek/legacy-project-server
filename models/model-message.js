const mongoose = require('mongoose')
require('mongoose-type-email');


const Message  = new mongoose.Schema({
  senderEmail: mongoose.SchemaTypes.Email,
  receiverEmail: mongoose.SchemaTypes.Email,
  hashes: Array,
  dateExpire: Date,
  emailHash: String,
})

// EXPORTS =======================
module.exports = mongoose.model('Message', Message);
