import { v4 as uuidv4 } from 'uuid';

import { TSessionEntity } from '@/domain/entities/session.entity';
import { TCreateSessionInput } from '@/domain/repositories/session-repository.type';
import { toSessionEntity } from '@/infra/database/sequelize/mappers/session.mapper';
import defineSessionModel from '@/infra/database/sequelize/models/session.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class SessionRepository {
    private model = defineSessionModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TSessionEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toSessionEntity(result) : null;
    }

    async findByToken(token: string): Promise<TSessionEntity | null> {
        const result = await this.model.findOne({ where: { token } });
        return result ? toSessionEntity(result) : null;
    }

    async deleteByToken(token: string): Promise<boolean> {
        const record = await this.model.findOne({ where: { token } });
        if (!record) return false;
        await record.destroy();
        return true;
    }

    async findAll(): Promise<TSessionEntity[]> {
        const results = await this.model.findAll();
        return results.map(toSessionEntity);
    }

    async create(data: TCreateSessionInput): Promise<TSessionEntity> {
        const { createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: uuidv4(),
        } as any);
        return toSessionEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TSessionEntity>,
    ): Promise<TSessionEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toSessionEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
