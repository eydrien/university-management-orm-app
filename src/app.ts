import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import estudianteRouter from './routes/estudiantesRoutes';
import profesorRouter from './routes/profesorRoutes';
import asignaturaRouter from './routes/asignaturasRoutes';
import inscribeRouter from './routes/inscribeRoutes';
import imparteRouter from './routes/imparteRoutes';

import { setupAssociations } from './database/associations';
import sequelize from './database/index';

// Swagger
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../src/swagger';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta básica
app.get('/', (req, res) => {
  res.type('text/plain');
  res.status(200).send('Welcome!');
});

// Rutas de la API
app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);
app.use('/asignaturas', asignaturaRouter);
app.use('/inscribe', inscribeRouter);
app.use('/imparte', imparteRouter);

// Conexión y sincronización de DB
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    setupAssociations();

    await sequelize.sync({ alter: true });

    console.log('Tables synchronized');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

connectDatabase();

// Middleware 404
app.use((req: Request, res: Response) => {
  res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log('Node server started running');
  console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
  console.log(`Swagger docs: http://${process.env.HOST}:${process.env.PORT}/api-docs`);
});
