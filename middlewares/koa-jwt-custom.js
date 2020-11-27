const fs = require("fs");
const path = require("path");
const koajwt = require("koa-jwt");

const private_key = fs.readFileSync(path.join(__dirname, "../util/ssl_key/rsa_public_key.pem"));
// const private_key = fs.readFileSync(path.join(__dirname, "../util/ssl_key/rsa_private_key.pem"));

module.exports = function (app) {
  // 错误处理
  app.use((ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body =
          "Protected resource, use Authorization header to get access\n";
      } else {
        throw err;
      }
    });
  });

  app.use(
    koajwt({

      secret: private_key,
    }).unless({
      path: [
        '/api/Article',
        '/api/Background',
        '/api/Music',
        '/api/user/login'
      ],
    })
  );
};

// path: [
//   /^\/api\/login/,
//   /^\/api\/register/,
//   /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
// ]
