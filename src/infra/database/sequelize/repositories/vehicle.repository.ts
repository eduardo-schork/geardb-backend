import { TVehicleEntity } from '@/domain/entities/vehicle.entity';
import { toVehicleEntity } from '@/infra/database/sequelize/mappers/vehicle.mapper';
import defineVehicleModel from '@/infra/database/sequelize/models/vehicle.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';
import { Op } from 'sequelize';

export class VehicleRepository {
    private model = defineVehicleModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TVehicleEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toVehicleEntity(result) : null;
    }

    async findAll(): Promise<TVehicleEntity[]> {
        const results = await this.model.findAll();
        return results.map(toVehicleEntity);
    }

    async findMany(filters: {
        brand?: string;
        model?: string;
        version?: string;
        year?: number;
    }): Promise<TVehicleEntity[]> {
        const where: any = {};

        if (filters.brand) where.brand = { [Op.iLike]: `%${filters.brand}%` };
        if (filters.model) where.model = { [Op.iLike]: `%${filters.model}%` };
        if (filters.version)
            where.version = { [Op.iLike]: `%${filters.version}%` };
        if (filters.year) where.year = filters.year;

        const results = await this.model.findAll({ where });
        return results.map(toVehicleEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toVehicleEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TVehicleEntity>,
    ): Promise<TVehicleEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toVehicleEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
