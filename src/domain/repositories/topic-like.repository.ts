import { TTopicLikeEntity } from '../entities/topic-like.entity';

export type TTopicLikeRepository = {
    findById(id: string): Promise<TTopicLikeEntity | null>;
    findAll(): Promise<TTopicLikeEntity[]>;
    create(data: TTopicLikeEntity): Promise<TTopicLikeEntity>;
    update(
        id: string,
        updates: Partial<TTopicLikeEntity>,
    ): Promise<TTopicLikeEntity | null>;
    delete(id: string): Promise<boolean>;
};
