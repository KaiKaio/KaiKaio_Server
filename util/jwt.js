// 引入模块依赖
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
    let cert = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'); // 从环境变量读取私钥
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
