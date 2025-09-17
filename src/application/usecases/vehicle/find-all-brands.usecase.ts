import { TVehicleRepository } from '@/domain/repositories/vehicle-repository.type';

export class FindAllBrandsUseCase {
    constructor(private readonly vehicleRepo: TVehicleRepository) {}

    async execute(): Promise<string[]> {
        return this.vehicleRepo.findAllBrands();
    }
}
