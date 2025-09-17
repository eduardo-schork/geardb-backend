import { col, fn, literal } from 'sequelize';

import { TTopicApiResponse, TTopicEntity } from '@/domain/entities/topic.entity';
import { TTopicRepository } from '@/domain/repositories/topic-repository.type';
import { toTopicEntity } from '@/infra/database/sequelize/mappers/topic.mapper';
import defineTopicModel from '@/infra/database/sequelize/models/topic.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';
import DatabasePort from '../../database.port';

export class TopicRepository implements TTopicRepository {
    private model = defineTopicModel(sequelizeAdapter.instance);

    async findById({
        userId,
        id,
    }: {
        userId: string;
        id: string;
    }): Promise<TTopicApiResponse | null> {
        const { TopicModel } = DatabasePort.models;

        const result = await TopicModel.findOne({
            where: { id },
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
            group: ['TopicModel.id', 'author.id'],
        });

        if (!result) return null;

        const entity = toTopicEntity(result) as TTopicApiResponse;
        // @ts-ignore
        entity.authorNickname = result.author?.username;
        // @ts-ignore
        entity.authorImageUrl = result.author?.imageUrl;
        entity.likesCount = parseInt(result.get('likesCount') as string, 10);

        entity.isLiked = Boolean(parseInt(result.get('isLiked') as string, 10));

        return entity;
    }

    async findAll({ userId }: { userId: string }): Promise<TTopicApiResponse[]> {
        const { TopicModel } = DatabasePort.models;

        const results = await TopicModel.findAll({
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
            group: ['TopicModel.id', 'author.id'],
            order: [['createdAt', 'DESC']],
        });

        return results.map((topic) => {
            const entity = toTopicEntity(topic) as TTopicApiResponse;
            entity.authorNickname = topic.author?.username;
            entity.authorImageUrl = topic.author?.imageUrl;
            entity.likesCount = parseInt((topic as any).get('likesCount') as string, 10);
            entity.isLiked = Boolean(
                parseInt((topic as any).get('isLiked') as string, 10),
            );
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
        return toTopicEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TTopicEntity>,
    ): Promise<TTopicEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toTopicEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
