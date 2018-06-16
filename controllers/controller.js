const db = require ('../db')
const mailer = require ('../services/email')

// SENDER
const postHash = async (ctx, next) => {
  console.log(ctx.request.body);
  const hash = 'testHash';
  const data = {
    email_receiver: ctx.request.body.email_receiver,
    email_sender: ctx.request.body.email_sender,
    date_expire: ctx.request.body.date_expire,
    message: ctx.request.body.message,
    downloadLink: process.env.FRONTEND_URL+'/'+hash
  }

  const response = await mailer.send('send-files', data);

  await db.postHash(data);
  ctx.body = ctx.request.body
  ctx.body.email = response;
  next()
}

// RECEIVER
const getHash = async (ctx, next) => {
  ctx.body = await db.getHash(ctx.params.hash)
  next()
}


// EXPORTS =======================
exports.getHash  = getHash
exports.postHash = postHash
