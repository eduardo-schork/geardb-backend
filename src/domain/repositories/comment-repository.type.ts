import { TCommentEntity } from '../entities/comment.entity';

export type TCommentRepository = {
    findById(id: string): Promise<TCommentEntity | null>;
    findAll(): Promise<TCommentEntity[]>;
    create(data: TCommentEntity): Promise<TCommentEntity>;
    update(
        id: string,
        updates: Partial<TCommentEntity>,
    ): Promise<TCommentEntity | null>;
    findByTopicId(topicId: string): Promise<TCommentEntity[]>;
    delete(id: string): Promise<boolean>;
    findRepliesByParentCommentId(
        parentCommentId: string,
    ): Promise<TCommentEntity[]>;
};
