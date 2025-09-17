export type TUserFollowEntity = {
    id: string;
    followerId: string;
    followingId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
