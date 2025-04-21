import { TUserEntity } from '@/domain/entities/user.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineUserModel(sequelize: Sequelize) {
    return sequelize.define<Model<TUserEntity>>(
        'UserModel',
        {
            username: { type: DataTypes.STRING, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            passwordHash: { type: DataTypes.STRING, allowNull: false },
            profilePicture: { type: DataTypes.STRING, allowNull: true },
            bio: { type: DataTypes.TEXT, allowNull: true },
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
            tableName: 'user',
            timestamps: false,
        },
    );
}
