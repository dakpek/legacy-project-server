const db = require ('../db')
const uuid = require('uuid/v4')

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

  await db.postHash(data)
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
