import { TMediaEntity } from '@/domain/entities/media.entity';
import { toMediaEntity } from '@/infra/database/sequelize/mappers/media.mapper';
import defineMediaModel from '@/infra/database/sequelize/models/media.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class MediaRepository {
    private model = defineMediaModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TMediaEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toMediaEntity(result) : null;
    }

    async findAll(): Promise<TMediaEntity[]> {
        const results = await this.model.findAll();
        return results.map(toMediaEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toMediaEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TMediaEntity>,
    ): Promise<TMediaEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toMediaEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
