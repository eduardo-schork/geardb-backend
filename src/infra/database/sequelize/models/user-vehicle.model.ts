import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UserVehicleModelAttributes {
  userId: string;
  vehicleId: string;
  nickname: string;
  notes: string;
  isPublic: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default function defineUserVehicleModel(sequelize: Sequelize) {
  return sequelize.define<Model<UserVehicleModelAttributes>>('UserVehicleModel', {
      userId: { type: DataTypes.UUID, allowNull: false },
      vehicleId: { type: DataTypes.UUID, allowNull: false },
      nickname: { type: DataTypes.STRING, allowNull: false },
      notes: { type: DataTypes.TEXT, allowNull: false },
      isPublic: { type: DataTypes.BOOLEAN, allowNull: false },
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'user_vehicle',
    timestamps: false,
  });
}
