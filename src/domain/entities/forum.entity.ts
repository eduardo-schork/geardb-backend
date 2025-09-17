export type TForumEntity = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
