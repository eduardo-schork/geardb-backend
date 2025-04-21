import { TVehicleEntity } from '@/domain/entities/vehicle.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineVehicleModel(sequelize: Sequelize) {
    return sequelize.define<Model<TVehicleEntity>>(
        'VehicleModel',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            brand: { type: DataTypes.STRING, allowNull: false },
            model: { type: DataTypes.STRING, allowNull: false },
            version: { type: DataTypes.STRING, allowNull: false },
            year: { type: DataTypes.INTEGER, allowNull: false },
            label: { type: DataTypes.STRING, allowNull: false },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            deletedAt: { type: DataTypes.DATE, allowNull: true },
        },
        {
            tableName: 'vehicle',
            timestamps: false,
        },
    );
}
