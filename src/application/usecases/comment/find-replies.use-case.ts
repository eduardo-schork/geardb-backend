import { TCommentEntity } from '@/domain/entities/comment.entity';
import { TCommentRepository } from '@/domain/repositories/comment-repository.type';

export class FindRepliesUseCase {
    constructor(private commentRepo: TCommentRepository) {}

    async execute(parentCommentId: string): Promise<TCommentEntity[]> {
        return this.commentRepo.findRepliesByParentCommentId(parentCommentId);
    }
}
