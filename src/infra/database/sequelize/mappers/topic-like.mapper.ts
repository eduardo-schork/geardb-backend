import { TTopicLikeEntity } from '@/domain/entities/topic-like.entity';
import { Model } from 'sequelize';
import { TopicLikeModelAttributes } from '@/infra/database/sequelize/models/topic-like.model';

export function toTopicLikeEntity(model: Model<TopicLikeModelAttributes>): TTopicLikeEntity {
  const data = model.get() as Required<TopicLikeModelAttributes>;

  return {
    id: data.id,
    topicId: data.topicId,
    userId: data.userId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
}
