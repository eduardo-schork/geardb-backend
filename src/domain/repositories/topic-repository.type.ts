import { TTopicApiResponse, TTopicEntity } from '../entities/topic.entity';

export type TTopicRepository = {
    findById(id: string): Promise<TTopicApiResponse | null>;
    findAll: (userId: string) => Promise<TTopicApiResponse[]>;
    create(data: TTopicEntity): Promise<TTopicEntity>;
    update(id: string, updates: Partial<TTopicEntity>): Promise<TTopicEntity | null>;
    delete(id: string): Promise<boolean>;
};
