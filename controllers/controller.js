const db = require ('../db');
const uuidv4 = require('uuid/v4');
const mailer = require ('../services/email');
const { DateError } =  require('../errors');

// SENDER
const postHash = async (ctx, next) => {
  const emailHash =  uuidv4();
  let hashes = [];
  let filetypes = [];
  let files = [];

  ctx.request.body.hashes.forEach((el, key) => {
    const filetype = ctx.request.body.names[key].substr(ctx.request.body.names[key].lastIndexOf('.')+1);
    files.push({hash: el.hash, filetype});
  })

  const data = {
    senderEmail: ctx.request.body.senderEmail,
    receiverEmail: ctx.request.body.receiverEmail,
    files: files,
    dateExpire: ctx.request.body.dateExpire,
    emailHash :emailHash,
    message: ctx.request.body.message,
  }

  const response = await mailer.send('send-files', data);
  await db.postHash(data);
  ctx.body = {"emailHash": emailHash}
  next();
}

// RECEIVER
const getHash = async (ctx, next) => {
  ctx.body = await db.getHash(ctx.params.emailHash);
  next();
}

module.exports = {
  getHash,
  postHash,
}
