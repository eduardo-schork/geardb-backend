export type TTopicLikeEntity = {
    id: string;
    topicId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
