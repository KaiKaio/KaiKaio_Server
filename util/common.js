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
  if (!req) return "";

  const normalizeIp = (raw) => {
    if (!raw) return "";
    // take first if multiple
    let ip = String(raw).split(',')[0].trim();
    // [::1]:port -> remove brackets and port
    const bracketMatch = ip.match(/^\[(.*)\](?::\d+)?$/);
    if (bracketMatch) ip = bracketMatch[1];
    else {
      // IPv4 with port like 127.0.0.1:3000 -> remove port
      if (ip.indexOf('.') !== -1 && ip.lastIndexOf(':') > ip.lastIndexOf('.')) {
        ip = ip.substring(0, ip.lastIndexOf(':'));
      }
    }
    // Remove IPv4-mapped IPv6 prefix
    if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
    // Remove zone id (%eth0)
    ip = ip.split('%')[0];
    return ip;
  };

  // Prefer Express-provided values when available
  let ip = '';
  if (req.ip) ip = req.ip;
  if (!ip && Array.isArray(req.ips) && req.ips.length) ip = req.ips[0];

  const headerSources = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'x-client-ip',
    'forwarded',
    'forwarded-for'
  ];
  if (!ip) {
    for (const h of headerSources) {
      const v = req.headers && req.headers[h];
      if (v) { ip = v; break; }
    }
  }

  if (!ip) {
    ip = (req.connection && req.connection.remoteAddress) ||
         (req.socket && req.socket.remoteAddress) ||
         (req.connection && req.connection.socket && req.connection.socket.remoteAddress) ||
         '';
  }

  return normalizeIp(ip);
}

exports.checkVarIsEmpty = checkVarIsEmpty;
exports.getUserIp = getUserIp;
