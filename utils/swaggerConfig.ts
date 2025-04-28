import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import { Express } from 'express';

// Cargar el archivo swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
