import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index';

export class Asignatura extends Model {
  cod_a!: number;
  nom_a!: string;
  int_h!: number;
  creditos!: number;
}

Asignatura.init({
  cod_a: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    validate: { min: 1 }
  },
  nom_a: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  int_h: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: { min: 1 }
  },
  creditos: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: { min: 1 }
  }
}, {
  sequelize,
  modelName: 'Asignatura',
  tableName: 'Asignaturas',
  timestamps: false,
});

export default Asignatura;
