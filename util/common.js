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

exports.checkVarIsEmpty = checkVarIsEmpty
