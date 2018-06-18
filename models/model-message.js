const mongoose = require('mongoose')
require('mongoose-type-email');


const Message  = new mongoose.Schema({
  senderEmail: mongoose.SchemaTypes.Email,
  receiverEmail: mongoose.SchemaTypes.Email,
  files: Object, // if you can work with this, we'll delete the other two.
  filetypes: Array,
  hashes: Array,
  dateExpire: Date,
  emailHash: String,
  message: String
})

// EXPORTS =======================
module.exports = mongoose.model('Message', Message);
