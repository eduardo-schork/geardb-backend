import { TVehicleEntity } from '@/domain/entities/vehicle.entity';
import { Model } from 'sequelize';

export function toVehicleEntity(model: Model<TVehicleEntity>): TVehicleEntity {
    const data = model.get() as Required<TVehicleEntity>;

    return {
        id: data.id,
        version: data.version,
        brand: data.brand,
        model: data.model,
        year: data.year,
        label: data.label,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
