import Profesor from "../models/Profesor";
import Asignatura from "../models/Asignatura";
import Estudiante from "../models/Estudiante";
import Imparte from "../models/Imparte";
import Inscribe from "../models/Inscribe";

export const setupAssociations = () => {

  // Imparte pertenece a Profesor
  Imparte.belongsTo(Profesor, { foreignKey: 'id_p' });
  Profesor.hasMany(Imparte, { foreignKey: 'id_p' });

  // Imparte pertenece a Asignatura
  Imparte.belongsTo(Asignatura, { foreignKey: 'cod_a' });
  Asignatura.hasMany(Imparte, { foreignKey: 'cod_a' });

  // Inscribe pertenece a Estudiante
  Inscribe.belongsTo(Estudiante, { foreignKey: 'cod_e' });
  Estudiante.hasMany(Inscribe, { foreignKey: 'cod_e' });
  // de esta forma no tendre error con lon include
  Inscribe.belongsTo(Asignatura, { foreignKey: 'cod_a' });
  Asignatura.hasMany(Inscribe, { foreignKey: 'cod_a' });

  Inscribe.belongsTo(Profesor, { foreignKey: 'id_p' });
  Profesor.hasMany(Inscribe, { foreignKey: 'id_p' });

  // Inscribe pertenece a Imparte (foreign key compuesta)
  // Squalize no maneja las llves compuestas asi que toca hacerlo manual 
  //en la Base de datos

  /* ALTER TABLE Inscribe
  ADD CONSTRAINT fk_inscribe_imparte
  FOREIGN KEY (cod_a, id_p, grupo, semestre)
  REFERENCES Imparte (cod_a, id_p, grupo, semestre); */

};
