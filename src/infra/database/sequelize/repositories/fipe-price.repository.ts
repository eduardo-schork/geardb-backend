import { TFipePriceEntity } from '@/domain/entities/fipe-price.entity';
import { toFipePriceEntity } from '@/infra/database/sequelize/mappers/fipe-price.mapper';
import defineFipePriceModel from '@/infra/database/sequelize/models/fipe-price.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class FipePriceRepository {
    private model = defineFipePriceModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TFipePriceEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toFipePriceEntity(result) : null;
    }

    async findAll(): Promise<TFipePriceEntity[]> {
        const results = await this.model.findAll();
        return results.map(toFipePriceEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toFipePriceEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TFipePriceEntity>,
    ): Promise<TFipePriceEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toFipePriceEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
