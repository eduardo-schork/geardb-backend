export type TCommentEntity = {
    id: string;
    topicId: string;
    userId: string;
    parentCommentId: string | null;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
