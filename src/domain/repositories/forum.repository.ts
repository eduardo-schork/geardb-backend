import { TForumEntity } from '../entities/forum.entity';

export type TForumRepository = {
    findById(id: string): Promise<TForumEntity | null>;
    findAll(): Promise<TForumEntity[]>;
    create(data: TForumEntity): Promise<TForumEntity>;
    update(
        id: string,
        updates: Partial<TForumEntity>,
    ): Promise<TForumEntity | null>;
    delete(id: string): Promise<boolean>;
};
