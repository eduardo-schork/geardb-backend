import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import router from './routes/routes';

dotenv.config();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

class ExpressServerAdapter {
    public expressServer: Express;

    constructor() {
        this.expressServer = express();
    }

    registerMiddlewares() {
        this.expressServer.use(
            (req: Request, _res: Response, next: NextFunction) => {
                console.log(
                    `📩 Incoming Request: ${req.method} ${req.originalUrl}`,
                );
                next();
            },
        );

        this.expressServer.use(
            (req: Request, res: Response, next: NextFunction) => {
                const start = Date.now();

                res.on('finish', () => {
                    const duration = Date.now() - start;
                    console.log(
                        `📤 Response Sent: ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`,
                    );
                });

                next();
            },
        );

        this.expressServer.use(cors(corsOptions));
        this.expressServer.use(express.json());
        this.expressServer.use(router);

        this.expressServer.use(
            (err: any, _req: Request, res: Response, _next: NextFunction) => {
                console.error('💥 Internal error:', err);

                const statusCode = err.statusCode || 500;
                const message = err.message || 'Internal server error';

                res.status(statusCode).json({
                    status: 'error',
                    message,
                    stack:
                        process.env.NODE_ENV === 'development'
                            ? err.stack
                            : undefined,
                });
            },
        );
    }

    async start() {
        const HTTP_PORT = process.env.APP_PORT
            ? parseInt(process.env.APP_PORT)
            : 3000;

        this.registerMiddlewares();

        this.expressServer.listen(HTTP_PORT, '0.0.0.0', () => {
            console.log(
                `🚀 HTTP Server running at http://localhost:${HTTP_PORT}`,
            );
        });
    }
}

export const app = new ExpressServerAdapter().expressServer;
export default new ExpressServerAdapter();
