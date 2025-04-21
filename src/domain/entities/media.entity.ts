export type TMediaEntity = {
    id: string;
    url: string;
    type: string;
    entityType: string;
    entityId: string;
    userId: string;
    isPrimary: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
