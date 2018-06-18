const db         = require('mongoose');
const Message    = require('./models/model-message')

// SENDER ENDPOINTS ================

const postHash = (message) => {
  Message.create(message)
    .then(res => console.log("successfully added item"))
    .catch(err => console.error(err))
}

// RECEIVER ENDPOINTS ==============

const getHash = async (emailHash) => {
     let data = await Message.findOne({"emailHash": emailHash})
     let dateNow = new Date()
     if (data.dateExpire.getTime() >= dateNow.getTime()) {
       return data.hashes
     } else {
       DateError();
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
