export type TCommentLikeEntity = {
    id: string;
    commentId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
