import { TFipePriceEntity } from '../entities/fipe-price.entity';

export type TFipePriceRepository = {
    findById(id: string): Promise<TFipePriceEntity | null>;
    findAll(): Promise<TFipePriceEntity[]>;
    create(data: TFipePriceEntity): Promise<TFipePriceEntity>;
    update(
        id: string,
        updates: Partial<TFipePriceEntity>,
    ): Promise<TFipePriceEntity | null>;
    delete(id: string): Promise<boolean>;
};
