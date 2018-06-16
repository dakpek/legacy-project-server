const db         = require('mongoose');
const Message    = require('./models/model-message')

// SENDER ENDPOINTS ================

const postHash = (message) => {
  Message.create(message)
    .then(res => console.log("successfully added item"))
    .catch(err => console.error(err))
}

// RECEIVER ENDPOINTS ==============

function DateError(message) {
  this.message = message;
}

DateError.prototype = new Error();

const getHash = async (hash) => {
     let data = await Message.findOne({"hash": hash})
     let dateNow = new Date()
     if (data.dateExpire.getTime() >= dateNow.getTime()) {
       return data
     } else {
       throw new DateError('This message has expired')
     }
}

// DATABASE CONNECTION =============

db.connect('mongodb://localhost/FileNation')
    .then(() => console.log('Connection Successful!'))
  .catch(err => console.error(err));


// EXPORTS =======================

exports.db       = db
exports.postHash = postHash
exports.getHash  = getHash
