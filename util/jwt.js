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
    let data = this.data;
    const JWT_EXPIRATION = 1000 * 60 * 60; // 1Hours时限
    let cert = fs.readFileSync(path.join(__dirname, "./ssl_key/rsa_private_key.pem")); //私钥 可以自己生成
    let token = jwt.sign(
      {data},
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
