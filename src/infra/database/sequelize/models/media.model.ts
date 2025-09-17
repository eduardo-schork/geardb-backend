import { TMediaEntity } from '@/domain/entities/media.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineMediaModel(sequelize: Sequelize) {
    return sequelize.define<Model<TMediaEntity>>(
        'MediaModel',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: 'media',
            timestamps: false,
        },
    );
}
