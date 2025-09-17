import MockFipePriceAdapter from './mock-fipe-price.adapter';

export type TFipeVehicleData = {
    id: string;
    tipo: string;
    id_modelo_ano: string;
    fipe_codigo: string;
    id_marca: string;
    marca: string;
    id_modelo: string;
    modelo: string;
    ano: string;
    name: string;
    combustivel: string;
    preco: string;
};

export interface FipePriceServicePort {
    getPriceByFipeCodeAndYear(fipeCode: string, year: string): Promise<TFipeVehicleData>;
}

const FipePriceServicePort = MockFipePriceAdapter;

export default FipePriceServicePort;
