import { Router } from 'express';
import * as estudiantesController from '../controllers/estudiantesController';
//const estudianteRouter = express.Router();
const estudianteRouter = Router();
 
estudianteRouter.post('/', estudiantesController.create);
estudianteRouter.get('/', estudiantesController.getAll);
estudianteRouter.get('/:cod_e', estudiantesController.getOne);
estudianteRouter.put('/:cod_e', estudiantesController.update);
estudianteRouter.delete('/:cod_e', estudiantesController.remove);

export default estudianteRouter;
/* export {estudianteRouter}; */