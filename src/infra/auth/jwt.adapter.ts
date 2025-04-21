import jwt from 'jsonwebtoken';
import { TAuthAdapter } from './auth-provider.port';
import { jwtConfig } from './jwt.config';

class JwtAdapter implements TAuthAdapter {
    generateToken(
        payload: object,
        expiresIn: string = jwtConfig.expiresIn,
    ): string {
        // @ts-ignore
        return jwt.sign(payload, jwtConfig.secret, { expiresIn });
    }

    verifyToken(token: string): any {
        return jwt.verify(token, jwtConfig.secret);
    }
}

export default new JwtAdapter();
