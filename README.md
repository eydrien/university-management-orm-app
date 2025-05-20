# University Management ORM App 🎓

Este proyecto es una **API RESTful** para la gestión académica universitaria desarrollada con **Node.js**, **Express**, **TypeScript**, **Sequelize ORM** y documentación con **Swagger UI**.

Permite gestionar entidades como **estudiantes, profesores, asignaturas, inscripciones e imparticiones**, todo con una arquitectura clara, escalable y desacoplada.

---


## 📚 Tecnologías Utilizadas

- **Node.js** + **Express**: Backend y servidor HTTP.
- **TypeScript**: Tipado estático y código más robusto.
- **Sequelize ORM**: Mapeo objeto-relacional con conexión a base de datos MySQL.
- **Swagger UI**: Documentación interactiva de la API.
- **dotenv**: Configuración de variables de entorno.

---
## 🛠️ **Instalación** 🚀

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/eydrien/university-management-orm-app.git
   cd university-management-orm-app
2. **Instalar dependencias**
    ```bash
   npm install
   npm install express nodemon body-parser mysql2 dotenv cors
   npm install --save-dev ts-node nodemon
   npm install typescript --save-dev
3. **Configura el entorno de desarrollo**
    ```bash
    #Crea un archivo .env en la raíz del proyecto con las variables necesarias (por ejemplo, conexión a la base de datos, puertos, etc.)
    #Si no tienes un archivo .env, puedes basarte en el archivo .env.example para configurarlo.
4. **Ejecuta la aplicación**
    ```bash
    #Para iniciar el servidor en modo desarrollo, ejecuta:
    #Esto arrancará el servidor con nodemon para reiniciar automáticamente en caso de cambios en el código.
    npm run dev

---

## 📋 **Requisitos** ⚙️

Asegúrate de tener las siguientes versiones de herramientas:

- **Node.js** (v16 o superior) 🔑
- **npm** (v8 o superior) 📦

---
## **📑 Endpoints Documentados**
   La documentación completa de la API está disponible gracias a Swagger.
   Una vez el servidor está corriendo.
   
   1. **Visita:**
      ```bash
            http://localhost:3000/api-docs

---
## **🛠 Funcionalidades*
 -CRUD completo para estudiantes, profesores y asignaturas.

 Registro de materias impartidas por profesores.

 Inscripción de estudiantes a materias.

 Filtro avanzado por grupo, semestre, asignatura.

 Validaciones y manejo de errores.

 Documentación Swagger con ejemplos y descripciones.


## **📄 Licencia 🔒**
    Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

---
## **🧑 Autor**
Desarrollado por Adrián David González Romero
   
   
