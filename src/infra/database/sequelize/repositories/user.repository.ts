import { TUserEntity } from '@/domain/entities/user.entity';
import { toUserEntity } from '@/infra/database/sequelize/mappers/user.mapper';
import defineUserModel from '@/infra/database/sequelize/models/user.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
    private model = defineUserModel(sequelizeAdapter.instance);

    async findByEmail(email: string): Promise<TUserEntity | null> {
        const result = await this.model.findOne({ where: { email } });
        return result ? toUserEntity(result) : null;
    }

    async findById(id: string): Promise<TUserEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toUserEntity(result) : null;
    }

    async findAll(): Promise<TUserEntity[]> {
        const results = await this.model.findAll();
        return results.map(toUserEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: uuidv4(),
        } as any);
        return toUserEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TUserEntity>,
    ): Promise<TUserEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toUserEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
