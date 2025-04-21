import { TMediaEntity } from '../entities/media.entity';

export type TMediaRepository = {
    findById(id: string): Promise<TMediaEntity | null>;
    findAll(): Promise<TMediaEntity[]>;
    create(data: TMediaEntity): Promise<TMediaEntity>;
    update(
        id: string,
        updates: Partial<TMediaEntity>,
    ): Promise<TMediaEntity | null>;
    delete(id: string): Promise<boolean>;
};
