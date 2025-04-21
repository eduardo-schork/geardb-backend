import { TTopicLikeEntity } from '@/domain/entities/topic-like.entity';
import { toTopicLikeEntity } from '@/infra/database/sequelize/mappers/topic-like.mapper';
import defineTopicLikeModel from '@/infra/database/sequelize/models/topic-like.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class TopicLikeRepository {
    private model = defineTopicLikeModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TTopicLikeEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toTopicLikeEntity(result) : null;
    }

    async findAll(): Promise<TTopicLikeEntity[]> {
        const results = await this.model.findAll();
        return results.map(toTopicLikeEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toTopicLikeEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TTopicLikeEntity>,
    ): Promise<TTopicLikeEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toTopicLikeEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
