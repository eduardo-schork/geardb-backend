import { TUserFollowEntity } from '@/domain/entities/user-follow.entity';
import { TUserFollowRepository } from '@/domain/repositories/user-follow.repository';
import { toUserFollowEntity } from '@/infra/database/sequelize/mappers/user-follow.mapper';
import defineUserFollowModel from '@/infra/database/sequelize/models/user-follow.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';
import { v4 as uuidv4 } from 'uuid';

export class UserFollowRepository implements TUserFollowRepository {
    private model = defineUserFollowModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TUserFollowEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toUserFollowEntity(result) : null;
    }

    async findAll(): Promise<TUserFollowEntity[]> {
        const results = await this.model.findAll();
        return results.map(toUserFollowEntity);
    }

    async create(data: {
        userId: string;
        followingId: string;
    }): Promise<TUserFollowEntity> {
        const { userId, followingId } = data;

        const existing = await this.model.findOne({
            where: {
                followerId: userId,
                followingId,
                deletedAt: null,
            },
        });

        if (existing) {
            return toUserFollowEntity(existing);
        }

        const result = await this.model.create({
            followingId,
            followerId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: uuidv4(),
        });

        return toUserFollowEntity(result);
    }

    async findByFollowingId(followingId: string): Promise<TUserFollowEntity[]> {
        const results = await this.model.findAll({
            where: {
                followingId,
                deletedAt: null,
            },
        });

        return results.map(toUserFollowEntity);
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

    async delete(followingId: string, userId: string): Promise<boolean> {
        const record = await this.model.findOne({
            where: { followerId: userId, followingId },
        });

        if (!record) return false;

        await record.update({ deletedAt: new Date() });
        return true;
    }
}
