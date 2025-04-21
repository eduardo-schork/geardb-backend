import dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
    secret: (process.env.JWT_SECRET || 'test-key') as string,
    expiresIn: '100d',
};
