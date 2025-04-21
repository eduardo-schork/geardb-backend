import { TUserVehicleEntity } from '@/domain/entities/user-vehicle.entity';
import { Model } from 'sequelize';
import { UserVehicleModelAttributes } from '@/infra/database/sequelize/models/user-vehicle.model';

export function toUserVehicleEntity(model: Model<UserVehicleModelAttributes>): TUserVehicleEntity {
  const data = model.get() as Required<UserVehicleModelAttributes>;

  return {
    id: data.id,
    userId: data.userId,
    vehicleId: data.vehicleId,
    nickname: data.nickname,
    notes: data.notes,
    isPublic: data.isPublic,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
}
