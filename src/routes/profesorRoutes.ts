// src/routes/profesorRoutes.ts
import { Router } from 'express';
import * as profesorController from '../controllers/profesoresController';

const profesorRouter = Router();

profesorRouter.post('/', profesorController.create);
profesorRouter.get('/', profesorController.getAll);
profesorRouter.get('/:id_p', profesorController.getOne);
profesorRouter.put('/:id_p', profesorController.update);
profesorRouter.delete('/:id_p', profesorController.remove);

export default profesorRouter;
