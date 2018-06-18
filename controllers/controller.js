const db = require ('../db')
const uuidv4 = require('uuid/v4')
const mailer = require ('../services/email')

// SENDER
const postHash = async (ctx, next) => {
  const emailHash =  uuidv4();
  let hashes = []
  let filetypes = []
  let files = {}
  ctx.request.body.hashes.forEach((el) => hashes.push(el.hash))
  ctx.request.body.names.forEach((el) => {
    let type = el.substr(el.lastIndexOf('.'))
    filetypes.push(type)
  })
  for (let i = 0; i < hashes.length; i++) {
    files[hashes[i]] = filetypes[i]
  }
  const data = {
  senderEmail: ctx.request.body.senderEmail,
  receiverEmail: ctx.request.body.receiverEmail,
  files: files,
  filetypes: filetypes,
  hashes: hashes,
  dateExpire: ctx.request.body.dateExpire,
  emailHash :emailHash,
  message: ctx.request.body.message,
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
