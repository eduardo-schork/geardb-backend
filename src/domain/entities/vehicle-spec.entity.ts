export type TVehicleSpecEntity = {
    id: string;
    vehicleId: string;

    engine?: string | null;
    power?: string | null;
    torque?: string | null;
    weight?: string | null;
    doors?: number | null;
    bodyType?: string | null;
    fuelType?: string | null;
    transmission?: string | null;

    steering?: string | null;
    engineLayout?: string | null;
    valves?: string | null;
    fuelInjection?: string | null;
    enginePosition?: string | null;
    displacement?: string | null;
    drivetrain?: string | null;
    maxSpeedKmH?: string | null;
    acceleration0to100?: string | null;
    consumptionCity?: string | null;
    consumptionHighway?: string | null;
    frontSuspension?: string | null;
    rearSuspension?: string | null;
    frontBrakes?: string | null;
    rearBrakes?: string | null;
    wheels?: string | null;
    tires?: string | null;
    lengthMM?: string | null;
    wheelbaseMM?: string | null;
    heightMM?: string | null;
    widthMM?: string | null;
    curbWeightKg?: string | null;
    trunkCapacityL?: string | null;
    tankCapacityL?: string | null;
    payloadKg?: string | null;
    seats?: number | null;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};
