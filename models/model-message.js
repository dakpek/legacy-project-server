const mongoose = require('mongoose')
require('mongoose-type-email');



const Message  = new mongoose.Schema({
  senderEmail: mongoose.SchemaTypes.Email,
  receiverEmail: mongoose.SchemaTypes.Email,
  files: Object,
  dateExpire: {type: Date, default: new Date(Date.now() + 2*24*60*60*1000)},
  emailHash: String,
  message: String
})

// EXPORTS =======================
module.exports = mongoose.model('Message', Message);
