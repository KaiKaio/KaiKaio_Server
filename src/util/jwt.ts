import jwt from 'jsonwebtoken';

interface JwtPayload {
  userid: string;
}

export interface JwtSignOptions {
  userid: string;
}

class Jwt {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  generateToken(): string {
    const userid = this.data;
    const JWT_EXPIRATION = 8 * 60 * 60;
    const cert = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
    const token = jwt.sign({ userid }, cert, {
      expiresIn: JWT_EXPIRATION,
      algorithm: 'RS256',
    });
    return token;
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const cert = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') || '';
      const decoded = jwt.verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload;
      return decoded;
    } catch {
      return null;
    }
  }
}

export default Jwt;
