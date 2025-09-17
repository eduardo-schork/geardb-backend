import { TVehicleEntity } from './vehicle.entity';

export type TUserVehicleEntity = {
    id: string;
    userId: string;
    vehicleId: string;
    nickname: string;
    notes: string;
    power: string;
    torque: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    vehicle?: TVehicleEntity;
};
