/**
 * 判断变量是否为空
 */
export declare const checkVarIsEmpty: (variable: unknown) => boolean;
interface RequestLike {
    ip?: string;
    ips?: string[];
    headers?: Record<string, string | string[] | undefined>;
    connection?: {
        remoteAddress?: string;
        socket?: {
            remoteAddress?: string;
        };
    };
    socket?: {
        remoteAddress?: string;
    };
}
/**
 * 获取用户 IP
 */
export declare const getUserIp: (req: RequestLike | null | undefined) => string;
export {};
//# sourceMappingURL=common.d.ts.map