const db         = require('mongoose');
const Message    = require('./models/model-message')
const { DateError }  = require('./errors')

// SENDER ENDPOINTS ================
const postHash = (message) => {
  Message.create(message)
    .then(res => console.log("successfully added item"))
    .catch(err => console.error(err));
}

// RECEIVER ENDPOINTS ==============
const getHash = async (emailHash) => {
     let data = await Message.findOne({"emailHash": emailHash})
     if (data && data.dateExpire.getTime() >= Date.now()) {
       delete data._id;
       return data;
     } else {
       DateError();
     }
}

// DATABASE CONNECTION =============
db.connect('mongodb://localhost/FileNation')
  .then(() => console.log('Connection Successful!'))
  .catch(err => console.error(err));

module.exports = {
  db,
  postHash,
  getHash
}
