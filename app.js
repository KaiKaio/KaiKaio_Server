const fs = require("fs");
const dotenv = require('dotenv');

// 根据NODE_ENV加载不同的.env文件，必须在最前面加载
// 如果指定了NODE_ENV则加载对应的.env文件，否则加载默认的.env文件
const envPath = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env';

dotenv.config({
  path: envPath,
  // debug: true,
  encoding: 'utf8',
  // override: true
});

const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

const views = require("koa-views");
const co = require("co");
const convert = require("koa-convert");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const debug = require("debug")("koa2:server");
const path = require("path");
const koajwt = require("koa-jwt");

const corsMiddlewares = require("./middlewares/cors-middlewares");

const config = require("./config");
const routes = require("./routes");

// const keyPath = path.join(__dirname, "./util/ssl_key/rsa_public_key.pem")
const public_key = process.env.JWT_PUBLIC_KEY ? process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : ''

// error handler
onerror(app);

app.proxy = true;

// 配置跨域
app.use(corsMiddlewares());

// 配置Token校验
app.use(
  koajwt({
    secret: public_key,
  }).unless({
    path: [
      "/favicon.ico",
      "/api/listBuckets",
      "/css/style.css",
      "/",
      "/api/user/register",
      "/api/Article",
      "/api/Background",
      "/api/Music",
      "/api/user/login",
      "/api/user/public_key",
      "/api/Comment",
      "/api/Comment/Add",
      "/api/fetchBingWallpaper"
    ],
  })
);

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}$ms`);
});

app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(require("koa-static")(__dirname + "/public"))
  .use(
    views(path.join(__dirname, "/views"), {
      options: { settings: { views: path.join(__dirname, "views") } },
      map: { ejs: "ejs" },
      extension: "ejs",
    })
  )

// 路由配置相关
routes(router);
// Koa-Router配置
app
  .use(router.routes())
  .use(router.allowedMethods())

app.on("error", function (err, ctx) {
  console.log(err, ' ==> 服务报错原因');
});

module.exports = app.listen(config.port, '0.0.0.0', () => {
  console.log(`Listening on http://0.0.0.0:${config.port}`);
});
