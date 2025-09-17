import { TVehicleSpecEntity } from '@/domain/entities/vehicle-spec.entity';
import { toVehicleSpecEntity } from '@/infra/database/sequelize/mappers/vehicle-spec.mapper';
import defineVehicleSpecModel from '@/infra/database/sequelize/models/vehicle-spec.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class VehicleSpecRepository {
    private model = defineVehicleSpecModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TVehicleSpecEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toVehicleSpecEntity(result) : null;
    }

    async findAll(): Promise<TVehicleSpecEntity[]> {
        const results = await this.model.findAll();
        return results.map(toVehicleSpecEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toVehicleSpecEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TVehicleSpecEntity>,
    ): Promise<TVehicleSpecEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toVehicleSpecEntity(record);
    }

    async findByVehicleId(
        vehicleId: string,
    ): Promise<TVehicleSpecEntity | null> {
        const spec = await this.model.findOne({ where: { vehicleId } });
        return spec ? toVehicleSpecEntity(spec) : null;
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
