import { TVehicleRepository } from '@/domain/repositories/vehicle-repository.type';

export class FindVersionsByBrandAndModelUseCase {
    constructor(private readonly vehicleRepo: TVehicleRepository) {}

    async execute(brand: string, model: string): Promise<string[]> {
        return this.vehicleRepo.findVersionsByBrandAndModel(brand, model);
    }
}
