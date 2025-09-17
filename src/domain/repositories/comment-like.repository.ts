import { TCommentLikeEntity } from '../entities/comment-like.entity';

export type TCommentLikeRepository = {
    findById(id: string): Promise<TCommentLikeEntity | null>;
    findAll(): Promise<TCommentLikeEntity[]>;
    create(data: TCommentLikeEntity): Promise<TCommentLikeEntity>;
    update(
        id: string,
        updates: Partial<TCommentLikeEntity>,
    ): Promise<TCommentLikeEntity | null>;
    delete(id: string): Promise<boolean>;
};
