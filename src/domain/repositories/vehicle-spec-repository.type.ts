import { TVehicleSpecEntity } from '../entities/vehicle-spec.entity';

export type TVehicleSpecRepository = {
    findById(id: string): Promise<TVehicleSpecEntity | null>;
    findAll(): Promise<TVehicleSpecEntity[]>;
    create(data: TVehicleSpecEntity): Promise<TVehicleSpecEntity>;
    update(
        id: string,
        updates: Partial<TVehicleSpecEntity>,
    ): Promise<TVehicleSpecEntity | null>;
    delete(id: string): Promise<boolean>;
    findByVehicleId(vehicleId: string): Promise<TVehicleSpecEntity | null>;
};
