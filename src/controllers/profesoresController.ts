import { Request, Response } from 'express';
import Profesor from '../models/Profesor';
import { db } from '../../utils/db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = async (req: Request, res: Response) => {
  try {
    const profesorData = req.body;
    const nuevoProfesor = await Profesor.create(profesorData);
    res.status(201).json({
      statusCode: 201,
      message: 'Profesor creado exitosamente',
      data: nuevoProfesor
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
    try {
      const profesores = await Profesor.findAll();
      res.status(200).json({
        statusCode: 200,
        message: 'Profesores obtenidos exitosamente',
        data: profesores
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getOne = async (req: Request, res: Response): Promise <void> => {
    try {
      const { id_p } = req.params;
      const profesor = await Profesor.findByPk(id_p);
      if (!profesor) {
         res.status(404).json({ statusCode: 404, message: 'Profesor no encontrado' });
      }
      res.status(200).json({
        statusCode: 200,
        message: 'Profesor obtenido exitosamente',
        data: profesor
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const update = async (req: Request, res: Response): Promise <void> => {
    try {
      const { id_p } = req.params;
      const updateData = req.body;
      const [updated] = await Profesor.update(updateData, { where: { id_p } });
      if (updated === 0) {
        res.status(404).json({ statusCode: 404, message: 'Profesor no encontrado' });
      }
      const updatedProfesor = await Profesor.findByPk(id_p);
      res.status(200).json({
        statusCode: 200,
        message: 'Profesor actualizado exitosamente',
        data: updatedProfesor
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const remove = async (req: Request, res: Response): Promise <void> => {
    try {
      const { id_p } = req.params;
      const deleted = await Profesor.destroy({ where: { id_p } });
      if (deleted === 0) {
        res.status(404).json({ statusCode: 404, message: 'Profesor no encontrado' });
      }
      res.status(200).json({
        statusCode: 200,
        message: 'Profesor eliminado exitosamente'
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };