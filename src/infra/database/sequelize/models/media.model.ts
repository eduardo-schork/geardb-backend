import { DataTypes, Model, Sequelize } from 'sequelize';

export interface MediaModelAttributes {
  url: string;
  type: string;
  entityType: string;
  entityId: string;
  userId: string;
  isPrimary: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default function defineMediaModel(sequelize: Sequelize) {
  return sequelize.define<Model<MediaModelAttributes>>('MediaModel', {
      url: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      entityType: { type: DataTypes.STRING, allowNull: false },
      entityId: { type: DataTypes.UUID, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: false },
      isPrimary: { type: DataTypes.BOOLEAN, allowNull: false },
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'media',
    timestamps: false,
  });
}
