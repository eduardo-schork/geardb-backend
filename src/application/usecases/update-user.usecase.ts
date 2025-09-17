import { TUserEntity } from '@/domain/entities/user.entity';
import { TUserRepository } from '@/domain/repositories/user-repository.type';
import { IFileStoragePort } from '@/infra/file-storage/file-storage.port';
import { v4 as uuidv4 } from 'uuid';

export type UpdateUserInput = Partial<
    Omit<TUserEntity, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'imageUrl'>
> & {
    profileImage?: {
        filename: string;
        buffer: Buffer;
        mimetype: string;
    };
};

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: TUserRepository,
        private readonly fileStorageService: IFileStoragePort,
    ) {}

    async execute(userId: string, data: UpdateUserInput): Promise<TUserEntity | null> {
        const existingUser = await this.userRepository.findById(userId);

        if (!existingUser) {
            throw new Error('User not found');
        }

        let imageUrl = existingUser.imageUrl;

        if (data.profileImage) {
            const filePath = `profile-images/${uuidv4()}-${data.profileImage.filename}`;
            imageUrl = await this.fileStorageService.upload(
                filePath,
                data.profileImage.buffer,
                data.profileImage.mimetype,
            );
        }

        const updatedUser: TUserEntity = {
            ...existingUser,
            ...data,
            imageUrl,
            updatedAt: new Date(),
        };

        let newUser = await this.userRepository.update(userId, updatedUser);

        if (newUser?.passwordHash) {
            newUser = {
                ...newUser,
                passwordHash: '',
            };
        }

        return newUser;
    }
}
