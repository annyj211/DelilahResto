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
### Algunos datos importantes de la Base de datos:
- Roles:
  - Administrador.
  - Cliente.
- Estados:
    - Nuevo.
    - Confirmado.
    - Preparando.
    - Enviando.
    - Entregado.
    - Cancelado.
- FormaDePagos:
    - Efectivo.
    - Tarjeta Debito.
    - Tarjeta Credito.
    - Bonos Sodexo.

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

- Usuario http://localhost:3000/users/
- Login http://localhost:3000/users/signin
- Productos http://localhost:3000/products/
- Orders admin http://localhost:3000/methodpay
- Ordenes usuarios http://localhost:3000/orders/2
- Estados http://localhost:3000/status/
- Metodos de pago http://localhost:3000/methodpay

### Usuarios
#### Crear un usuario

###### Metodo:
```
###### POST
```
###### URL
```
http://localhost:3000/users/
```
###### Estructura del Body:

```
{
        "username":"Prueba15",
        "fullname":"Usuario de prueba 15",
        "email":"prueba15@gmail.com",
        "phone":"3168998765",
        "address":"Calle 3 con 4",
        "password":"654321",
        "roleid":"2"
}
```
#### Login
El login es uno de los principales endpoints. El login permite obtener el json web token (JWT) el cual se debe usar en los demas endpoints.
Se puede usar en el user el correo o el nombre de usuario para el logueo.
###### Metodo:
```
###### POST
```
###### URL
```
http://localhost:3000/users/signin
```
###### Estructura del Body:

```
{
        "user":"anny.hernandez211@gmail.com",
        "pass":"12345"
}
```
OR
```
{
        "user":"SergioBJ",
        "pass":"56789"
}
```
#### Modificar un usuario por su username
Para modificar un usuario se debe tener un JWT de admin valido.
##### Metodo:
```
PUT
```

##### URL
```
http://localhost:3000/users/Prueba5
```
##### Estructura del Body:

```
{
        "username":"Prueba5",
        "fullname":"Usuario de prueba editado 5",
        "email":"pruebaditado5@gmail.com",
        "phone":"3168998789",
        "address":"Calle 5 con 5 editado",
        "password":"654321",
        "roleid":"2"
}
```
#### Ver todos los usuarios registrados
Para visualizar todos los usuarios se debe tener un JWT de admin valido.
##### Metodo:
```
GET
```
##### URL
```
http://localhost:3000/users/
```
#### Eliminar usuario por Username
Para eliminar algun usuario se debe tener un JWT de admin valido.

##### Metodo:
```
DELETE
```
##### URL
Prueba6 indicar el username de el usuario que se desea eliminar.
```
http://localhost:3000/users/Prueba6
```
#### Ver datos de usuario por username
Para visualizar datos de un usuario por username se debe tener un JWT de admin valido.

##### Metodo:
```
GET
```
##### URL
SergioBJ indicar el username a verificar.
```
http://localhost:3000/users/SergioBJ
```
### Productos
#### Crear un producto
Para crear un producto se debe enviar la estructura del body.
###### Metodo:
```
 POST
```
###### URL
```
http://localhost:3000/products/
```
###### Estructura del Body:
La informacion que debe enviarse es el nombre del producto, la descripcion,su precio y la URL de la imagen que representa el producto.
```
{
        "name":"prueba sencilla",
        "description":"Hamburguesa sencilla con carne anchera, queso, tomate, cebolla, lechuga y salsas",
        "price":"10000",
        "url":"https://www.google.de/url?sa=i&url=https%3A%2F%2Fwww.hogar.mapfre.es%2Fcocina%2Frecetas%2Fcarnes%2Fhamburguesa-sencilla%2F&psig=AOvVaw2Tm85Y8BsVSeKRtmBwWqyl&ust=1600744284111000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDt_aaj-esCFQAAAAAdAAAAABAS"
}
```  

#### Modificar un producto por su ID
Para eliminar algun usuario se debe tener un JWT de admin valido.
##### Metodo:
```
PUT
```
##### URL
3 es el id del producto que se desea modificar.
```
http://localhost:3000/products/3
```
##### Estructura del Body:

```
{
        "name":"Hamburguesa sencilla",
        "description":"Hamburguesa sencilla con carne ranchera, queso, tomate, cebolla, lechuga y salsas",
        "price": "9800"
        
}
```
#### Ver todos los productos
Es posible visualizar todos los productos si es un administrador o un cliente.
##### Metodo:
```
GET
```
##### URL
```
http://localhost:3000/products/
```
#### Eliminar un producto por su ID
Solo los administradores pueden eliminar prodcutos.

##### Metodo:
```
DELETE
```
##### URL
4 es el indentificador del producto que se quiere eliminar.
```
http://localhost:3000/products/4
```
#### Ver informacion de un prodcuto por su ID
Para visualizar la informacion es necesario estar logueado y tener un JWT valido.

##### Metodo:
```
GET
```
##### URL
3 indica el ID del producto que se desea consultar.
```
http://localhost:3000/products/3
```

### Ordenes

#### Crear una orden
Para crear una orden se debe enviar la informacion en el body
###### Metodo:
```
 POST
```
###### URL
```
http://localhost:3000/orders/
```
###### Estructura del Body:
Se debe enviar los id del usuario, medio de pago y en el detalle de la orden se debe enviar la informacion de los productos asociados a la orden.
```
{
    "iduser":"2",
    "idpayment":"2",
    "detail":
    [
        {
            "idproduct":"3", 
            "name":"Hamburguesa Sencilla",
            "price":"7000", 
            "quantity":"2"
        },
        {
            "idproduct":"4", 
            "name":"Sandwich cubano",
            "price":"12000", 
            "quantity":"1"
        }
    ]
}
```  
#### Modificar el estado de la orden 
Solo es posible modificar el estado de la orden si el JWT es de un administrador.
##### Metodo:
```
PUT
```
##### URL
```
http://localhost:3000/orders/
```
##### Estructura del Body:

```
{
        "idorder":"1",
        "idstatus":"3"
}
```
#### Ver todas las ordenes
Solo es posible ver todas las ordenes si el JWT es de un administrador.
##### Metodo:
```
GET
```
##### URL
```
http://localhost:3000/orders/
```
#### Delete Order by ID
Solo un administrador puede eliminar las ordenes.

##### Metodo:
```
DELETE
```
##### URL
8 inidica el Id de la orden que se desea eliminar
```
http://localhost:3000/orders/8/
```
#### Ver informacion de la orden por ID
Pder visualizar la inforamacion de la orden por numero de ID.

##### Metodo:
```
GET
```
##### URL
2 es el indicador del ID de la orden que se desea visualizar.
```
http://localhost:3000/orders/2
```

#### Ver todos los estados que puede tener una orden 
Consultar todos los estados que puede llegar a tener una orden

##### Metodo:
```
GET
```
##### URL
```
http://localhost:3000/status/
```
#### Ver los metodos de pagos existentes.
Consultar todos los metodos de pagos existentes

##### Metodo:
```
GET
```
##### URL
```
http://localhost:3000/methodpay
```
## Postman

En la ruta Postman se encuentra la colección de peticiones para consumir los servicios del proyecto, hay 4 carpetas Products, Users, Orders, Others; en cada carpeta hay request correspondientes para realizar las pruebas. A continuacion dejo 2 token que son posibles usar.
```
Token de prueba:
-Administrador: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImFubnlqMjExIiwiZW1haWwiOiJhbm55Lmhlcm5hbmRlejIxMUBnbWFpbC5jb20iLCJyb2wiOjEsImlhdCI6MTYwMzQ2ODczMX0.1kvkWfZZpuSH_kUDzT2Ci6K9R7TsB6vfpsgpD08q0c0
-Usuario: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlciI6IlNlcmdpb0JKIiwiZW1haWwiOiJzbmpiMDFAZ21haWwuY29tIiwicm9sIjoyLCJpYXQiOjE2MDM2NzEzNjF9.0wuzAzzVXoJ4kuu6yhF1HYSnNS-NciX6JbP3lo4d6Qk
```
