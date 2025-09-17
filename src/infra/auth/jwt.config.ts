import dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
    secret: (process.env.JWT_SECRET || 'test-key') as string,
    expiresIn: process.env.JWT_EXPIRES_IN || '100d',
};
