import { TUserEntity } from '@/domain/entities/user.entity';
import { TSessionRepository } from '@/domain/repositories/session-repository.type';
import { TUserRepository } from '@/domain/repositories/user-repository.type';
import AuthProvider from '@/infra/auth/auth-provider.port';
import CryptoPort from '@/infra/crypto/crypto.port';
import { IFileStoragePort } from '@/infra/file-storage/file-storage.port';
import { CreateUserUseCase } from '../create-user.usecase';

type TRegisterUserInput = {
    username: string;
    name: string;
    email: string;
    password: string;
    bio?: string | null;
    profileImage?: {
        filename: string;
        buffer: Buffer;
        mimetype: string;
    };
    ipAddress?: string;
    userAgent: string;
};

export class RegisterUserUseCase {
    constructor(
        private readonly userRepo: TUserRepository,
        private readonly sessionRepo: TSessionRepository,
        private readonly fileStorageService: IFileStoragePort,
    ) {}

    async execute(
        input: TRegisterUserInput,
    ): Promise<{ user: TUserEntity; token: string }> {
        const existingUser = await this.userRepo.findByEmail(input.email);
        if (existingUser) {
            throw new Error('Email já está em uso');
        }

        const passwordHash = await CryptoPort.hash(input.password);

        const createUserUseCase = new CreateUserUseCase(
            this.userRepo,
            this.fileStorageService,
        );

        const createdUser = await createUserUseCase.execute({
            username: input.username,
            name: input.name,
            email: input.email,
            passwordHash,
            bio: input.bio ?? null,
            profileImage: input.profileImage,
        });

        const token = AuthProvider.generateToken({ userId: createdUser.id });

        const now = new Date();
        const expiresAt = new Date(now);
        expiresAt.setDate(now.getDate() + 1);

        await this.sessionRepo.create({
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
