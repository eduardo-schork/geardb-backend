import { TFipePriceEntity } from '@/domain/entities/fipe-price.entity';
import { Model } from 'sequelize';
import { FipePriceModelAttributes } from '@/infra/database/sequelize/models/fipe-price.model';

export function toFipePriceEntity(model: Model<FipePriceModelAttributes>): TFipePriceEntity {
  const data = model.get() as Required<FipePriceModelAttributes>;

  return {
    id: data.id,
    vehicleId: data.vehicleId,
    price: data.price,
    referenceMonth: data.referenceMonth,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
}
