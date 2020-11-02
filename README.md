# Delilah Restó
Este es un proyecto desarrollado para el curso de Desarrollo Web FullStack de Acámica. Es un servicio de Backend - API REST con NodeJS y base de dátos MySQL, el cuál permite un sistema de gestión de usuarios, roles, productos, pedidos, estados y metodos de pago.

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

Bajar el archivo delilahresto.sql y ejecutarlo en el motor de base de datos MySQL Workbench. La base de datos tiene 8 tablas para su funcionamiento:
Paymentmethod.
Product.
Role.
User.
Status.
Orders.
Orderdetail.

-Roles:
Adminsitrador.
Cliente.
-Estados:
Nuevo.
Confirmado.
Preparando.
Enviando.
Entregado.
Cancelado.
-FormaDePagos:
Efectivo.
Tarjeta Debito.
Tarjeta Credito.
Bonos Sodexo.

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

## Ejecutar el proyecto

En el archivo server.js se debe configurar los parametros de conexión a la base de datos.

Al comprobar que ya estan instaladas todas las dependencias y que ya existe la base de datos ejecutar el siguiente comando para iniciar el servidor Express en el puerto 3000:

```
node server.js
```
       
## End points

- Login http://localhost:3000/users/signin
- Orders admin http://localhost:3000/methodpay
- Productos http://localhost:3000/products/
- Usuario http://localhost:3000/users/
- Ordenes usuarios http://localhost:3000/orders/2
- Estados http://localhost:3000/status/
- Metodos de pago http://localhost:3000/methodpay

## Postman

En la ruta Postman se encuentra la colección de peticiones para consumir los servicios del proyecto, hay 4 carpetas Products,Users,Orders,Others.


```
Token de prueba:
-Administrador: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImFubnlqMjExIiwiZW1haWwiOiJhbm55Lmhlcm5hbmRlejIxMUBnbWFpbC5jb20iLCJyb2wiOjEsImlhdCI6MTYwMzQ2ODczMX0.1kvkWfZZpuSH_kUDzT2Ci6K9R7TsB6vfpsgpD08q0c0
-Usuario: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlciI6IlNlcmdpb0JKIiwiZW1haWwiOiJzbmpiMDFAZ21haWwuY29tIiwicm9sIjoyLCJpYXQiOjE2MDM2NzEzNjF9.0wuzAzzVXoJ4kuu6yhF1HYSnNS-NciX6JbP3lo4d6Qk
```

