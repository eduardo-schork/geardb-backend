export type TFipePriceEntity = {
    id: string;
    vehicleId: string;
    price: number;
    referenceMonth: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
