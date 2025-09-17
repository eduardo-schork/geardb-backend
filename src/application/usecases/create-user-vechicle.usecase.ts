import { TUserVehicleEntity } from '@/domain/entities/user-vehicle.entity';
import { TVehicleEntity } from '@/domain/entities/vehicle.entity';
import { TUserVehicleRepository } from '@/domain/repositories/user-vehicle-repository.type';
import { TVehicleRepository } from '@/domain/repositories/vehicle-repository.type';
import { IFileStoragePort } from '@/infra/file-storage/file-storage.port';
import { v4 as uuidv4 } from 'uuid';

type CreateUserVehicleInput = {
    userId: string;
    brand: string;
    model: string;
    version: string;
    year: number;
    nickname: string;
    notes: string;
    power: string;
    torque: string;
    image: {
        filename: string;
        buffer: Buffer;
        mimetype: string;
    };
};

export class CreateUserVehicleUseCase {
    constructor(
        private readonly vehicleRepo: TVehicleRepository,
        private readonly userVehicleRepo: TUserVehicleRepository,
        private readonly fileStorageService: IFileStoragePort,
    ) {}

    async execute(input: CreateUserVehicleInput): Promise<{
        vehicle: TVehicleEntity;
        userVehicle: TUserVehicleEntity;
    }> {
        console.log({ input });

        const now = new Date();

        const filePath = `user-vehicles/${uuidv4()}-${input.image.filename}`;
        const imageUrl = await this.fileStorageService.upload(
            filePath,
            input.image.buffer,
            input.image.mimetype,
        );

        const vehicle: TVehicleEntity = {
            id: uuidv4(),
            brand: input.brand,
            model: input.model,
            version: input.version,
            isUserVehicle: true,
            year: input.year,
            label: `${input.brand}_${input.model}_${input.version}_${input.year}`,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };

        const createdVehicle = await this.vehicleRepo.create(vehicle);

        const userVehicle: TUserVehicleEntity = {
            id: uuidv4(),
            userId: input.userId,
            vehicleId: createdVehicle.id,
            nickname: input.nickname,
            notes: input.notes,
            power: input.power,
            torque: input.torque,
            imageUrl: imageUrl,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };

        const createdUserVehicle = await this.userVehicleRepo.create(userVehicle);

        return {
            vehicle: createdVehicle,
            userVehicle: createdUserVehicle,
        };
    }
}
