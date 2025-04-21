import { TUserEntity } from '@/domain/entities/user.entity';
import { TSessionRepository } from '@/domain/repositories/session-repository.type';
import { TUserRepository } from '@/domain/repositories/user-repository.type';
import AuthProvider from '@/infra/auth/auth-provider.port';
import CryptoPort from '@/infra/crypto/crypto.port';

type TRegisterUserInput = {
    username: string;
    name: string;
    email: string;
    password: string;
    profilePicture?: string | null;
    bio?: string | null;
    ipAddress: string;
    userAgent: string;
};

export class RegisterUserUseCase {
    constructor(
        private userRepo: TUserRepository,
        private sessionRepo: TSessionRepository,
    ) {}

    async execute(
        input: TRegisterUserInput,
    ): Promise<{ user: TUserEntity; token: string }> {
        const existingUser = await this.userRepo.findByEmail(input.email);
        if (existingUser) {
            throw new Error('Email já está em uso');
        }

        const passwordHash = await CryptoPort.hash(input.password);

        const now = new Date();

        const user: Omit<TUserEntity, 'id'> = {
            username: input.username,
            name: input.name,
            email: input.email,
            passwordHash,
            profilePicture: input.profilePicture ?? null,
            bio: input.bio ?? null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };

        const createdUser = await this.userRepo.create(user);

        const token = AuthProvider.generateToken({ userId: createdUser.id });

        const expiresAt = new Date(now);
        expiresAt.setDate(now.getDate() + 1);

        const createdSession = await this.sessionRepo.create({
            token,
            userId: createdUser.id,
            ipAddress: input.ipAddress,
            userAgent: input.userAgent,
            createdAt: now,
            updatedAt: now,
            expiresAt,
            deletedAt: null,
        });

        return { user: createdUser, token };
    }
}
