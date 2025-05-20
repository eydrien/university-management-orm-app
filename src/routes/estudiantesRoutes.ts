import { Router } from 'express';
import * as estudiantesController from '../controllers/estudiantesController';

const estudianteRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Operaciones CRUD para estudiantes
 */

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crea un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
 */
estudianteRouter.post('/', estudiantesController.create);

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Obtiene todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudiante'
 *       500:
 *         description: Error en el servidor
 */
estudianteRouter.get('/', estudiantesController.getAll);

/**
 * @swagger
 * /estudiantes/{cod_e}:
 *   get:
 *     summary: Obtiene un estudiante por su código
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código del estudiante
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error en el servidor
 */
estudianteRouter.get('/:cod_e', estudiantesController.getOne);

/**
 * @swagger
 * /estudiantes/{cod_e}:
 *   put:
 *     summary: Actualiza un estudiante existente
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código del estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom_e
 *               - dir_e
 *               - tel_e
 *               - fech_nac
 *             properties:
 *               nom_e:
 *                 type: string
 *                 example: Rodolfa Rodriguez
 *               dir_e:
 *                 type: string
 *                 example: Calle falsa 000
 *               tel_e:
 *                 type: integer
 *                 example: 45678912
 *               fech_nac:
 *                 type: string
 *                 format: date
 *                 example: 2002-08-01
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error en el servidor
 */

estudianteRouter.put('/:cod_e', estudiantesController.update);

/**
 * @swagger
 * /estudiantes/{cod_e}:
 *   delete:
 *     summary: Elimina un estudiante
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: cod_e
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código del estudiante
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error en el servidor
 */
estudianteRouter.delete('/:cod_e', estudiantesController.remove);

export default estudianteRouter;
