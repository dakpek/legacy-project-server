'use strict';

const Router     = require('koa-router')
const controller = require('./controllers/controller')

const router = new Router();

router
  .post('/hash', controller.postHash) // SENDER
  .get('/hash/:emailHash', controller.getHash) // RECEIVER

module.exports = router
