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

Bajar el archivo delilahresto.sql y ejecutarlo en el motor de base de datos MySQL Workbench. 
- La base de datos tiene 7 tablas para su funcionamiento:
   - Paymentmethod.
   - Product.
   - Role.
   - User.
   - Status.
   - Orders.
   - Orderdetail.
Algunos datos importantes de la Base de datos:
- Roles:
Adminsitrador.
Cliente.
- Estados:
Nuevo.
Confirmado.
Preparando.
Enviando.
Entregado.
Cancelado.
- FormaDePagos:
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
### Users
#### Create an user
To create an user you just need a body
###### Method:
```
###### POST
```
###### URL
```
127.0.0.1:3000/usuarios
```
###### Body structure:

```
{
    "user": "andres23f3",
    "name": "camilo valbuena4",
    "email": "camilo@gmail.com",
    "phone": "31934824010",
    "address": "DG 59 11 A 90",
    "password": "camilo1234"
}
```
#### Login
One of the main endpoints is the login. It allows you to obtain a json web token to implemen in the majority of the other endpoints. 
It will not work if you enter password, user or email incorrectly. In this case `user` property can be both "email" or "user" values.
###### Method:
```
###### POST
```
###### URL
```
127.0.0.1:3000/usuarios
```
###### Body structure:

```
{
    "user": "camilov",
    "password": "camilo1234"
}
```
OR
```
{
    "user": "milo@gmail.com",
    "password": "camilo1234"
}
```

#### Update user by ID
You need to provide a valid user ID and proper JWT to be able to update an user. Either if you are an admin or the user that is logged in you will be able to perform this operation.
##### Method
```
PUT
```

##### URL
```
127.0.0.1:3000/usuarios/1
```
##### Body structure:

```
{
    "user": "andres23f3",
    "name": "camilo valbuena4",
    "email": "milov@gmaile.com",
    "phone": "31934824010",
    "address": "DG 59 11 A 90",
    "password": "camilo1234"
}
```
#### Get all registered users
Token must be from an admin.
##### Method
```
GET
```
##### URL
```
127.0.0.1:3000/usuarios
```
#### Delete User by ID
Only an admin can delete an user

##### Method
```
DELETE
```
##### URL
1 indicates user ID value
```
127.0.0.1:3000/usuarios/1
```
#### Get User by ID
Only an admin or an logged user whose ID is equal to the id parameter used in the URL can perform this action.

##### Method
```
GET
```
##### URL
1 indicates user ID value
```
127.0.0.1:3000/usuarios/1
```

### Products
#### Create a product
To create a product you just need a body
###### Method:
```
 POST
```
###### URL
```
127.0.0.1:3000/productos
```
###### Body structure:
"cantidad" is just a representative value with no particular utility
```
{
    "nombreProducto": "BandejaPaisa",
    "precio": "315",
    "cantidad": "48"
}
```  

#### Update product by ID
You need to provide a proper JWT to be able to update an product. Only if you are an admin you will be able to perform this operation.
##### Method
```
PUT
```
##### URL
Number 1 indicate the value of product ID, you can use any value to get any other product
```
127.0.0.1:3000/productos/1
```
##### Body structure:

```
{
    "nombreProducto": "BandejaPaisa",
    "precio": "315",
    "cantidad": "8"
}
```
#### Get all products
If an admmin or an user are logged you can get all list of products
##### Method
```
GET
```
##### URL
```
127.0.0.1:3000/products
```
#### Delete Product by ID
Only an admin can delete a product

##### Method
```
DELETE
```
##### URL
1 indicates user ID value
```
127.0.0.1:3000/productos/1
```
#### Get Product by ID
Only a logged user can perform this action.

##### Method
```
GET
```
##### URL
1 indicates product ID value
```
127.0.0.1:3000/productos/1
```

### Orders

#### Create an Order
To create an order you just need a body
###### Method:
```
 POST
```
###### URL
```
127.0.0.1:3000/ordenes
```
###### Body structure:
"payment" can be any value, "products" is an array that has all products IDs selected in the order, and those IDs can be repeated, address is a string.
All this three values are required.
```
{
    "payment":"CASH",
    "products": [1,4,4,6,7,1],
    "address":"CALLE FALSA 123"
}
```  
#### Update order by ID
Only if you are an admin you will be able to perform this operation.
##### Method
```
PUT
```
##### URL
Number 1 indicates the value of order ID, you can use any value to get any other order
```
127.0.0.1:3000/ordenes/1
```
##### Body structure:

```
{
    "payment":"CASH",
    "products": [1,4,4,6],
    "address":"CALLE FALSA 123",
    "state" : "USADO"
}
```
#### Get all orders
If an admmin is logged in you can get all list of orders
##### Method
```
GET
```
##### URL
```
127.0.0.1:3000/ordenes
```
#### Delete Order by ID
Either an admin or user whose order ID corresponds with Id parameter in URL can perform this operation

##### Method
```
DELETE
```
##### URL
1 indicates order ID value
```
127.0.0.1:3000/ordenes/1
```
#### Get Order by ID
Either an admin or user whose order ID corresponds with Id parameter in URL can perform this operation

##### Method
```
GET
```
##### URL
1 indicates product ID value
```
127.0.0.1:3000/ordenes/1
```

#### Get Order by User
Either an admin or user whose order ID corresponds with Id parameter in URL can perform this operation

##### Method
```
GET
```
##### URL
1 indicates product ID value
```
127.0.0.1:3000/ordenes/usuarios/1
```
#### Get Products by Order ID
Either an admin or user whose order ID corresponds with Id parameter in URL can perform this operation

##### Method
```
GET
```
##### URL
1 indicates product ID value
```
127.0.0.1:3000/ordenes/1/productos
```

