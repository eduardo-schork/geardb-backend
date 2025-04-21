import JwtAdapter from './jwt.adapter';

export interface TAuthAdapter {
    generateToken(payload: object, expiresIn?: string): string;
    verifyToken(token: string): any;
}

const AuthProvider = JwtAdapter;

export default AuthProvider;
