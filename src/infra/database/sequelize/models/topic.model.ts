import { TTopicEntity } from '@/domain/entities/topic.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineTopicModel(sequelize: Sequelize) {
    return sequelize.define<Model<TTopicEntity>>(
        'TopicModel',
        {
            forumId: { type: DataTypes.UUID, allowNull: false },
            userId: { type: DataTypes.UUID, allowNull: false },
            title: { type: DataTypes.STRING, allowNull: false },
            content: { type: DataTypes.STRING, allowNull: true },
            imageUrl: { type: DataTypes.STRING, allowNull: true },
            views: { type: DataTypes.INTEGER, allowNull: true },
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
            tableName: 'topic',
            timestamps: false,
        },
    );
}
