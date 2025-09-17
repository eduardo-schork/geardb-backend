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

export type TCommentApiResponse = TCommentEntity & {
    likesCount: number;
    isLiked: boolean;

    authorNickname?: string;
    authorImageUrl?: string;
};
