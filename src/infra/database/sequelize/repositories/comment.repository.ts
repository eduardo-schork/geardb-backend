import { col, fn, literal, Op } from 'sequelize';

import { TCommentApiResponse, TCommentEntity } from '@/domain/entities/comment.entity';
import { TCommentRepository } from '@/domain/repositories/comment-repository.type';
import { toCommentEntity } from '@/infra/database/sequelize/mappers/comment.mapper';
import defineCommentModel from '@/infra/database/sequelize/models/comment.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';
import DatabasePort from '../../database.port';

export class CommentRepository implements TCommentRepository {
    private model = defineCommentModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TCommentEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toCommentEntity(result) : null;
    }

    async findAll(): Promise<TCommentEntity[]> {
        const results = await this.model.findAll();
        return results.map(toCommentEntity);
    }

    async findByTopicId({
        topicId,
        userId,
    }: {
        topicId: string;
        userId: string;
    }): Promise<TCommentApiResponse[]> {
        const { CommentModel } = DatabasePort.models;

        const items = await CommentModel.findAll({
            where: {
                topicId,
                parentCommentId: { [Op.is]: null },
            },
            attributes: {
                include: [
                    [fn('COUNT', col('likes.id')), 'likesCount'],
                    [
                        fn(
                            'MAX',
                            literal(
                                `CASE WHEN "likes"."userId" = '${userId}' THEN 1 ELSE 0 END`,
                            ),
                        ),
                        'isLiked',
                    ],
                ],
            },
            include: [
                {
                    association: 'author',
                    attributes: ['username', 'imageUrl'],
                },
                {
                    association: 'likes',
                    attributes: [],
                },
            ],
            group: ['CommentModel.id', 'author.id'],
            order: [['createdAt', 'ASC']],
        });

        return items.map((item) => {
            const entity = toCommentEntity(item) as TCommentApiResponse;
            entity.authorNickname = item.author?.username;
            entity.authorImageUrl = item.author?.imageUrl;
            entity.likesCount = parseInt(item.get('likesCount') as string, 10);
            entity.isLiked = Boolean(parseInt(item.get('isLiked') as string, 10));
            return entity;
        });
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);

        return toCommentEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TCommentEntity>,
    ): Promise<TCommentEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toCommentEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }

    async findRepliesByParentCommentId({
        parentCommentId,
        userId,
    }: {
        parentCommentId: string;
        userId: string;
    }): Promise<TCommentApiResponse[]> {
        const { CommentModel } = DatabasePort.models;

        const items = await CommentModel.findAll({
            where: { parentCommentId },
            attributes: {
                include: [
                    [fn('COUNT', col('likes.id')), 'likesCount'],
                    [
                        fn(
                            'MAX',
                            literal(
                                `CASE WHEN "likes"."userId" = '${userId}' THEN 1 ELSE 0 END`,
                            ),
                        ),
                        'isLiked',
                    ],
                ],
            },
            include: [
                {
                    association: 'author',
                    attributes: ['username', 'imageUrl'],
                },
                {
                    association: 'likes',
                    attributes: [],
                },
            ],
            group: ['CommentModel.id', 'author.id'],
            order: [['createdAt', 'ASC']],
        });

        return items.map((item) => {
            const entity = toCommentEntity(item) as TCommentApiResponse;
            entity.authorNickname = item.author?.username;
            entity.authorImageUrl = item.author?.imageUrl;
            entity.likesCount = parseInt(item.get('likesCount') as string, 10);
            entity.isLiked = Boolean(parseInt(item.get('isLiked') as string, 10));
            return entity;
        });
    }
}
