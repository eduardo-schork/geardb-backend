import { DataTypes, Model, Sequelize } from 'sequelize';

export interface TopicLikeModelAttributes {
    topicId: string;
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export default function defineTopicLikeModel(sequelize: Sequelize) {
    return sequelize.define<Model<TopicLikeModelAttributes>>(
        'TopicLikeModel',
        {
            topicId: { type: DataTypes.UUID, allowNull: false },
            userId: { type: DataTypes.UUID, allowNull: false },
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
            tableName: 'topic_like',
            timestamps: false,
        },
    );
}
