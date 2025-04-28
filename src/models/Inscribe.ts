import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index';
import Profesor from './Profesor';
import Asignatura from './Asignatura';
import Estudiante from './Estudiante';

export class Inscribe extends Model {
  cod_e!: number;
  cod_a!: number;
  id_p!: number;
  grupo!: number;
  semestre!: number;
  n1!: number;
  n2!: number;
  n3!: number;

  //relaciones de imparte para darle formato al nombre
  public Profesor?: Profesor;
  public Asignatura?: Asignatura;
  public Estudiante?: Estudiante;
}

Inscribe.init({
  cod_e: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  },
  cod_a: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  },
  id_p: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  },
  grupo: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  },
  semestre: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  },
  n1: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0, max: 5 }
  },
  n2: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0, max: 5 }
  },
  n3: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0, max: 5 }
  }
}, {
  sequelize,
  modelName: 'Inscribe',
  tableName: 'Inscribe',
  timestamps: false,
});

export default Inscribe;
