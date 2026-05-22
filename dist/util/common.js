"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIp = exports.checkVarIsEmpty = void 0;
/**
 * 判断变量是否为空
 */
const checkVarIsEmpty = (variable) => {
    if (variable === '' || variable === null || variable === undefined) {
        return true;
    }
    return false;
};
exports.checkVarIsEmpty = checkVarIsEmpty;
/**
 * 获取用户 IP
 */
const getUserIp = (req) => {
    if (!req)
        return '';
    const normalizeIp = (raw) => {
        if (!raw)
            return '';
        let ip = String(raw).split(',')[0].trim();
        const bracketMatch = ip.match(/^\[(.*)\](?::\d+)?$/);
        if (bracketMatch) {
            ip = bracketMatch[1];
        }
        else {
            if (ip.indexOf('.') !== -1 && ip.lastIndexOf(':') > ip.lastIndexOf('.')) {
                ip = ip.substring(0, ip.lastIndexOf(':'));
            }
        }
        if (ip.startsWith('::ffff:')) {
            ip = ip.replace('::ffff:', '');
        }
        ip = ip.split('%')[0];
        return ip;
    };
    let ip = '';
    if (req.ip)
        ip = req.ip;
    if (!ip && Array.isArray(req.ips) && req.ips.length)
        ip = req.ips[0];
    const headerSources = [
        'x-forwarded-for',
        'x-real-ip',
        'cf-connecting-ip',
        'x-client-ip',
        'forwarded',
        'forwarded-for',
    ];
    if (!ip) {
        for (const h of headerSources) {
            const v = req.headers && req.headers[h];
            if (v) {
                ip = Array.isArray(v) ? v[0] : v;
                break;
            }
        }
    }
    if (!ip) {
        ip =
            (req.connection && req.connection.remoteAddress) ||
                (req.socket && req.socket.remoteAddress) ||
                (req.connection && req.connection.socket && req.connection.socket.remoteAddress) ||
                '';
    }
    return normalizeIp(ip);
};
exports.getUserIp = getUserIp;
//# sourceMappingURL=common.js.map