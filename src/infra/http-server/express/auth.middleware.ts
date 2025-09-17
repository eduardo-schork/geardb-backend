// @ts-nocheck

import AuthProvider from '@/infra/auth/auth-provider.port';
import { NextFunction, Request, Response } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token ausente' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = AuthProvider.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}
