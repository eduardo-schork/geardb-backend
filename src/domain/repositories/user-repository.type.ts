import { TUserEntity } from '../entities/user.entity';

export type TCreateUserInput = Omit<
    TUserEntity,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type TUserRepository = {
    findByEmail(email: string): Promise<TUserEntity | null>;
    findById(id: string): Promise<TUserEntity | null>;
    findAll(): Promise<TUserEntity[]>;
    create(data: TCreateUserInput): Promise<TUserEntity>;
    update(
        id: string,
        updates: Partial<TUserEntity>,
    ): Promise<TUserEntity | null>;
    delete(id: string): Promise<boolean>;
};
