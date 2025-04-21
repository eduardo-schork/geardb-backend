import { DataTypes, Model, Sequelize } from 'sequelize';

export interface CommentModelAttributes {
    topicId: string;
    userId: string;
    parentCommentId: string | null;
    content: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export default function defineCommentModel(sequelize: Sequelize) {
    return sequelize.define<Model<CommentModelAttributes>>(
        'CommentModel',
        {
            topicId: { type: DataTypes.UUID, allowNull: false },
            userId: { type: DataTypes.UUID, allowNull: false },
            parentCommentId: { type: DataTypes.UUID, allowNull: true },
            content: { type: DataTypes.TEXT, allowNull: false },
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
            tableName: 'comment',
            timestamps: false,
        },
    );
}
