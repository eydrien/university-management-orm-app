// src/routes/inscribeRoutes.ts
import { Router } from 'express';
import * as inscribeController from '../controllers/inscribeController';

const inscribeRouter = Router();

inscribeRouter.post('/', inscribeController.create);
inscribeRouter.get('/', inscribeController.getAll);
inscribeRouter.get('/estudiante/:cod_e', inscribeController.getById);
inscribeRouter.get('/estudiante', inscribeController.getOneAsignatura);// Parámetros query: cod_e, cod_a, grupo
inscribeRouter.get('/asignaturas', inscribeController.getAsignaturasByEstudiante); //parametros query: cod_e, semestre
inscribeRouter.get('/estudiantes', inscribeController.getEstudiantesByAsignaturaGrupo)//parametros query: cod_a, grupo
inscribeRouter.get('/estudiantes-semestre', inscribeController.getEstudiantesByAsignaturaGrupoSemestre)//parametros query: cod_a, grupo,semestre
inscribeRouter.put('/', inscribeController.update);  // Parámetros query: cod_e, cod_a, id_p, grupo, semestre
inscribeRouter.delete('/', inscribeController.remove);

export default inscribeRouter;
