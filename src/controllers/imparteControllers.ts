// src/controllers/imparteController.ts
import { Request, Response } from 'express';
import Imparte from '../models/Imparte';
import Profesor from '../models/Profesor';
import Asignatura from '../models/Asignatura';
import { where } from 'sequelize';



export const create = async (req: Request, res: Response) => {
  try {
    const imparteData = req.body;
    const nuevoImparte = await Imparte.create(imparteData);
    res.status(201).json({
      statusCode: 201,
      message: 'Materia asignada exitosamente',
      data: nuevoImparte
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const imparteList = await Imparte.findAll({
      include: [
        {
          model: Profesor,
          attributes: ['nom_p'], // solo el nombre del profesor
        },
        {
          model: Asignatura,
          attributes: ['nom_a'], // solo el nombre de la asignatura
        }
      ]
    });

    // Formatear los resultados
    const formattedData = imparteList.map((imparte) => ({
      id_p: imparte.id_p,
      profesor: imparte.Profesor?.nom_p,
      cod_a: imparte.cod_a,
      asignatura: imparte.Asignatura?.nom_a,
      grupo: imparte.grupo,
      semestre: imparte.semestre
    }));

    res.status(200).json({
      statusCode: 200,
      message: 'Listado obtenido exitosamente',
      data: formattedData
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//traer materias por id del profesor
export const getByIdP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_p } = req.params;

    const imparteList = await Imparte.findAll({
      where: { id_p },
      include: [
        {
          model: Profesor,
          attributes: ['nom_p'], // nombre del profesor
        },
        {
          model: Asignatura,
          attributes: ['nom_a'], // nombre de la asignatura
        }
      ]
    });
    // Formatear los resultados
    const formattedData = imparteList.map((imparte) => ({
      id_p: imparte.id_p,
      profesor: imparte.Profesor?.nom_p,
      cod_a: imparte.cod_a,
      asignatura: imparte.Asignatura?.nom_a,
      grupo: imparte.grupo,
      semestre: imparte.semestre
    }));

    if (imparteList.length === 0) {
      res.status(400).json({ statusCode: 400, message: 'No existe registro en imparte' });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Asignaturas del profesor obtenidas exitosamente',
      data: formattedData
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//traer profesores por codigo de asignatura
export const getByCodA = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_a } = req.params;
    const imparteList = await Imparte.findAll({
      where: { cod_a },
      include: [
        {
          model: Profesor,
          attributes: ['nom_p'], // nombre del profesor
        },
        {
          model: Asignatura,
          attributes: ['nom_a'], // nombre de la asignatura
        }
      ]

    });

    // Formatear los resultados
    const formattedData = imparteList.map((imparte) => ({
      id_p: imparte.id_p,
      profesor: imparte.Profesor?.nom_p,
      cod_a: imparte.cod_a,
      asignatura: imparte.Asignatura?.nom_a,
      grupo: imparte.grupo,
      semestre: imparte.semestre
    }));

    if (imparteList.length === 0) {
      res.status(400).json({ statusCode: 400, message: 'No existe registro en imparte' });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Profesores de la asignarura obtenidos exitosamente',
      data: formattedData
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_p, cod_a, grupo, semestre } = req.query;

    // Validación para asegurar que todos los parámetros existen
    if (
      id_p === undefined ||
      cod_a === undefined ||
      grupo === undefined ||
      semestre === undefined
    ) {
      res.status(400).json({ message: 'Se requieren los parámetros query: id_p, cod_a, grupo y semestre.' });
      return;
    }

    const updateData = req.body;

    const [updated] = await Imparte.update(updateData, {
      where: {
        id_p: id_p.toString(),
        cod_a: cod_a.toString(),
        grupo: grupo.toString(),       // lo dejamos como string si en la BD está como string
        semestre: semestre.toString(),
      },
    });

    if (updated === 0) {
      res.status(400).json({ statusCode: 400, message: 'No existe registro en imparte' });
      return;
    }

    const newWhereClause = {
      id_p: updateData.id_p ?? id_p.toString(),
      cod_a: updateData.cod_a ?? cod_a.toString(),
      grupo: updateData.grupo ?? grupo.toString(),
      semestre: updateData.semestre ?? semestre.toString(),
    };

    const updatedImparte = await Imparte.findOne({
      where: newWhereClause,
    });

    res.status(200).json({
      statusCode: 200,
      message: 'Imparte actualizado exitosamente',
      data: updatedImparte,
      /* where: newWhereClause, */
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_p, cod_a, grupo, semestre } = req.query;

    // Validar que ningún parámetro esté ausente
    if (
      id_p === undefined ||
      cod_a === undefined ||
      grupo === undefined ||
      semestre === undefined
    ) {
      res.status(400).json({ message: 'Se requieren los parámetros query: id_p, cod_a, grupo y semestre.' });
      return;
    }

    const deleted = await Imparte.destroy({
      where: {
        id_p: id_p.toString(),
        cod_a: cod_a.toString(),
        grupo: grupo.toString(),
        semestre: semestre.toString(),
      },
    });

    if (deleted === 0) {
      res.status(400).json({ statusCode: 400, message: 'No existe registro en imparte' });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Registro eliminado exitosamente',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

