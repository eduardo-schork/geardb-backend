export type TVehicleEntity = {
    id: string;
    brand: string;
    model: string;
    version: string;
    year: number;
    label: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
