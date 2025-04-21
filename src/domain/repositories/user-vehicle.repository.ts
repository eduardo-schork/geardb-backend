import { TUserVehicleEntity } from '../entities/user-vehicle.entity';

export type TUserVehicleRepository = {
    findById(id: string): Promise<TUserVehicleEntity | null>;
    findAll(): Promise<TUserVehicleEntity[]>;
    create(data: TUserVehicleEntity): Promise<TUserVehicleEntity>;
    update(
        id: string,
        updates: Partial<TUserVehicleEntity>,
    ): Promise<TUserVehicleEntity | null>;
    delete(id: string): Promise<boolean>;
};
