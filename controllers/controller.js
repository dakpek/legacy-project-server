const db = require ('../db')
const uuidv4 = require('uuid/v4')
const mailer = require ('../services/email')

// SENDER
const postHash = async (ctx, next) => {
  const emailHash =  uuidv4();
  const data = {
  senderEmail: ctx.request.body.senderEmail,
  receiverEmail: ctx.request.body.receiverEmail,
  hashes: ctx.request.body.hashes,
  dateExpire: ctx.request.body.dateExpire,
  emailHash :emailHash
  }
  const response = await mailer.send('send-files', data);
  await db.postHash(data)
  ctx.body = {"emailHash": emailHash}
  next()

}

// RECEIVER
const getHash = async (ctx, next) => {
  ctx.body = await db.getHash(ctx.params.emailHash)
  next()
}


// EXPORTS =======================
exports.getHash  = getHash
exports.postHash = postHash
