import { FipePriceServicePort, TFipeVehicleData } from './fipe-price-service.port';

export class MockFipePrice implements FipePriceServicePort {
    async getPriceByFipeCodeAndYear(
        fipeCode: string,
        year: string,
    ): Promise<TFipeVehicleData> {
        return {
            id: '45276',
            tipo: '1',
            id_modelo_ano: '1986-1',
            fipe_codigo: fipeCode,
            id_marca: '22',
            marca: 'Ford',
            id_modelo: '664',
            modelo: 'Corcel II L',
            ano: year,
            name: 'Corcel II L',
            combustivel: 'Gasolina',
            preco: 'R$ 99.999,99',
        };
    }
}

const MockFipePriceAdapter = new MockFipePrice();

export default MockFipePriceAdapter;
