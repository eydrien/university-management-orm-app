// src/controllers/estudiantesController.ts
import { Request, Response } from 'express';
import Estudiante from '../models/Estudiante';
//crear estudiantes
export const create = async (req: Request, res: Response) => {
  try {
    const estudianteData = req.body;
    const nuevoEstudiante = await Estudiante.create(estudianteData);
    res.status(201).json({
      statusCode: 201,
      message: 'Estudiante creado exitosamente',
      data: nuevoEstudiante
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
//obtener todos los estudiantes
export const getAll = async (req: Request, res: Response) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.status(200).json({
      statusCode: 200,
      message: 'Estudiantes obtenidos exitosamente',
      data: estudiantes
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
//Obtener solo un estudiante
export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_e } = req.params;
    const estudiante = await Estudiante.findByPk(cod_e);
    if (!estudiante) {
      res.status(404).json({ statusCode: 404, message: 'Estudiante no encontrado' });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Estudiante obtenido exitosamente',
      data: estudiante
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
//actualizar estudiante
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_e } = req.params;
    const updateData = req.body;
    const [updated] = await Estudiante.update(updateData, { where: { cod_e } });
    if (updated === 0) {
      res.status(404).json({ statusCode: 404, message: 'Estudiante no encontrado' });
      return;
    }
    const updatedEstudiante = await Estudiante.findByPk(cod_e);
    res.status(200).json({
      statusCode: 200,
      message: 'Estudiante actualizado exitosamente',
      data: updatedEstudiante
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_e } = req.params;
    const deleted = await Estudiante.destroy({ where: { cod_e } });
    if (deleted === 0) {
      res.status(404).json({ statusCode: 404, message: 'Estudiante no encontrado' });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Estudiante eliminado exitosamente'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
