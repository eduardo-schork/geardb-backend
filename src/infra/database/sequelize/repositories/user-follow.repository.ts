import { TUserFollowEntity } from '@/domain/entities/user-follow.entity';
import { toUserFollowEntity } from '@/infra/database/sequelize/mappers/user-follow.mapper';
import defineUserFollowModel from '@/infra/database/sequelize/models/user-follow.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class UserFollowRepository {
    private model = defineUserFollowModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TUserFollowEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toUserFollowEntity(result) : null;
    }

    async findAll(): Promise<TUserFollowEntity[]> {
        const results = await this.model.findAll();
        return results.map(toUserFollowEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toUserFollowEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TUserFollowEntity>,
    ): Promise<TUserFollowEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toUserFollowEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
