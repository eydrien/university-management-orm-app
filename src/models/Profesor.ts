import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index';

export class Profesor extends Model {
  id_p!: number;
  nom_p!: string;
  dir_p!: string;
  tel_p!: string;
  profesion!: string;
}

Profesor.init({
  id_p: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    validate: { min: 1 }
  },
  nom_p: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dir_p: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  tel_p: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 1
    }
  },
  profesion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Profesor',
  tableName: 'Profesores',
  timestamps: false,
});


export default Profesor;
