import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import  estudianteRouter  from './routes/estudiantesRoutes';
import  profesorRouter  from './routes/profesorRoutes';
import  asignaturaRouter  from './routes/asignaturasRoutes';
import  inscribeRouter  from './routes/inscribeRoutes';
import  imparteRouter from './routes/imparteRoutes';
import  {setupSwagger}  from '../utils/swaggerConfig';
import { setupAssociations } from './database/associations';
import  sequelize  from './database/index';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

//rutas
app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);
app.use('/asignaturas', asignaturaRouter);
app.use('/inscribe', inscribeRouter);
app.use('/imparte', imparteRouter);

setupSwagger(app); // justo antes del app.listen

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    setupAssociations(); // <-- AQUI creas las relaciones

    await sequelize.sync({ alter: true });
    
    console.log('Tables synchronized');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

connectDatabase();

  
app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});

app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);

});
