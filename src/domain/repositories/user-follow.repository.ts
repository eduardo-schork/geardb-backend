import { TUserFollowEntity } from '../entities/user-follow.entity';

export type TUserFollowRepository = {
    findById(id: string): Promise<TUserFollowEntity | null>;
    findAll(): Promise<TUserFollowEntity[]>;
    create(data: TUserFollowEntity): Promise<TUserFollowEntity>;
    update(
        id: string,
        updates: Partial<TUserFollowEntity>,
    ): Promise<TUserFollowEntity | null>;
    delete(id: string): Promise<boolean>;
};
