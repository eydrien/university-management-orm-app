import { Router } from 'express';
import * as imparteController from '../controllers/imparteControllers';

const imparteRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Imparte
 *   description: Asignación de profesores a asignaturas
 */

/**
 * @swagger
 * /imparte:
 *   post:
 *     summary: Asignar un profesor a una asignatura
 *     tags: [Imparte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Imparte'
 *     responses:
 *       201:
 *         description: Asignación creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
imparteRouter.post('/', imparteController.create);

/**
 * @swagger
 * /imparte:
 *   get:
 *     summary: Obtener todas las asignaciones
 *     tags: [Imparte]
 *     responses:
 *       200:
 *         description: Lista de asignaciones
 *       500:
 *         description: Error del servidor
 */
imparteRouter.get('/', imparteController.getAll);

/**
 * @swagger
 * /imparte/profesores/{id_p}/asignaturas:
 *   get:
 *     summary: Obtener asignaturas que imparte un profesor
 *     tags: [Imparte]
 *     parameters:
 *       - in: path
 *         name: id_p
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Asignaturas encontradas
 *       404:
 *         description: No se encontraron asignaturas
 *       500:
 *         description: Error del servidor
 */
imparteRouter.get('/profesores/:id_p/asignaturas', imparteController.getByIdP);

/**
 * @swagger
 * /imparte/asignatura/{cod_a}/profesores:
 *   get:
 *     summary: Obtener profesores que imparten una asignatura
 *     tags: [Imparte]
 *     parameters:
 *       - in: path
 *         name: cod_a
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código de la asignatura
 *     responses:
 *       200:
 *         description: Profesores encontrados
 *       404:
 *         description: No se encontraron profesores
 *       500:
 *         description: Error del servidor
 */
imparteRouter.get('/asignatura/:cod_a/profesores', imparteController.getByCodA);

/**
 * @swagger
 * /imparte:
 *   put:
 *     summary: Actualizar la asignación de un profesor
 *     tags: [Imparte]
 *     parameters:
 *       - in: query
 *         name: id_p
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
 *             $ref: '#/components/schemas/Imparte'
 *     responses:
 *       200:
 *         description: Asignación actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Asignación no encontrada
 *       500:
 *         description: Error del servidor
 */
imparteRouter.put('/', imparteController.update);

/**
 * @swagger
 * /imparte:
 *   delete:
 *     summary: Eliminar una asignación
 *     tags: [Imparte]
 *     parameters:
 *       - in: query
 *         name: id_p
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
 *       - in: query
 *         name: semestre
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignación eliminada exitosamente
 *       404:
 *         description: Asignación no encontrada
 *       500:
 *         description: Error del servidor
 */
imparteRouter.delete('/', imparteController.remove);

export default imparteRouter;
