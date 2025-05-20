import { Router } from 'express';
import * as asignaturasController from '../controllers/asignaturasController';

const asignaturaRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Asignaturas
 *   description: Operaciones CRUD para asignaturas
 */
/**
 * @swagger
 * /asignaturas:
 *   post:
 *     summary: Crea una nueva asignatura
 *     tags: [Asignaturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asignatura'
 *     responses:
 *       201:
 *         description: Asignatura creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asignatura'
 *       400:
 *         description: Error en la solicitud
 */
asignaturaRouter.post('/', asignaturasController.create);

/**
 * @swagger
 * /asignaturas:
 *   get:
 *     summary: Obtener todas las asignaturas
 *     tags: [Asignaturas]
 *     responses:
 *       200:
 *         description: Lista de asignaturas
 */
asignaturaRouter.get('/', asignaturasController.getAll);

/**
 * @swagger
 * /asignaturas/{cod_a}:
 *   get:
 *     summary: Obtener una asignatura por código
 *     tags: [Asignaturas]
 *     parameters:
 *       - in: path
 *         name: cod_a
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la asignatura
 *     responses:
 *       200:
 *         description: Asignatura encontrada
 *       404:
 *         description: Asignatura no encontrada
 */
asignaturaRouter.get('/:cod_a', asignaturasController.getOne);

/**
 * @swagger
 * /asignaturas/{cod_a}:
 *   put:
 *     summary: Actualizar una asignatura existente
 *     tags: [Asignaturas]
 *     parameters:
 *       - in: path
 *         name: cod_a
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la asignatura a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom_a
 *               - int_h
 *               - creditos
 *             properties:
 *               nom_a:
 *                 type: string
 *                 example: Calculo II
 *               int_h:
 *                 type: integer
 *                 example: 2
 *               creditos:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       200:
 *         description: Asignatura actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asignatura'
 *       404:
 *         description: Asignatura no encontrada
 */


asignaturaRouter.put('/:cod_a', asignaturasController.update);

/**
 * @swagger
 * /asignaturas/{cod_a}:
 *   delete:
 *     summary: Eliminar una asignatura
 *     tags: [Asignaturas]
 *     parameters:
 *       - in: path
 *         name: cod_a
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la asignatura a eliminar
 *     responses:
 *       200:
 *         description: Asignatura eliminada
 *       404:
 *         description: Asignatura no encontrada
 */
asignaturaRouter.delete('/:cod_a', asignaturasController.remove);

export default asignaturaRouter;
