import * as dotenv from 'dotenv';
dotenv.config();
import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

// Configuración de Swagger
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Estudiantes',
            version: '1.0.0',
            description: 'Documentación de la API con Swagger',
        },
        servers: [
            {
                url: `http://${process.env.HOST}:${process.env.PORT}`,
                description: 'Servidor de desarrollo',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Archivos donde están las rutas
};

// Generar la documentación
const swaggerSpec = swaggerJSDoc(options);

// Guardar en un archivo JSON
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));

console.log('📄 Archivo swagger.json generado correctamente.');
