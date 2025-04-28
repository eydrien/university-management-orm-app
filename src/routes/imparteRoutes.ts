// src/routes/imparteRoutes.ts
import { Router } from 'express';
import * as imparteController from '../controllers/imparteControllers';

const imparteRouter = Router();

imparteRouter.post('/', imparteController.create);
imparteRouter.get('/', imparteController.getAll);
imparteRouter.get('/profesores/:id_p/asignaturas', imparteController.getByIdP);
imparteRouter.get('/asignatura/:cod_a/profesores', imparteController.getByCodA);
imparteRouter.put('/', imparteController.update);  // Parámetros vía query: id_p, cod_a, grupo, semestre
imparteRouter.delete('/', imparteController.remove);

export default imparteRouter;
