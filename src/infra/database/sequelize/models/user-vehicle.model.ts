import { TUserVehicleEntity } from '@/domain/entities/user-vehicle.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineUserVehicleModel(sequelize: Sequelize) {
    return sequelize.define<Model<TUserVehicleEntity>>(
        'UserVehicleModel',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'user', // nome da tabela User
                    key: 'id',
                },
            },
            vehicleId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'vehicle', // nome da tabela Vehicle
                    key: 'id',
                },
            },
            nickname: { type: DataTypes.STRING, allowNull: false },
            notes: { type: DataTypes.STRING, allowNull: false },
            power: { type: DataTypes.STRING, allowNull: false },
            torque: { type: DataTypes.STRING, allowNull: false },
            imageUrl: { type: DataTypes.TEXT, allowNull: true },
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
            tableName: 'user_vehicle',
            timestamps: false,
        },
    );
}
