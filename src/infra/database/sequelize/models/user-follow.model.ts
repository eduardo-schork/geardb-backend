import { TUserFollowEntity } from '@/domain/entities/user-follow.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineUserFollowModel(sequelize: Sequelize) {
    return sequelize.define<Model<TUserFollowEntity>>(
        'UserFollowModel',
        {
            followerId: { type: DataTypes.UUID, allowNull: false },
            followingId: { type: DataTypes.UUID, allowNull: false },
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
            tableName: 'user_follow',
            timestamps: false,
        },
    );
}
