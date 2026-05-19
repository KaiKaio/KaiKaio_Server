import dotenv from 'dotenv';
import Koa from 'koa';
import Router from '@koa/router';
import views from '@ladjs/koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koajwt from 'koa-jwt';
import serve from 'koa-static';
import path from 'path';

import corsMiddleware from './middlewares/cors-middlewares';
import config from './config';
import routes from './routes';

const envPath = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env';

dotenv.config({
  path: envPath,
  encoding: 'utf8',
});

const app = new Koa();
const router = new Router();

const publicKey = process.env.JWT_PUBLIC_KEY
  ? process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n')
  : '';

// @ts-expect-error koa-onerror type issue
onerror(app);

app.proxy = true;

app.use(corsMiddleware());

app.use(
  koajwt({
    secret: publicKey,
  }).unless({
    path: [
      '/favicon.ico',
      '/api/listBuckets',
      '/css/style.css',
      '/',
      '/api/user/register',
      '/api/Article',
      '/api/Article/',
      '/api/Background',
      '/api/Music',
      '/api/user/login',
      '/api/user/public_key',
      '/api/Comment',
      '/api/Comment/Add',
      '/api/fetchBingWallpaper',
    ],
  })
);

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(serve(path.join(__dirname, '../public')))
  .use(
    views(path.join(__dirname, '../views'), {
      options: { settings: { views: path.join(__dirname, '../views') } },
      map: { ejs: 'ejs' },
      extension: 'ejs',
    })
  );

routes(router);

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err: Error) => {
  console.log(err, ' ==> 服务报错原因');
});

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`Listening on http://0.0.0.0:${config.port}`);
});

export default server;
