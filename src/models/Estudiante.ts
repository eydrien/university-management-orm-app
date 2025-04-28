import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index';

export class Estudiante extends Model {
  cod_e!: number;
  nom_e!: string;
  dir_e!: string;
  tel_e!: string;
  fech_nac!: Date;
}

Estudiante.init({
  cod_e: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    validate: { min: 1 }
  },
  nom_e: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dir_e: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  tel_e: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 1
    }
  },
  fech_nac: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Estudiante',
  tableName: 'Estudiantes',
  timestamps: false,
});
//verificar luego
export default Estudiante;