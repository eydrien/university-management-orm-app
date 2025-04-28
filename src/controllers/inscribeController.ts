// src/controllers/inscribeController.ts
import { Request, Response } from 'express';
import Inscribe from '../models/Inscribe';
import Profesor from '../models/Profesor';
import Asignatura from '../models/Asignatura';
import Estudiante from '../models/Estudiante';

//crear inscripciones
export const create = async (req: Request, res: Response) => {
  try {
    const inscribeData = req.body;
    const nuevoInscribe = await Inscribe.create(inscribeData);
    res.status(201).json({
      statusCode: 201,
      message: 'Notas cargadas exitosamente',
      data: nuevoInscribe
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//obtener todas las inscripciones
export const getAll = async (req: Request, res: Response) => {
  try {
    const inscripciones = await Inscribe.findAll({
      include: [
        {
          model: Estudiante,
          attributes: ['nom_e'],
        },
        {
          model: Asignatura,
          attributes: ['nom_a'],
        },
        {
          model: Profesor,
          attributes: ['nom_p'],
        }
      ]
    });

    // Formatear los resultados
    const formattedData = inscripciones.map((inscribe) => ({
      cod_e: inscribe.cod_e,
      estudiante: inscribe.Estudiante?.nom_e,
      cod_a: inscribe.cod_a,
      asignatura: inscribe.Asignatura?.nom_a,
      id_p: inscribe.id_p,
      profesor: inscribe.Profesor?.nom_p,
      grupo: inscribe.grupo,
      semestre: inscribe.semestre,
      nota_1: inscribe.n1,
      nota_2: inscribe.n2,
      nota_3: inscribe.n3

    }));

    res.status(200).json({
      statusCode: 200,
      message: 'Inscripciones obtenidas exitosamente',
      data: formattedData
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

};
//obtener inscripciones por estudiante
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_e } = req.params;
    const inscripciones = await Inscribe.findAll({
      where: { cod_e },

      include: [
        {
          model: Estudiante,
          attributes: ['nom_e'],
        },
        {
          model: Asignatura,
          attributes: ['nom_a'],
        },
        {
          model: Profesor,
          attributes: ['nom_p'],
        }
      ]
    });

    const formattedData = inscripciones.map((inscribe) => ({
      cod_e: inscribe.cod_e,
      estudiante: inscribe.Estudiante?.nom_e,
      cod_a: inscribe.cod_a,
      asignatura: inscribe.Asignatura?.nom_a,
      id_p: inscribe.id_p,
      profesor: inscribe.Profesor?.nom_p,
      grupo: inscribe.grupo,
      semestre: inscribe.semestre,
      nota_1: inscribe.n1,
      nota_2: inscribe.n2,
      nota_3: inscribe.n3
    }));

    if (inscripciones.length === 0) {
      res.status(400).json({ statusCode: 400, message: 'No existe registro en inscribe' });
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Inscribe obtenido exitosamente',
      data: formattedData
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//obtener inscripcion por cod_e, cod_a, grupo
export const getOneAsignatura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_e, cod_a, grupo } = req.query;

    // Validar presencia de parámetros
    if (!cod_e || !cod_a || !grupo) {
      res.status(400).json({
        message: 'Se requieren los parámetros query: cod_e, cod_a y grupo.'
      });
      return; // Salir si no se cumplen los parámetros
    }

    // Convertir parámetros a string
    const cod_e_str = Array.isArray(cod_e) ? cod_e[0] : cod_e;
    const cod_a_str = Array.isArray(cod_a) ? cod_a[0] : cod_a;
    const grupo_str = Array.isArray(grupo) ? grupo[0] : grupo;

    // Buscar la inscripción correspondiente
    const inscripcion = await Inscribe.findOne({
      where: {
        cod_e: cod_e_str,
        cod_a: cod_a_str,
        grupo: grupo_str
      },

      include: [
        {
          model: Estudiante,
          attributes: ['nom_e'],
        },
        {
          model: Asignatura,
          attributes: ['nom_a'],
        },
        {
          model: Profesor,
          attributes: ['nom_p'],
        }
      ]
    });

    // Verificar si no se encuentra la inscripción
    if (!inscripcion) {
      res.status(404).json({
        statusCode: 404,
        message: 'No existe registro en inscribe'
      });
      return; // Salir si no se encuentra
    }

    // Formatear los resultados
    const formattedData = {
      cod_e: inscripcion.cod_e,
      estudiante: inscripcion.Estudiante?.nom_e,
      cod_a: inscripcion.cod_a,
      asignatura: inscripcion.Asignatura?.nom_a,
      id_p: inscripcion.id_p,
      profesor: inscripcion.Profesor?.nom_p,
      grupo: inscripcion.grupo,
      semestre: inscripcion.semestre,
      nota_1: inscripcion.n1,
      nota_2: inscripcion.n2,
      nota_3: inscripcion.n3
    };

    // Responder con los datos formateados
    res.status(200).json({
      statusCode: 200,
      message: 'Inscribe obtenido exitosamente',
      data: formattedData
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

//Obtener asignaturas por cod_e, semestre
export const getAsignaturasByEstudiante = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_e, semestre } = req.query;


    if (!cod_e || !semestre) {
      res.status(400).json({
        message: 'Se requieren los parámetros query: cod_e y semestre.'
      });
      return; 
    }

 
    const cod_e_str = Array.isArray(cod_e) ? cod_e[0] : cod_e;
    const semestre_str = Array.isArray(semestre) ? semestre[0] : semestre;


    const inscripciones = await Inscribe.findAll({
      where: {
        cod_e: cod_e_str,
        semestre: semestre_str
      },
      include: [
        {
          model: Estudiante,
          attributes: ['nom_e'],
        },
        {
          model: Asignatura,
          attributes: ['nom_a'],
        },
        {
          model: Profesor,
          attributes: ['nom_p'],
        }
      ]
    });


    if (inscripciones.length === 0) {
      res.status(404).json({
        statusCode: 404,
        message: 'No existen asignaturas para este estudiante en el semestre proporcionado.'
      });
      return; 
    }

    // Formatear los resultados
    const formattedData = inscripciones.map((inscribe) => ({
      cod_e: inscribe.cod_e,
      estudiante: inscribe.Estudiante?.nom_e,
      cod_a: inscribe.cod_a,
      asignatura: inscribe.Asignatura?.nom_a,
      id_p: inscribe.id_p,
      profesor: inscribe.Profesor?.nom_p,
      grupo: inscribe.grupo,
      semestre: inscribe.semestre,
      nota_1: inscribe.n1,
      nota_2: inscribe.n2,
      nota_3: inscribe.n3
    }));

    // Responder con los datos formateados
    res.status(200).json({
      statusCode: 200,
      message: 'Asignaturas obtenidas exitosamente',
      data: formattedData
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

//obtener estudiantes por asignatura y grupo
export const getEstudiantesByAsignaturaGrupo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_a, grupo } = req.query;

    // Validar presencia de parámetros
    if (!cod_a || !grupo) {
      res.status(400).json({
        message: 'Se requieren los parámetros query: cod_a y grupo.'
      });
      return;
    }

    // Convertir parámetros a string
    const cod_a_str = Array.isArray(cod_a) ? cod_a[0] : cod_a;
    const grupo_str = Array.isArray(grupo) ? grupo[0] : grupo;

    // Obtener estudiantes por cod_a y grupo
    const inscripciones = await Inscribe.findAll({
      where: {
        cod_a: cod_a_str,
        grupo: grupo_str,
      },
      include: [
        {
          model: Estudiante,
          attributes: ['nom_e'],
        },
        {
          model: Asignatura,
          attributes: ['nom_a'],
        },
        {
          model: Profesor,
          attributes: ['nom_p'],
        }
      ]
    });

    // Si no se encuentran estudiantes
    if (inscripciones.length === 0) {
      res.status(404).json({
        statusCode: 404,
        message: 'No existen estudiantes para esta asignatura y grupo.'
      });
      return;
    }

    // Formatear los resultados
    const formattedData = inscripciones.map((inscribe) => ({
      cod_e: inscribe.cod_e,
      estudiante: inscribe.Estudiante?.nom_e,
      cod_a: inscribe.cod_a,
      asignatura: inscribe.Asignatura?.nom_a,
      id_p: inscribe.id_p,
      profesor: inscribe.Profesor?.nom_p,
      grupo: inscribe.grupo,
      semestre: inscribe.semestre,
      nota_1: inscribe.n1,
      nota_2: inscribe.n2,
      nota_3: inscribe.n3
    }));

    res.status(200).json({
      statusCode: 200,
      message: 'Estudiantes obtenidos exitosamente',
      data: formattedData
    });

  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

//Obtener Estudiantes por cod_a, grupo  y semestre
export const getEstudiantesByAsignaturaGrupoSemestre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_a, grupo, semestre } = req.query;

    // Validar presencia de parámetros
    if (!cod_a || !grupo || !semestre) {
      res.status(400).json({
        message: 'Se requieren los parámetros query: cod_a y grupo.'
      });
      return;
    }

    // Convertir parámetros a string
    const cod_a_str = Array.isArray(cod_a) ? cod_a[0] : cod_a;
    const grupo_str = Array.isArray(grupo) ? grupo[0] : grupo;
    const semestre_str = Array.isArray(semestre) ? semestre[0] : semestre;

    // Obtener estudiantes por cod_a y grupo
    const inscripciones = await Inscribe.findAll({
      where: {
        cod_a: cod_a_str,
        grupo: grupo_str,
        semestre: semestre_str,
      },
      include: [
        {
          model: Estudiante,
          attributes: ['nom_e'],
        },
        {
          model: Asignatura,
          attributes: ['nom_a'],
        },
        {
          model: Profesor,
          attributes: ['nom_p'],
        }
      ]
    });

    // Si no se encuentran estudiantes
    if (inscripciones.length === 0) {
      res.status(404).json({
        statusCode: 404,
        message: 'No existen estudiantes para esta asignatura y grupo.'
      });
      return;
    }

    // Formatear los resultados
    const formattedData = inscripciones.map((inscribe) => ({
      cod_e: inscribe.cod_e,
      estudiante: inscribe.Estudiante?.nom_e,
      cod_a: inscribe.cod_a,
      asignatura: inscribe.Asignatura?.nom_a,
      id_p: inscribe.id_p,
      profesor: inscribe.Profesor?.nom_p,
      grupo: inscribe.grupo,
      semestre: inscribe.semestre,
      nota_1: inscribe.n1,
      nota_2: inscribe.n2,
      nota_3: inscribe.n3
    }));

    res.status(200).json({
      statusCode: 200,
      message: 'Estudiantes obtenidos exitosamente',
      data: formattedData
    });

  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

//actualizar inscripciones
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cod_e, cod_a, id_p, grupo, semestre } = req.query;

    // Validar existencia
    if (!cod_e || !cod_a || !id_p || !grupo || !semestre) {
      res.status(400).json({
        message: 'Se requieren los parámetros query: cod_e, cod_a, id_p, grupo y semestre.'
      });
    }

    // Convertir a tipos correctos (si son numéricos en el modelo)
    const parsedParams = {
      cod_e: parseInt(cod_e as string),
      cod_a: parseInt(cod_a as string),
      id_p: parseInt(id_p as string),
      grupo: parseInt(grupo as string),
      semestre: parseInt(semestre as string),
    };

    // Cuerpo de la actualización
    const updateData = req.body;

    // Intentar actualizar
    const [updated] = await Inscribe.update(updateData, {
      where: parsedParams
    });

    if (updated === 0) {
      res.status(400).json({
        statusCode: 400,
        message: 'No existe registro en inscribe'
      });
    }

    // Buscar el registro actualizado
    const updatedInscribe = await Inscribe.findOne({ where: parsedParams });

    res.status(200).json({
      statusCode: 200,
      message: 'Inscribe actualizado exitosamente',
      data: updatedInscribe
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const cod_e = req.query.cod_e as string;
    const cod_a = req.query.cod_a as string;
    const id_p = req.query.id_p as string;
    const grupo = parseInt(req.query.grupo as string);
    const semestre = req.query.semestre as string;

    if (!cod_e || !cod_a || !id_p || isNaN(grupo) || !semestre) {
      res.status(400).json({ message: 'Se requieren los parámetros query: cod_e, cod_a, id_p, grupo y semestre.' });
    }

    const deleted = await Inscribe.destroy({
      where: { cod_e, cod_a, id_p, grupo, semestre }
    });

    if (deleted === 0) {
      res.status(400).json({ statusCode: 400, message: 'No existe registro en inscribe' });
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Registro eliminado exitosamente'
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

