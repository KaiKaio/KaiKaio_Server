/**
 * 判断变量是否为空
 * @param variable
 */
const checkVarIsEmpty = (variable) => {
  if((variable === "") || (variable === null) || (variable === undefined)) {
    return true;
  } else {
    return false;
  }
}

const getUserIp = (req) => {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

exports.checkVarIsEmpty = checkVarIsEmpty;
exports.getUserIp = getUserIp;
