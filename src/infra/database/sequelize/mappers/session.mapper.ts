import { TSessionEntity } from '@/domain/entities/session.entity';
import { Model } from 'sequelize';

export function toSessionEntity(model: Model<TSessionEntity>): TSessionEntity {
    const data = model.get() as Required<TSessionEntity>;

    return {
        id: data.id,
        token: data.token,
        userId: data.userId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        createdAt: data.createdAt,
        expiresAt: data.expiresAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
