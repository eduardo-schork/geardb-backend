import { TUserVehicleEntity } from '@/domain/entities/user-vehicle.entity';
import { toUserVehicleEntity } from '@/infra/database/sequelize/mappers/user-vehicle.mapper';
import defineUserVehicleModel from '@/infra/database/sequelize/models/user-vehicle.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';
import DatabasePort from '../../database.port';

export class UserVehicleRepository {
    private model = defineUserVehicleModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TUserVehicleEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toUserVehicleEntity(result) : null;
    }

    async findAll(): Promise<TUserVehicleEntity[]> {
        const results = await this.model.findAll();
        return results.map(toUserVehicleEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toUserVehicleEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TUserVehicleEntity>,
    ): Promise<TUserVehicleEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toUserVehicleEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }

    async findByUserId(userId: string) {
        const items = await DatabasePort.models.UserVehicleModel.findAll({
            where: { userId },
            include: [
                {
                    model: DatabasePort.models.VehicleModel,
                    as: 'vehicle',
                },
            ],
        });

        return items;
    }
}
