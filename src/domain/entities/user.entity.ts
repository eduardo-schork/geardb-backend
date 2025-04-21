export type TUserEntity = {
    id: string;
    username: string;
    name: string;
    email: string;
    passwordHash: string;
    profilePicture: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
