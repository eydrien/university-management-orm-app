import { Router } from 'express';
import * as profesorController from '../controllers/profesoresController';

const profesorRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Profesores
 *   description: Operaciones CRUD para profesores
 */

/**
 * @swagger
 * /profesores:
 *   post:
 *     summary: Crea un nuevo profesor
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profesor'
 *     responses:
 *       201:
 *         description: Profesor creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
 */
profesorRouter.post('/', profesorController.create);

/**
 * @swagger
 * /profesores:
 *   get:
 *     summary: Obtiene todos los profesores
 *     tags: [Profesores]
 *     responses:
 *       200:
 *         description: Lista de profesores
 *       500:
 *         description: Error en el servidor
 */
profesorRouter.get('/', profesorController.getAll);

/**
 * @swagger
 * /profesores/{id_p}:
 *   get:
 *     summary: Obtiene un profesor por su ID
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_p
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Profesor encontrado
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error en el servidor
 */
profesorRouter.get('/:id_p', profesorController.getOne);

/**
 * @swagger
 * /profesores/{id_p}:
 *   put:
 *     summary: Actualiza un profesor existente
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_p
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom_p
 *               - dir_p
 *               - tel_p
 *               - profesion
 *             properties:
 *               nom_p:
 *                 type: string
 *                 example: Norbey Muñoz
 *               dir_p:
 *                 type: string
 *                 example: Calle falsa 000
 *               tel_p:
 *                 type: integer
 *                 example: 45678912
 *               profesion:
 *                 type: string
 *                 example: Ingeniero
 *     responses:
 *       200:
 *         description: Profesor actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error en el servidor
 */
profesorRouter.put('/:id_p', profesorController.update);

/**
 * @swagger
 * /profesores/{id_p}:
 *   delete:
 *     summary: Elimina un profesor
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_p
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Profesor eliminado exitosamente
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error en el servidor
 */
profesorRouter.delete('/:id_p', profesorController.remove);

export default profesorRouter;
