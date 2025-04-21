import { TCommentEntity } from '@/domain/entities/comment.entity';
import { toCommentEntity } from '@/infra/database/sequelize/mappers/comment.mapper';
import defineCommentModel from '@/infra/database/sequelize/models/comment.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';
import { Op } from 'sequelize';

export class CommentRepository {
    private model = defineCommentModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TCommentEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toCommentEntity(result) : null;
    }

    async findAll(): Promise<TCommentEntity[]> {
        const results = await this.model.findAll();
        return results.map(toCommentEntity);
    }

    async findByTopicId(topicId: string): Promise<TCommentEntity[]> {
        const items = await this.model.findAll({
            where: {
                topicId,
                parentCommentId: { [Op.is]: null },
            },
        });
        return items.map(toCommentEntity);
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

    async findRepliesByParentCommentId(
        parentCommentId: string,
    ): Promise<TCommentEntity[]> {
        const results = await this.model.findAll({
            where: { parentCommentId },
        });
        return results.map(toCommentEntity);
    }
}
