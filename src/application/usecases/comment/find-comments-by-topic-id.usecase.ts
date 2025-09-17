import { TCommentEntity } from '@/domain/entities/comment.entity';
import { TCommentRepository } from '@/domain/repositories/comment-repository.type';

export class FindCommentsByTopicIdUseCase {
    constructor(private readonly commentRepo: TCommentRepository) {}

    async execute({
        topicId,
        userId,
    }: {
        topicId: string;
        userId: string;
    }): Promise<TCommentEntity[]> {
        return await this.commentRepo.findByTopicId({ topicId, userId });
    }
}
