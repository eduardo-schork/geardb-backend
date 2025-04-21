import { DataTypes, Model, Sequelize } from 'sequelize';

export interface FipePriceModelAttributes {
  vehicleId: string;
  price: number;
  referenceMonth: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default function defineFipePriceModel(sequelize: Sequelize) {
  return sequelize.define<Model<FipePriceModelAttributes>>('FipePriceModel', {
      vehicleId: { type: DataTypes.UUID, allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      referenceMonth: { type: DataTypes.STRING, allowNull: false },
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'fipe_price',
    timestamps: false,
  });
}
