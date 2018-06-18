const db = require ('../db')
const uuidv4 = require('uuid/v4')
const mailer = require ('../services/mailer')

// SENDER
const postHash = async (ctx, next) => {
  const emailHash =  uuidv4();
  let hashes = []
  ctx.request.body.hashes.forEach((el) => hashes.push(el.hash))
  const data = {
  senderEmail: ctx.request.body.senderEmail,
  receiverEmail: ctx.request.body.receiverEmail,
  hashes: ctx.request.body.hashes,
  dateExpire: ctx.request.body.dateExpire,
  emailHash :emailHash,
  message: ctx.request.body.message,
  }
  const response = await mailer.send('send-files', {
    downloadLink: process.env.FRONTEND_URL + '/download/' + emailHash,
    ...data
  });
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
