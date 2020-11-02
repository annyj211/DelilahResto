# Delilah Restó
Este es un proyecto desarrollado para el curso de Desarrollo Web FullStack de Acámica. Es un servicio de Backend - API REST con NodeJS y base de dátos MySQL. 

## Requisitos

Para el correcto funcionamiento del servidor es necesario contar con:

    - Git.
    - MySQL.
    - NodeJS.    
    - Postman (Para realizar las pruebas).

## Copia local del repositorio

Se debera clonar el repositorio en una ventana de comandos en el equipo local ejecutando el siguiente comando:

```
git clone https://github.com/annyj211/DelilahResto.git
```

## Base de datos 

Bajar el archivo db.sql y ejecutarlo en el motor de base de datos MySQL Workbench.        

## Instalación

Para instalar las dependencias necesarias usamos, en la ruta del archivo package.json:

```
npm install
```
Al ejecutar este comando se instalaran las siguientes librerias

- "express": "^4.17.1",
- "jsonwebtoken": "^8.5.1",
- "mysql2": "^2.1.0",
- "sequelize": "^6.3.5",
- "swagger-jsdoc": "^4.3.0",
- "swagger-ui-express": "^4.1.4"

## Ejecutar el proyecto

En el archivo data_base.js se debe configurar los parametros de conexión a la base de datos.

Una vez instaladas todas las dependencias y que ya existe la base de datos ejecutar el siguiente comando para iniciar el servidor Express en el puerto 3010:

```
node app.js
```
       
## End points

- Login http://localhost:3010/login
- Orders admin http://localhost:3010/orders
- Productos http://localhost:3010/productos
- Usuario http://localhost:3010/usuarios
- Ordenes usuarios http://localhost:3010/ordenes 
- Status http://localhost:3010/status
- Metodos de pago http://localhost:3010/metodospago

## Postman

En la ruta Postman se encuentra la colección de peticiones para consumir los servicios del proyecto.




1.Descargar el proyecto e instalar las dependencias para poder ejecutarlo. (Comando npm i)
2.Ejecutar el archivo sql en MySQL Workbench para crear y registrar las tablas de la BD con datos 
3.
#
#
#
----------------------------------------------
#Tecnologías usadas:
#Node JS
#MySQL

Librerías usadas:
bcryptjs: v2.4.3 - Cifrado de la contraseña.
body-parser: v1.19.0 - Parsear el cuerpo de la petición y respuesta.
cors: v2.8.5 - Permitir la comunicación con servicios fuera del servidor local.
dotenv: v8.2.0 - Uso de archivo para variables del sistema.
express: v4.17.1 - Servicio y comunicaciones mediante endPoints - REST.
express-validator: v6.6.1 - Validador de los elementos enviados en a los endPoints.
jsonwebtoken: v8.5.1 - Implementación seguridad a través de Tokens Web en formato JSON.
mysql2: v2.2.2 - Cliente para NodeJs para la comunicación con la base de dátos MySQL
sequelize: v6.3 - ORM que permite mapear los objetos y las peticiones a diferentes tipos de bases de Dátos.
Proyecto
El proyecto levanta un servidor REST comunicado con una base de dátos mysql, el cuál permite un sistema de gestión de usuarios, platos, favoritos, roles, pedidos, estados y metodos de pago.

Tablas:
La base de dátos cuenta con 8 tablas para su funcionamiento:

Descripcion_pedidos.
Estados.
Favoritos.
FormaDePagos.
Pedidos.
Platos.
Roles.
Usuarios.
Los archivos sql se encuentran en la carpeta SQL Files.

Requisitos
Para el correcto funcionamiento del servidor es necesario contar con:
    - NodeJS (se desarrolló con node v12.18.3).
    - MySQL (se desarrolló con MariaDB v10.3.23).
    - Nodemon (opcional).
Instalación
Para instalar las dependencias necesarias usamos, en la ruta del archivo package.json:

npm install
El proyecto incluye los modelos (carpeta modelos), las rutas (carpeta routes), la gestión de la comunicación con la base de dátos (archivo db.js), uso de variables de entorno DB_HOST, DB_SCHEMA, DB_USER, DB_PASS, SECRET_JWT, APP_PORT. Además de un archivo init.js que pobla las tablas:

Roles:
Adminsitrador.
Cliente.
Estados:
Nuevo.
Confirmado.
Preparando.
Enviando.
Entregado.
FormaDePagos:
Efectivo.
Tarjeta.
Las tablas son creadas automáticamente al momento de subir el servidor y sincronizarse con la base de datos.

Para iniciar el servidor, con nodemon:

npm run dev
Para iniciar el servidor, directamente:

node index.js

Token de prueba:
Administrador: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImFubnlqMjExIiwiZW1haWwiOiJhbm55Lmhlcm5hbmRlejIxMUBnbWFpbC5jb20iLCJyb2wiOjEsImlhdCI6MTYwMzQ2ODczMX0.1kvkWfZZpuSH_kUDzT2Ci6K9R7TsB6vfpsgpD08q0c0
Usuario: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlciI6IlNlcmdpb0JKIiwiZW1haWwiOiJzbmpiMDFAZ21haWwuY29tIiwicm9sIjoyLCJpYXQiOjE2MDM2NzEzNjF9.0wuzAzzVXoJ4kuu6yhF1HYSnNS-NciX6JbP3lo4d6Qk
