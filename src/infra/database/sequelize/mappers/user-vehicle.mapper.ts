import { TUserVehicleEntity } from '@/domain/entities/user-vehicle.entity';
import { Model } from 'sequelize';

export function toUserVehicleEntity(
    model: Model<TUserVehicleEntity>,
): TUserVehicleEntity {
    const data = model.get() as Required<TUserVehicleEntity>;

    return {
        id: data.id,
        userId: data.userId,
        vehicleId: data.vehicleId,
        nickname: data.nickname,
        notes: data.notes,
        power: data.power,
        torque: data.torque,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
