// src/database/index.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import  Profesor  from '../models/Profesor';
import  Asignatura  from '../models/Asignatura';
import  Imparte  from '../models/Imparte';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PWD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
