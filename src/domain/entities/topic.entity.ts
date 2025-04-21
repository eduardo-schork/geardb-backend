export type TTopicEntity = {
    id: string;
    forumId: string;
    userId: string;
    title: string;
    content: string;
    imageUrl: string;
    isPinned: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
