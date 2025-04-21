import { TSessionEntity } from '@/domain/entities/session.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineSessionModel(sequelize: Sequelize) {
    return sequelize.define<Model<TSessionEntity>>(
        'SessionModel',
        {
            userId: { type: DataTypes.UUID, allowNull: false },
            token: { type: DataTypes.STRING, allowNull: false },
            ipAddress: { type: DataTypes.STRING, allowNull: false },
            userAgent: { type: DataTypes.STRING, allowNull: false },
            expiresAt: { type: DataTypes.DATE, allowNull: false },
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
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
            tableName: 'session',
            timestamps: false,
        },
    );
}
