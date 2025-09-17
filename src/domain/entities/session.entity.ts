export type TSessionEntity = {
    id: string;
    token: string;
    userId: string;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
    expiresAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
