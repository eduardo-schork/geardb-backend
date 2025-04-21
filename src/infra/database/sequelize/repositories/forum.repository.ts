import { TForumEntity } from '@/domain/entities/forum.entity';
import { toForumEntity } from '@/infra/database/sequelize/mappers/forum.mapper';
import defineForumModel from '@/infra/database/sequelize/models/forum.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class ForumRepository {
    private model = defineForumModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TForumEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toForumEntity(result) : null;
    }

    async findAll(): Promise<TForumEntity[]> {
        const results = await this.model.findAll();
        return results.map(toForumEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toForumEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TForumEntity>,
    ): Promise<TForumEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toForumEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
