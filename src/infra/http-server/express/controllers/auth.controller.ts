import { LoginUserUseCase } from '@/application/usecases/auth/login-user.usecase';
import { LogoutUserUseCase } from '@/application/usecases/auth/logout-user.usecase';
import { RegisterUserUseCase } from '@/application/usecases/auth/register-user.usecase';
import { Request, Response } from 'express';

import { SessionRepository } from '@/infra/database/sequelize/repositories/session.repository';
import { UserRepository } from '@/infra/database/sequelize/repositories/user.repository';
import FileStoragePort from '@/infra/file-storage/file-storage.port';

const userRepo = new UserRepository();
const sessionRepo = new SessionRepository();
const fileStorage = FileStoragePort;

const registerUseCase = new RegisterUserUseCase(userRepo, sessionRepo, fileStorage);
const loginUseCase = new LoginUserUseCase(userRepo, sessionRepo);
const logoutUseCase = new LogoutUserUseCase(sessionRepo);

async function register(req: Request, res: Response) {
    try {
        const { username, name, email, password, bio } = req.body;

        const ipAddress = req.ip;
        const userAgent = req.get('user-agent') || 'unknown';

        const profileImage = req.file
            ? {
                  filename: req.file.originalname,
                  buffer: req.file.buffer,
                  mimetype: req.file.mimetype,
              }
            : undefined;

        const result = await registerUseCase.execute({
            username,
            name,
            email,
            password,
            bio,
            profileImage,
            ipAddress,
            userAgent,
        });

        return res.status(201).json(result);
    } catch (error: any) {
        console.error('❌ Erro ao registrar:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function login(req: Request, res: Response) {
    try {
        const ipAddress = req.ip;
        const userAgent = req.headers['user-agent'] || 'unknown';

        const result = await loginUseCase.execute({
            ...req.body,
            ipAddress,
            userAgent,
        });

        return res.status(200).json(result);
    } catch (error: any) {
        console.error('❌ Erro ao logar:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function logout(req: Request, res: Response) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'Token ausente' });

        await logoutUseCase.execute(token);
        return res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error: any) {
        console.error('❌ Erro ao deslogar:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

export default {
    register,
    login,
    logout,
};
