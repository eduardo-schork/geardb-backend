import { TTopicEntity } from '@/domain/entities/topic.entity';
import { toTopicEntity } from '@/infra/database/sequelize/mappers/topic.mapper';
import defineTopicModel from '@/infra/database/sequelize/models/topic.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class TopicRepository {
    private model = defineTopicModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TTopicEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toTopicEntity(result) : null;
    }

    async findAll(): Promise<TTopicEntity[]> {
        const results = await this.model.findAll();
        return results.map(toTopicEntity);
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
