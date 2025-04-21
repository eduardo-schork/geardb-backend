export type TUserVehicleEntity = {
    id: string;
    userId: string;
    vehicleId: string;
    nickname: string;
    notes: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
