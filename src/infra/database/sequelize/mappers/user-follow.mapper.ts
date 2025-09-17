import { TUserFollowEntity } from '@/domain/entities/user-follow.entity';
import { Model } from 'sequelize';

export function toUserFollowEntity(model: Model<TUserFollowEntity>): TUserFollowEntity {
    const data = model.get() as Required<TUserFollowEntity>;

    return {
        id: data.id,
        followerId: data.followerId,
        followingId: data.followingId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
