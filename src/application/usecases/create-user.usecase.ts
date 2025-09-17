import { TUserEntity } from '@/domain/entities/user.entity';
import { TUserRepository } from '@/domain/repositories/user-repository.type';
import { IFileStoragePort } from '@/infra/file-storage/file-storage.port';
import { v4 as uuidv4 } from 'uuid';

export type CreateUserInput = Omit<
    TUserEntity,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'imageUrl'
> & {
    profileImage?: {
        filename: string;
        buffer: Buffer;
        mimetype: string;
    };
};

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: TUserRepository,
        private readonly fileStorageService: IFileStoragePort,
    ) {}

    async execute(data: CreateUserInput): Promise<TUserEntity> {
        const now = new Date();

        let imageUrl: string | null = null;

        if (data.profileImage) {
            const filePath = `profile-images/${uuidv4()}-${data.profileImage.filename}`;
            imageUrl = await this.fileStorageService.upload(
                filePath,
                data.profileImage.buffer,
                data.profileImage.mimetype,
            );
        }

        const user: TUserEntity = {
            ...data,
            id: uuidv4(),
            imageUrl,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };

        return this.userRepository.create(user);
    }
}
