import { TTopicEntity } from '@/domain/entities/topic.entity';
import { TTopicRepository } from '@/domain/repositories/topic-repository.type';
import { IFileStoragePort } from '@/infra/file-storage/file-storage.port';
import { v4 as uuidv4 } from 'uuid';

export type TCreateTopicInput = {
    forumId: string;
    userId: string;
    title: string;
    content: string;
    image?: {
        filename: string;
        buffer: Buffer;
        mimetype: string;
    };
};

export class CreateTopicUseCase {
    constructor(
        private readonly topicRepository: TTopicRepository,
        private readonly fileStorageService: IFileStoragePort,
    ) {}

    async execute(input: TCreateTopicInput): Promise<TTopicEntity> {
        const now = new Date();

        let imageUrl: string | null = null;

        if (input.image) {
            const filePath = `topics/${uuidv4()}-${input.image.filename}`;
            imageUrl = await this.fileStorageService.upload(
                filePath,
                input.image.buffer,
                input.image.mimetype,
            );
        }

        const topic: TTopicEntity = {
            id: uuidv4(),
            forumId: input.forumId,
            userId: input.userId,
            title: input.title,
            content: input.content,
            imageUrl: imageUrl ?? '',
            views: 0,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };

        return this.topicRepository.create(topic);
    }
}
