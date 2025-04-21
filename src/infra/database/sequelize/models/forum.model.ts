import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ForumModelAttributes {
  title: string;
  description: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default function defineForumModel(sequelize: Sequelize) {
  return sequelize.define<Model<ForumModelAttributes>>('ForumModel', {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'forum',
    timestamps: false,
  });
}
