import { TCommentLikeEntity } from '@/domain/entities/comment-like.entity';
import { toCommentLikeEntity } from '@/infra/database/sequelize/mappers/comment-like.mapper';
import defineCommentLikeModel from '@/infra/database/sequelize/models/comment-like.model';
import sequelizeAdapter from '@/infra/database/sequelize/sequelize.adapter';

export class CommentLikeRepository {
    private model = defineCommentLikeModel(sequelizeAdapter.instance);

    async findById(id: string): Promise<TCommentLikeEntity | null> {
        const result = await this.model.findByPk(id);
        return result ? toCommentLikeEntity(result) : null;
    }

    async findAll(): Promise<TCommentLikeEntity[]> {
        const results = await this.model.findAll();
        return results.map(toCommentLikeEntity);
    }

    async create(data: any): Promise<any> {
        const { id, createdAt, updatedAt, deletedAt, ...clean } = data;
        const result = await this.model.create({
            ...clean,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        return toCommentLikeEntity(result);
    }

    async update(
        id: string,
        updates: Partial<TCommentLikeEntity>,
    ): Promise<TCommentLikeEntity | null> {
        const record = await this.model.findByPk(id);
        if (!record) return null;
        await record.update({ ...updates, updatedAt: new Date() } as any);
        return toCommentLikeEntity(record);
    }

    async delete(id: string): Promise<boolean> {
        const record = await this.model.findByPk(id);
        if (!record) return false;
        await record.destroy();
        return true;
    }
}
