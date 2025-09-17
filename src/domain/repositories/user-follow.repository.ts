import { TUserFollowEntity } from '../entities/user-follow.entity';

export type TUserFollowRepository = {
    findById(id: string): Promise<TUserFollowEntity | null>;
    findAll(): Promise<TUserFollowEntity[]>;
    create(data: { userId: string; followingId: string }): Promise<TUserFollowEntity>;
    update(
        id: string,
        updates: Partial<TUserFollowEntity>,
    ): Promise<TUserFollowEntity | null>;
    delete(followingId: string, userId: string): Promise<boolean>;
    findByFollowingId(followingId: string): Promise<TUserFollowEntity[]>;
};
