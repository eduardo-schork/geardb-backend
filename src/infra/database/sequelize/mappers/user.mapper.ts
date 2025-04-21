import { TUserEntity } from '@/domain/entities/user.entity';
import { Model } from 'sequelize';
import { UserModelAttributes } from '@/infra/database/sequelize/models/user.model';

export function toUserEntity(model: Model<UserModelAttributes>): TUserEntity {
  const data = model.get() as Required<UserModelAttributes>;

  return {
    id: data.id,
    username: data.username,
    name: data.name,
    email: data.email,
    passwordHash: data.passwordHash,
    profilePicture: data.profilePicture,
    bio: data.bio,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
}
