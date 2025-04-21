import { TCommentEntity } from '@/domain/entities/comment.entity';
import { Model } from 'sequelize';
import { CommentModelAttributes } from '@/infra/database/sequelize/models/comment.model';

export function toCommentEntity(
    model: Model<CommentModelAttributes>,
): TCommentEntity {
    const data = model.get() as Required<CommentModelAttributes>;

    return {
        id: data.id,
        topicId: data.topicId,
        userId: data.userId,
        parentCommentId: data.parentCommentId,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
