export type TTopicEntity = {
    id: string;
    forumId: string;
    userId: string;
    title: string;
    content: string;
    imageUrl: string;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};

export type TTopicApiResponse = TTopicEntity & {
    isLiked?: boolean;
    likesCount?: number;
    authorNickname?: string;
    authorImageUrl?: string;
};
