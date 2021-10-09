const fs = require("fs");

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

const public_key = fs.readFileSync(
  path.join(__dirname, "./util/ssl_key/rsa_public_key.pem")
);

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
    path: ["/api/Article", "/api/Background", "/api/Music", "/api/user/login", "/api/user/public_key", "/api/fetchBingWallpaper"],
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

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
