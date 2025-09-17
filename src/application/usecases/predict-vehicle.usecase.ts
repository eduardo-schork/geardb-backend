import { VehicleRepository } from '@/infra/database/sequelize/repositories/vehicle.repository';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import FormData from 'form-data';

type PredictVehicleUseCaseInput = {
    buffer: Buffer;
    originalName: string;
};

type TPredictedVehicle = {
    label: string;
    confidence?: Number;
    vehicle?: any | null;
};

export class PredictVehicleUseCase {
    constructor(private vehicleRepo: VehicleRepository) {}

    async execute(input: PredictVehicleUseCaseInput): Promise<TPredictedVehicle[]> {
        try {
            const formData = new FormData();
            formData.append('file', input.buffer, {
                filename: input.originalName || 'photo.jpg',
                contentType: 'image/jpeg',
            });

            const response: any = await HttpRequestPort.post({
                path: '/predict',
                body: formData,
            });

            const predictions = response?.all_predictions || [];

            const topPredictions = predictions
                .sort((a: any, b: any) => b.confidence - a.confidence)
                .slice(0, 5);

            const results: TPredictedVehicle[] = [];

            for (const prediction of topPredictions) {
                const label = prediction.label;
                const confidence = prediction.confidence;
                const vehicle = await this.vehicleRepo.findByLabel(label);

                if (vehicle) {
                    results.push({ label, vehicle, confidence });
                } else {
                    results.push({ label: 'Veículo não cadastrado' });
                }
            }

            return results;
        } catch (error) {
            console.error('Erro ao executar predição:', error);
            return [];
        }
    }
}
