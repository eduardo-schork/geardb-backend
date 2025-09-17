import { TSessionRepository } from '@/domain/repositories/session-repository.type';
import { TUserRepository } from '@/domain/repositories/user-repository.type';
import AuthProvider from '@/infra/auth/auth-provider.port';
import CryptoPort from '@/infra/crypto/crypto.port';

type TLoginInput = {
    email: string;
    password: string;
    ipAddress: string;
    userAgent: string;
};

export class LoginUserUseCase {
    constructor(
        private readonly userRepo: TUserRepository,
        private readonly sessionRepo: TSessionRepository,
    ) {}

    async execute(input: TLoginInput) {
        const user = await this.userRepo.findByEmail(input.email);
        if (!user) throw new Error('Usuário não encontrado');

        const isPasswordValid = await CryptoPort.compare(
            input.password,
            user.passwordHash,
        );
        if (!isPasswordValid) throw new Error('Senha inválida');

        const token = AuthProvider.generateToken({ userId: user.id });

        const now = new Date();
        const expiresAt = new Date(now);
        expiresAt.setDate(now.getDate() + 1);

        await this.sessionRepo.create({
            token,
            userId: user.id,
            ipAddress: input.ipAddress,
            userAgent: input.userAgent,
            createdAt: now,
            updatedAt: now,
            expiresAt,
            deletedAt: null,
        });

        return { token, user };
    }
}
