import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index';
import Profesor from './Profesor';
import Asignatura from './Asignatura';

export class Imparte extends Model {
  id_p!: number;
  cod_a!: number;
  grupo!: number;
  semestre!: number;
  horario!: string;
  
  //relaciones de imparte para darle formato al nombre
  public Profesor?: Profesor;
  public Asignatura?: Asignatura;

}

Imparte.init({
  id_p: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  },
  cod_a: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  },
  grupo: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    validate: { min: 1 }
  },
  semestre: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    validate: { min: 1 }
  },
  horario: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Imparte',
  tableName: 'Imparte',
  timestamps: false,
});


export default Imparte;
