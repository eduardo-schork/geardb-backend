import { TUserEntity } from '@/domain/entities/user.entity';
import { Model } from 'sequelize';

export function toUserEntity(model: Model<TUserEntity>): TUserEntity {
    const data = model.get() as Required<TUserEntity>;

    return {
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        imageUrl: data.imageUrl,
        bio: data.bio,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
