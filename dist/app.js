"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const koa_views_1 = __importDefault(require("@ladjs/koa-views"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_onerror_1 = __importDefault(require("koa-onerror"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = __importDefault(require("path"));
const cors_middlewares_1 = __importDefault(require("./middlewares/cors-middlewares"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const envPath = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env';
dotenv_1.default.config({
    path: envPath,
    encoding: 'utf8',
});
const app = new koa_1.default();
const router = new router_1.default();
const publicKey = process.env.JWT_PUBLIC_KEY ? process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : '';
// @ts-expect-error koa-onerror type issue
(0, koa_onerror_1.default)(app);
app.proxy = true;
app.use((0, cors_middlewares_1.default)());
app.use((0, koa_jwt_1.default)({
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
}));
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app
    .use((0, koa_bodyparser_1.default)())
    .use((0, koa_json_1.default)())
    .use((0, koa_logger_1.default)())
    .use((0, koa_static_1.default)(path_1.default.join(__dirname, '../public')))
    .use((0, koa_views_1.default)(path_1.default.join(__dirname, '../views'), {
    options: { settings: { views: path_1.default.join(__dirname, '../views') } },
    map: { ejs: 'ejs' },
    extension: 'ejs',
}));
(0, routes_1.default)(router);
app.use(router.routes()).use(router.allowedMethods());
app.on('error', (err) => {
    console.log(err, ' ==> 服务报错原因');
});
const server = app.listen(config_1.default.port, '0.0.0.0', () => {
    console.log(`Listening on http://0.0.0.0:${config_1.default.port}`);
});
exports.default = server;
//# sourceMappingURL=app.js.map