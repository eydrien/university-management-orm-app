import swaggerJSDoc from 'swagger-jsdoc';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST de universidad',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
    servers: [
      {
        url: `http://${host}:${port}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      schemas: {
        Asignatura: {
          type: 'object',
          required: ['cod_a', 'nom_a', 'int_h', 'creditos'],
          properties: {
            cod_a: { type: 'integer', example: 228 },
            nom_a: { type: 'string', example: 'Ingeniería' },
            int_h: { type: 'integer', example: 5 },
            creditos: { type: 'integer', example: 6 }
          }
        },
        Estudiante: {
          type: 'object',
          required: ['cod_e', 'nom_e', 'dir_e', 'tel_e', 'fech_nac'],
          properties: {
            cod_e: { type: 'integer', example: 118 },
            nom_e: { type: 'string', example: 'Juanito Pérez' },
            dir_e: { type: 'string', example: 'Avenida 68 #45-67' },
            tel_e: { type: 'integer', example: 3112233445 },
            fech_nac: { type: 'string', format: 'date', example: '1997-12-05' }
          }
        },
        Profesor: {
          type: 'object',
          required: ['id_p', 'nom_p', 'dir_p', 'tel_p', 'profesion'],
          properties: {
            id_p: { type: 'integer', example: 3005 },
            nom_p: { type: 'string', example: 'María Camila González' },
            dir_p: { type: 'string', example: 'Transversal 10 #45-67' },
            tel_p: { type: 'string', example: '3009876543' },
            profesion: { type: 'string', example: 'Desarrolladora de Aplicaciones' }
          }
        },
        Imparte: {
          type: 'object',
          required: ['id_p', 'cod_a', 'grupo', 'semestre', 'horario'],
          properties: {
            id_p: { type: 'integer', example: 302 },
            cod_a: { type: 'integer', example: 222 },
            grupo: { type: 'integer', example: 503 },
            semestre: { type: 'integer', example: 202502 },
            horario: { type: 'string', example: 'Nocturna' }
          }
        },
        Inscribe: {
          type: 'object',
          required: ['cod_e', 'cod_a', 'id_p', 'grupo', 'semestre', 'n1', 'n2', 'n3'],
          properties: {
            cod_e: { type: 'integer', example: 113 },
            cod_a: { type: 'integer', example: 222 },
            id_p: { type: 'integer', example: 302 },
            grupo: { type: 'integer', example: 502 },
            semestre: { type: 'integer', example: 202502 },
            n1: { type: 'number', example: 3 },
            n2: { type: 'number', example: 3 },
            n3: { type: 'number', example: 4 }
          }
        },
        InscribeNotas: {
          type: 'object',
          required: ['n1', 'n2', 'n3'],
          properties: {
            n1: { type: 'number', example: 3 },
            n2: { type: 'number', example: 3 },
            n3: { type: 'number', example: 4 }
          }
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
