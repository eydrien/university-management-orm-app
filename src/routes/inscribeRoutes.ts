import { Router } from 'express';
import * as inscribeController from '../controllers/inscribeController';

const inscribeRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Inscribe
 *   description: Gestión de inscripciones de estudiantes
 */

/**
 * @swagger
 * /inscribe:
 *   post:
 *     summary: Crear una inscripción
 *     tags: [Inscribe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inscribe'
 *     responses:
 *       201:
 *         description: Inscripción creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.post('/', inscribeController.create);

/**
 * @swagger
 * /inscribe:
 *   get:
 *     summary: Obtener todas las inscripciones
 *     tags: [Inscribe]
 *     responses:
 *       200:
 *         description: Lista de inscripciones
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.get('/', inscribeController.getAll);

/**
 * @swagger
 * /inscribe/estudiante/{cod_e}:
 *   get:
 *     summary: Obtener inscripciones por código de estudiante
 *     tags: [Inscribe]
 *     parameters:
 *       - in: path
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código del estudiante
 *     responses:
 *       200:
 *         description: Inscripciones encontradas
 *       404:
 *         description: No se encontraron inscripciones
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.get('/estudiante/:cod_e', inscribeController.getById);

/**
 * @swagger
 * /inscribe/estudiante:
 *   get:
 *     summary: Obtener una inscripción específica
 *     tags: [Inscribe]
 *     parameters:
 *       - in: query
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: cod_a
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: grupo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscripción encontrada
 *       404:
 *         description: No se encontró inscripción
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.get('/estudiante', inscribeController.getOneAsignatura);

/**
 * @swagger
 * /inscribe/asignaturas:
 *   get:
 *     summary: Obtener asignaturas inscritas por estudiante y semestre
 *     tags: [Inscribe]
 *     parameters:
 *       - in: query
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: semestre
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignaturas encontradas
 *       404:
 *         description: No se encontraron asignaturas
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.get('/asignaturas', inscribeController.getAsignaturasByEstudiante);

/**
 * @swagger
 * /inscribe/estudiantes:
 *   get:
 *     summary: Obtener estudiantes inscritos en una asignatura y grupo
 *     tags: [Inscribe]
 *     parameters:
 *       - in: query
 *         name: cod_a
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: grupo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiantes encontrados
 *       404:
 *         description: No se encontraron estudiantes
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.get('/estudiantes', inscribeController.getEstudiantesByAsignaturaGrupo);

/**
 * @swagger
 * /inscribe/estudiantes-semestre:
 *   get:
 *     summary: Obtener estudiantes por asignatura, grupo y semestre
 *     tags: [Inscribe]
 *     parameters:
 *       - in: query
 *         name: cod_a
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: grupo
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: semestre
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiantes encontrados
 *       404:
 *         description: No se encontraron estudiantes
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.get('/estudiantes-semestre', inscribeController.getEstudiantesByAsignaturaGrupoSemestre);

/**
 * @swagger
 * /inscribe:
 *   put:
 *     summary: Actualizar notas de una inscripción
 *     tags: [Inscribe]
 *     parameters:
 *       - in: query
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: cod_a
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: id_p
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: grupo
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: semestre
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InscribeNotas'
 *     responses:
 *       200:
 *         description: Inscripción actualizada
 *       404:
 *         description: Inscripción no encontrada
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.put('/', inscribeController.update);

/**
 * @swagger
 * /inscribe:
 *   delete:
 *     summary: Eliminar una inscripción
 *     tags: [Inscribe]
 *     parameters:
 *       - in: query
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: cod_a
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: id_p
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: grupo
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: semestre
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscripción eliminada
 *       404:
 *         description: Inscripción no encontrada
 *       500:
 *         description: Error del servidor
 */
inscribeRouter.delete('/', inscribeController.remove);

export default inscribeRouter;
