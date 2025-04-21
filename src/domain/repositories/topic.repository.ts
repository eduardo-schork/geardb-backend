import { TTopicEntity } from '../entities/topic.entity';

export type TTopicRepository = {
    findById(id: string): Promise<TTopicEntity | null>;
    findAll(): Promise<TTopicEntity[]>;
    create(data: TTopicEntity): Promise<TTopicEntity>;
    update(
        id: string,
        updates: Partial<TTopicEntity>,
    ): Promise<TTopicEntity | null>;
    delete(id: string): Promise<boolean>;
};
