import { TTopicEntity } from '@/domain/entities/topic.entity';
import { Model } from 'sequelize';

export function toTopicEntity(model: Model<TTopicEntity>): TTopicEntity {
    const data = model.get() as Required<TTopicEntity>;

    return {
        id: data.id,
        forumId: data.forumId,
        userId: data.userId,
        content: data.content,
        imageUrl: data.imageUrl,
        title: data.title,
        views: data.views,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
