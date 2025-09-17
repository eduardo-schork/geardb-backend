import { TMediaEntity } from '@/domain/entities/media.entity';
import { Model } from 'sequelize';
import { MediaModelAttributes } from '@/infra/database/sequelize/models/media.model';

export function toMediaEntity(model: Model<MediaModelAttributes>): TMediaEntity {
  const data = model.get() as Required<MediaModelAttributes>;

  return {
    id: data.id,
    url: data.url,
    type: data.type,
    entityType: data.entityType,
    entityId: data.entityId,
    userId: data.userId,
    isPrimary: data.isPrimary,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
}
