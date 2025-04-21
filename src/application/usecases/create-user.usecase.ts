import { TUserEntity } from '@/domain/entities/user.entity';
import { TUserRepository } from '@/domain/repositories/user-repository.type';

export class CreateUserUseCase {
    constructor(private readonly userRepository: TUserRepository) {}

    async execute(
        data: Omit<TUserEntity, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    ): Promise<TUserEntity> {
        const now = new Date();

        const user: TUserEntity = {
            ...data,
            id: '',
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };

        return this.userRepository.create(user);
    }
}
