// 引入模块依赖
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;
  }

  // 生成token
  generateToken() {
    let userid = this.data;
    const JWT_EXPIRATION = 8 * 60 * 60; // 8Hours时限
    let cert = fs.readFileSync(path.join(__dirname, "./ssl_key/rsa_private_key.pem")); // 私钥加密Token
    let token = jwt.sign(
      {
        userid
      },
      cert,
      {
        expiresIn: JWT_EXPIRATION,
        algorithm: 'RS256'
      }
    );
    return token;
  }
}

module.exports = Jwt;
