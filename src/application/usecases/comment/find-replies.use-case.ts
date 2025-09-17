import { TCommentApiResponse } from '@/domain/entities/comment.entity';
import { TCommentRepository } from '@/domain/repositories/comment-repository.type';

export class FindRepliesUseCase {
    constructor(private commentRepo: TCommentRepository) {}

    async execute({
        parentCommentId,
        userId,
    }: {
        parentCommentId: string;
        userId: string;
    }): Promise<TCommentApiResponse[]> {
        return this.commentRepo.findRepliesByParentCommentId({ parentCommentId, userId });
    }
}
