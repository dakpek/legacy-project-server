'use strict';

require('dotenv').config();

const Koa          = require('koa');
const cors         = require('koa-cors');
const http         = require('http');
const compress     = require('koa-compress');
const bodyParser   = require('koa-bodyparser');
const convert      = require('koa-convert')

const errorHandler = require('./middlewares/error-handler');

const db           = require('./db');
const router       = require('./router');

const app = new Koa();

app
  .use(convert(cors()))
  .use(bodyParser())
  .use(errorHandler)
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT, () => {
    console.log(`Koa listening on ${process.env.PORT}`)
  });
