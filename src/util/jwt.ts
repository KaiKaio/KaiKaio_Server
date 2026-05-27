import jwt from 'jsonwebtoken';

interface JwtPayload {
  userid: string;
}

export interface JwtSignOptions {
  userid: string;
}

type TokenType = 'access' | 'refresh';

interface FullJwtPayload extends JwtPayload {
  type: TokenType;
}

class Jwt {
  private userid: string;

  constructor(userid: string) {
    this.userid = userid;
  }

  generateAccessToken(): string {
    const payload: FullJwtPayload = { userid: this.userid, type: 'access' };
    const ACCESS_EXPIRATION = 1 * 24 * 60 * 60 * 1000; // 1day
    const cert = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
    const token = jwt.sign(payload, cert, {
      expiresIn: ACCESS_EXPIRATION,
      algorithm: 'RS256',
    });
    return token;
  }

  generateRefreshToken(): string {
    const payload: FullJwtPayload = { userid: this.userid, type: 'refresh' };
    const REFRESH_EXPIRATION = 14 * 24 * 60 * 60; // 14 days
    const cert = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
    const token = jwt.sign(payload, cert, {
      expiresIn: REFRESH_EXPIRATION,
      algorithm: 'RS256',
    });
    return token;
  }

  static verifyToken(token: string): FullJwtPayload | null {
    try {
      const cert = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') || '';
      const decoded = jwt.verify(token, cert, { algorithms: ['RS256'] }) as FullJwtPayload;
      return decoded;
    } catch {
      return null;
    }
  }
}

export default Jwt;
