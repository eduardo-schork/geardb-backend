import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UserFollowModelAttributes {
    followerId: string;
    followingId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export default function defineUserFollowModel(sequelize: Sequelize) {
    return sequelize.define<Model<UserFollowModelAttributes>>(
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
