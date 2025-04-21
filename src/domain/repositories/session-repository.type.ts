import { TSessionEntity } from '../entities/session.entity';

export type TCreateSessionInput = Omit<Partial<TSessionEntity>, 'id'>;

export type TSessionRepository = {
    findById(id: string): Promise<TSessionEntity | null>;
    findAll(): Promise<TSessionEntity[]>;
    create(data: TCreateSessionInput): Promise<TSessionEntity>;
    update(
        id: string,
        updates: Partial<TSessionEntity>,
    ): Promise<TSessionEntity | null>;
    delete(id: string): Promise<boolean>;
    findByToken(token: string): Promise<TSessionEntity | null>;
    deleteByToken(token: string): Promise<boolean>;
};
