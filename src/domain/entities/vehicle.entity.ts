export type TVehicleEntity = {
    id: string;
    brand: string;
    model: string;
    version: string;
    year: number;
    label: string;
    imageUrl?: string;
    isUserVehicle?: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
