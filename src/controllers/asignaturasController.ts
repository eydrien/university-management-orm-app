// src/controllers/asignaturasController.ts
import { Request, Response } from 'express';
import Asignatura from '../models/Asignatura';

export const create = async (req: Request, res: Response) => {
  try {
    const asignaturaData = req.body;
    const nuevaAsignatura = await Asignatura.create(asignaturaData);
    res.status(201).json({
      statusCode: 201,
      message: 'Asignatura creada exitosamente',
      data: nuevaAsignatura
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const asignaturas = await Asignatura.findAll();
    res.status(200).json({
      statusCode: 200,
      message: 'Asignaturas obtenidas exitosamente',
      data: asignaturas
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_a } = req.params;
    const asignatura = await Asignatura.findByPk(cod_a);
    if (!asignatura) {
      res.status(404).json({ statusCode: 404, message: 'Asignatura no encontrada' });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Asignatura obtenida exitosamente',
      data: asignatura
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_a } = req.params;
    const updateData = req.body;
    const [updated] = await Asignatura.update(updateData, { where: { cod_a } });
    if (updated === 0) {
      res.status(404).json({ statusCode: 404, message: 'Asignatura no encontrada' });
      return;
    }
    const updatedAsignatura = await Asignatura.findByPk(cod_a);
    res.status(200).json({
      statusCode: 200,
      message: 'Asignatura actualizada exitosamente',
      data: updatedAsignatura
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_a } = req.params;
    const deleted = await Asignatura.destroy({ where: { cod_a } });
    if (deleted === 0) {
      res.status(404).json({ statusCode: 404, message: 'Asignatura no encontrada' });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Asignatura eliminada exitosamente'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
