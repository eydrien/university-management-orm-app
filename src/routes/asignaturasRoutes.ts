// src/routes/asignaturaRoutes.ts
import { Router } from 'express';
import * as asignaturasController from '../controllers/asignaturasController';

const asignaturaRouter = Router();

asignaturaRouter.post('/', asignaturasController.create);
asignaturaRouter.get('/', asignaturasController.getAll);
asignaturaRouter.get('/:cod_a', asignaturasController.getOne);
asignaturaRouter.put('/:cod_a', asignaturasController.update);
asignaturaRouter.delete('/:cod_a', asignaturasController.remove);

export default asignaturaRouter;
