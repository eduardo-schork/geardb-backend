import { TCommentLikeEntity } from '@/domain/entities/comment-like.entity';
import { Model } from 'sequelize';
import { CommentLikeModelAttributes } from '@/infra/database/sequelize/models/comment-like.model';

export function toCommentLikeEntity(
    model: Model<CommentLikeModelAttributes>,
): TCommentLikeEntity {
    const data = model.get() as Required<CommentLikeModelAttributes>;

    return {
        id: data.id,
        commentId: data.commentId,
        userId: data.userId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
