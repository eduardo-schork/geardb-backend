import { TVehicleEntity } from '../entities/vehicle.entity';

export type TVehicleRepository = {
    findById(id: string): Promise<TVehicleEntity | null>;
    findAll(): Promise<TVehicleEntity[]>;
    create(data: TVehicleEntity): Promise<TVehicleEntity>;
    update(id: string, updates: Partial<TVehicleEntity>): Promise<TVehicleEntity | null>;
    delete(id: string): Promise<boolean>;
    findAllBrands(): Promise<string[]>;
    findModelsByBrand(brand: string): Promise<string[]>;
    findVersionsByBrandAndModel(brand: string, model: string): Promise<string[]>;
    findByLabel(label: string): Promise<TVehicleEntity | null>;
    findMany(filters: {
        brand?: string;
        model?: string;
        version?: string;
        year?: number;
    }): Promise<TVehicleEntity[]>;
};
