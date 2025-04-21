import * as dotenv from 'dotenv';
import DatabasePort from './infra/database/database.port';
import HttpServerPort from './infra/http-server/http-server.port';

dotenv.config();

async function start() {
    await DatabasePort.connect(false);
    await HttpServerPort.start();
}

start();
