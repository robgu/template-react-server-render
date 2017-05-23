import 'regenerator-runtime/runtime';

import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import cors from 'koa-cors';
import logger from 'koa-logger';
import Router from 'koa-router';
import koaStatic from 'koa-static';

import server from './server';

const app = new Koa();
const router = new Router();

router.get(/.*/, async (ctx, next) => {
  if (/^\/static\/.*/.test(ctx.url)) {
    return koaStatic('.')(ctx, next);
  }

  return server(ctx, next);
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyparser());

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err) => {
  console.error('app error', err);
});

app.listen(8080, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://127.0.0.1:8080');
});
