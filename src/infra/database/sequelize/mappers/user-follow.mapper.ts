import { TUserFollowEntity } from '@/domain/entities/user-follow.entity';
import { Model } from 'sequelize';
import { UserFollowModelAttributes } from '@/infra/database/sequelize/models/user-follow.model';

export function toUserFollowEntity(model: Model<UserFollowModelAttributes>): TUserFollowEntity {
  const data = model.get() as Required<UserFollowModelAttributes>;

  return {
    id: data.id,
    followerId: data.followerId,
    followingId: data.followingId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
}
