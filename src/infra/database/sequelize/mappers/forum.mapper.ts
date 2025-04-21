import { TForumEntity } from '@/domain/entities/forum.entity';
import { Model } from 'sequelize';
import { ForumModelAttributes } from '@/infra/database/sequelize/models/forum.model';

export function toForumEntity(model: Model<ForumModelAttributes>): TForumEntity {
  const data = model.get() as Required<ForumModelAttributes>;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
}
