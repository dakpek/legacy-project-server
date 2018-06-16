'use strict';

const Router     = require('koa-router')
const controller = require('./controllers/controller')

const router = new Router();

// ROUTER

router

// SENDER
  .post('/hash', controller.postHash)

// RECEIVER
  .get('/hash/:emailHash', controller.getHash)



// EXPORTS =======================
module.exports = router
