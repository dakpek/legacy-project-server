const db = require ('../db')

// SENDER

const postHash = async (ctx, next) => {
  ctx.body = ctx.request.body
  await db.postHash(ctx.body)
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
