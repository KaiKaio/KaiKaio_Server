interface JwtPayload {
    userid: string;
}
export interface JwtSignOptions {
    userid: string;
}
declare class Jwt {
    private data;
    constructor(data: string);
    generateToken(): string;
    static verifyToken(token: string): JwtPayload | null;
}
export default Jwt;
//# sourceMappingURL=jwt.d.ts.map