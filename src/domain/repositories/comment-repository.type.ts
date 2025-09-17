import { TCommentApiResponse, TCommentEntity } from '../entities/comment.entity';

export type TCommentRepository = {
    findById(id: string): Promise<TCommentEntity | null>;
    findAll(): Promise<TCommentEntity[]>;
    create(data: TCommentEntity): Promise<TCommentEntity>;
    update(id: string, updates: Partial<TCommentEntity>): Promise<TCommentEntity | null>;
    findByTopicId({
        userId,
        topicId,
    }: {
        userId: string;
        topicId: string;
    }): Promise<TCommentApiResponse[]>;
    delete(id: string): Promise<boolean>;
    findRepliesByParentCommentId({
        parentCommentId,
        userId,
    }: {
        parentCommentId: string;
        userId: string;
    }): Promise<TCommentApiResponse[]>;
};
