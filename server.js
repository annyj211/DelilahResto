let express= require("express"); //Invocar las librerias a usar
let Sequelize= require("sequelize");
let jwt= require("jsonwebtoken");
let server = express();
//const { error } = require("console");
//middelware
server.use (express.json ());
//server.use(cors());

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

let db = new Sequelize ( //db database o base de datos
    "mysql://root:220713@localhost:3306/delilahresto" //se creo la cadena de conexion
);

async function querySelector(query, selectQ = false, replacements = {}) {
    let typeQ;
    if (selectQ) {
        typeQ = db.QueryTypes.SELECT;
    } else {
        typeQ = undefined;
    }
    console.log(replacements)
    try {
        let consulta = await db.query(query, {
            type: typeQ,
            raw: true,
            replacements
        })
        return consulta;
    } catch (error) {
        console.log(error);
    }


}
//middelware para validar el logueo del usuario
function authenticateUser (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const checkToken = jwt.verify(token, 'annyj211');
        if (checkToken) {
            req.usuario = checkToken;
            return next();
        }
    } catch (err) {
        res.json({ error: 'Existe un error al validar usuario' });
    }
}

//Funcion para generar el token 
async function generateToken (user) {
    let data = {
        id: user.id,
        user: user.user,
        email: user.email,
        rol: user.rol
    };
    const vtoken = jwt.sign(data, 'anita211');
    return vtoken;
}

//middelware para validar que exista el token

async function verifyToken (req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization && authorization.split(' ')[1];
        const dataUser = await jwt.verify(token, 'anita211');
        if (dataUser) {
            req.dataUser = dataUser;
            console.log(dataUser);
            next();
        } else {
            res.status(401).json({ message: "Falta incluir el token en la cabecera" });
        }
    } catch (error) {
        next(error)
    }
}

//middelware para validar que exista el token
async function checkAdminOrId (req, res, next) {
    const { id, rol } = req.userData;
    let parametro = req.params.userId;
    const orderIdEqsIdUser = `SELECT * FROM order WHERE id=:parametro AND userId = :id`;
    let checker = await querySelector(orderIdEqsIdUser, true, { id, parametro });
    if (id == parametro || rol == '1' || checker[0] != undefined) {
        next();
    } else {
        res.status(400).json({ error: "El usuario no tiene privilegios!" })
    }
}
///Login////
//Funcion para verificar los datos insertados para el logue del usuario, se puede autenticar con correo o usuario
async function verifyUser (user, pass){
    //console.log(user.indexOf('@'));
    let query;
    if (user.indexOf('@') === -1) {
        query = `SELECT * FROM  user WHERE password=:pass AND username=:user`;
        console.log(query)
     } else if (user.indexOf('@') >= 0) {
         query = `SELECT *  FROM  user WHERE password= :pass AND email=:user`;
     }
    let resultado = await querySelector(query, true, { user, pass });
    
    return resultado;
}
//Funcion para verificar que los datos sean correctos y generar el token
async function login(req, res) {
    const { user, pass } = req.body;
    try {
        let logg = await verifyUser(user, pass);
        let valuesUser = logg[0];
        let result = JSON.stringify(logg);
        if (result === '[]') {
            res.status(404).json({ error: `Correo o contraseña incorrecta!` })
        } else {
            let objetoToken = {
                id: valuesUser.iduser,
                user: valuesUser.username,
                email: valuesUser.email,
                rol: valuesUser.roleid
            };
            console.log(objetoToken);
            console.log('LOGIN')
            let token = await generateToken(objetoToken);
            res.status(201).json({ token });
        }
    } catch (error) {
        next(error);
    }
}
// Endpoint para loguear un usuario
server.post('/users/signin', login);

//middelware para validar que sea un administrador
function validateAdmin (req, res, next){
    console.log(req.dataUser);
    const { rol } = req.dataUser;
    try {
        if (rol == 1) {
            next();
        } else {
            res.status(401).json({ error: 'No tiene permisos para realizar esta petición' });
        }
    } catch (error) {
        next(error)
    }

}

//middelware para validar que este completa la informacion del usuario antes de insertar 
function validateUser(req,res,next){
    let username= req.body.username;
    let fullname= req.body.fullname;
    let email= req.body.email;
    let phone= req.body.phone;
    let address= req.body.address;
    let password= req.body.password;
    let roleid= req.body.roleid;
    if(username && fullname && email && phone && address && password && roleid)
    {
        next();
    }
    else{
        res.status(400);
        res.json({message:"Por favor envie la informacion completa del usuario"})
    }
}
// Endpoint para Insertar un usuario
server.post("/users/",validateUser,(req,res,next)=>{
    let username= req.body.username;
    let fullname= req.body.fullname;
    let email= req.body.email;
    let phone= req.body.phone;
    let address= req.body.address;
    let password= req.body.password;
    let roleid= req.body.roleid;
        
    db.query("INSERT INTO delilahresto.user(username,fullname,email,phone,address,password,roleid) " +
              "values(:safeusername,:safefullname,:safeemail,:safephone,:safeaddress,:safepassword,:saferoleid)",
    {
        type: Sequelize.QueryTypes.INSERT,
        replacements: {
            safeusername:username,
            safefullname:fullname,
            safeemail:email,
            safephone:phone,
            safeaddress:address,
            safepassword:password,
            saferoleid:roleid
        } //Reemplazar los valores por los que vienen del body
    })
    .then((users)=>{
        //res.json(users)
        res.json({message:"Usuario creado correctamente"})
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});

//Endpoint para traer toda la informacion de la tabla usuario BD 
server.get("/users",verifyToken,validateAdmin,(req,res,next)=>{
    db.query('select * from user;', {type: Sequelize.QueryTypes.SELECT})
    .then((users)=>{
        res.json(users)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});
//Endpoint para traer la informacion de la tabla usuario por Username
server.get("/users/:username",verifyToken,validateAdmin,(req,res,next)=>{
    let user= req.params.username; //Traer el DNI del parametro que esta recibiendo 
    db.query('select u.username,u.fullname,u.email,u.phone from user as u where username=:usernameSeguro;',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {usernameSeguro:user} //Reemplazar el usernameSeguro por el username de la consulta 
    })
    .then((users)=>{
        res.json(users)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});
function validateEditUser (req, res, next){
    let username = req.body.username;
    let fullname= req.body.fullname;
    let email= req.body.email;
    let phone= req.body.phone;
    let address= req.body.address;
    let password= req.body.password;
    let roleid= req.body.roleid;
    if(username&&fullname&&email&&phone&&address&&password&&roleid){
        next();
    }
    else{
        res.status(400);
        res.json({message: "Por favor, ingrese todos los campos requeridos"})
    }
}
//Modificar informacion de un usuario por su Username 
server.put("/users/:username",verifyToken,validateAdmin,validateEditUser,(req,res,next)=>{
    let username= req.body.username; //Traer el Username del parametro que esta recibiendo
    let fullname= req.body.fullname;
    let email= req.body.email;
    let phone= req.body.phone;
    let address= req.body.address;
    let password= req.body.password;
    let roleid= req.body.roleid;
    
    db.query("update user SET fullname=:safefullname,email=:safeemail,phone=:safephone,address=:safeaddress,"+
            "password=:safepassword,roleid=:saferoleid where username=:safeusername;",
    {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: {
            safeusername:username,
            safefullname:fullname,
            safeemail:email,
            safephone:phone,
            safeaddress:address,
            safepassword:password,
            saferoleid:roleid
        } //Reemplazar todos los datos por los datos seguros de la consulta 
    })
    .then((users)=>{
        //res.json(users)
        res.json({message:"Usuario modificado correctamente"})
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
      
    })
});
//Eliminar informacion de un usuario por su username 
server.delete("/users/:username",verifyToken,validateAdmin,(req,res,next)=>{
    let username= req.params.username; //Traer el username del parametro que esta recibiendo

    db.query('delete from user where username=:safeusername;',
    {
        type: Sequelize.QueryTypes.delete,
        replacements: {
            safeusername:username,
    } //Reemplazar el safeusername por el username de la consulta 
    })
    .then((users)=>{
        //res.json(users)
        res.json({message:"Usuario eliminado correctamente"})
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
      
    })
});

//Endpoint para traer la informacion de la tabla Producto BD 
server.get("/products",(req,res,next)=>{
    db.query('select * from product;', {type: Sequelize.QueryTypes.SELECT})
    .then((users)=>{
        res.json(users)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});
//middelware para validar que la informacion del producto este completa antes de insertar 
function validateProduct(req,res,next){
    let name= req.body.name;
    let description= req.body.description;
    let price= req.body.price;
    let url= req.body.url;
    if(name && description && price && url)
    {
        next();
    }
    else{
        res.status(400);
        res.json({message:"Por favor envíe la información completa del producto"})
    }
}
//Endpoint para insertar la informacion en la tabla productos BD 
server.post("/products/",verifyToken,validateAdmin,validateProduct,(req,res,next)=>{
    let name= req.body.name;
    let description= req.body.description;
    let price= req.body.price;
    let url= req.body.url;
        
    db.query("INSERT INTO delilahresto.product(name,description,price,url) " +
              "values(:safename,:safedescription,:safeprice,:safeurl)",
    {
        type: Sequelize.QueryTypes.INSERT,
        replacements: {
            safename:name,
            safedescription:description,
            safeprice:price,
            safeurl:url
        } //Reemplazar los valores por los que vienen del body
    })
    .then((products)=>{
        //res.json(users)
        res.json({message:"Producto creado correctamente"})
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});
//Consultar informacion de un producto por ID 
server.get("/products/:idproduct",verifyToken,validateAdmin,(req,res,next)=>{
    let id= req.params.idproduct; //Traer el DNI del parametro que esta recibiendo 
    db.query('select p.name,p.description,p.price,p.url from product as p where idproduct=:idSeguro;',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {idSeguro:id} //Reemplazar el idSeguro por el ID de la consulta 
    })
    .then((products)=>{
        res.json(products)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});
//Modificar informacion de un producto por su ID 
server.put("/products/:idproduct",verifyToken,validateAdmin,validateProduct,(req,res,next)=>{
    let id= req.params.idproduct; //Traer el ID del parametro que esta recibiendo
    let name= req.body.name;
    let description= req.body.description;
    let price= req.body.price;
    let url= req.body.url; 

    db.query('update product SET name=:safeName, description=:safeDescription,price=:safePrice,url=:safeUrl where idproduct=:idSeguro;',
    {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: {
            idSeguro:id,
            safeName:name,
            safeDescription:description,
            safePrice:price,
            safeUrl:url
        } //Reemplazar todos los datos por los datos seguros de la consulta 
    })
    .then((products)=>{
        //res.json(products)
        res.json({message:"Producto modificado correctamente"})
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
      
    })
});
//Eliminar informacion de un producto por su ID 
server.delete("/products/:idproduct",verifyToken,validateAdmin,(req,res,next)=>{
    let id= req.params.idproduct; //Traer el ID del parametro que esta recibiendo

    db.query('delete from product where idproduct=:idSeguro;',
    {
        type: Sequelize.QueryTypes.delete,
        replacements: {
            idSeguro:id,
    } //Reemplazar el idSeguro por el ID de la consulta 
    })
    .then((products)=>{
        //res.json(products)
        res.json({message:"Producto eliminado correctamente"})
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
      
    })
});

//Middleware validacion datos completos Orden
function validateOrders (req, res, next){
    let id = req.body.iduser;
    let payment_method = req.body.idpayment;
    let detail = req.body.detail;
    if (id&&payment_method&&Array.isArray(detail)&&detail.length>0){
        next();
    }
    else{
        res.status(400);
        res.json({message:"No están completos los datos"})
    }
}

//Middleware detalle Orden

function validateProductsOrders (req, res, next){
    let detail = req.body.detail;
    detail.forEach(product => {
        let producto = product.idproduct;
        let nombre = product.name;
        let precio = product.price;
        let cantidad = product.quantity;
        if (producto&&nombre&&precio&&cantidad){
        }
        else {
            res.status(400);
            res.json({message:"La información de los productos de la orden es incompleta"})
        }
    })
    next();
}
// Endpoint para insertar ordenes
server.post("/orders", verifyToken,validateAdmin, validateOrders, validateProductsOrders, async(req, res) => {

    try{
        let idUsuario = req.body.iduser;
        let metodoPago = req.body.idpayment;
        let detail = req.body.detail;
        let descripcion = "";
        detail.forEach(product => {
            descripcion = descripcion + product.quantity+"x"+product.name+" ";
        })
        let data = await db.query ("INSERT INTO `delilahresto`.`orders` (`iduser`, `idpayment`, `description`) "+
        "VALUES (:userid, :paymentid, :desc); ",{
            type: Sequelize.QueryTypes.INSERT,
            replacements:{
                userid: idUsuario,
                paymentid: metodoPago,
                desc: descripcion,
            }
        })
        let idOrder = data[0];
        for (index = 0; index< detail.length ; index++) {  /// inserta detalle orden             
            let promiseOrder = await db.query("INSERT INTO `delilahresto`.`orderdetail` "+
                    "(`idorder`, `idproduct`, `quantity`) "+
                    "VALUES (:idor, :idp, :qty);",{
                        type: Sequelize.QueryTypes.INSERT,
                        replacements:{
                            idor: idOrder,
                            idp: detail[index].idproduct,
                            qty: detail[index].quantity
                        }
                    });
            console.log(promiseOrder);   
        } 
        res.status(201);                    
        res.json({message:"orden insertada correctamente"})       
    }
    catch (error){
        res.status(500)
        res.json({message:error})
    }
});
//Traer las ordenes por ID de la orden
server.get("/orders/:idorder",verifyToken,(req,res,next)=>{
    let id= req.params.idorder; //Traer el ID del parametro que esta recibiendo 
    db.query("SELECT s.name as Estado, DATE_FORMAT(o.datecreation, '%Y-%m-%d-%T') as FechaOrden, o.idorder as CodOrden, o.description as Descripcion, pm.name as FormaPago, "+
    '(SELECT SUM( p.price*od.quantity ) '+
        'FROM orderdetail AS od, product AS p '+
        'WHERE p.idproduct = od.idproduct and '+
        'od.idorder = o.idorder ) AS TotalPedido, '+
        'u.fullname as NombreCliente,'+
        'u.phone as Telefono, '+
        'u.address as Direccion '+
        'FROM orders AS o '+
        'INNER JOIN status AS s '+
            'ON o.idstatus = s.idstatus '+
        'INNER JOIN paymentmethod AS pm '+
            'ON o.idpayment = pm.idpaymentmethod '+
        'INNER JOIN user AS u '+
            'ON o.iduser = u.iduser '+
            'and o.idorder = :idSeguro ;',
        
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {idSeguro:id} //Reemplazar el idSeguro por el ID de la consulta 
    })
    .then((products)=>{
        res.json(products)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});
//Traer todas las ordenes 
server.get("/orders/",verifyToken,validateAdmin,(req,res,next)=>{
    
    db.query("SELECT s.name as Estado, DATE_FORMAT(o.datecreation, '%Y-%m-%d-%T') as FechaOrden, o.idorder as CodOrden, o.description as Descripcion, pm.name as FormaPago, "+
        '(SELECT SUM( p.price*od.quantity ) '+
            'FROM orderdetail AS od, product AS p '+
            'WHERE p.idproduct = od.idproduct and '+
            'od.idorder = o.idorder ) AS TotalPedido, '+
            'u.fullname as NombreCliente,'+
            'u.phone as Telefono, '+
            'u.address as Direccion '+
            'FROM orders AS o '+
            'INNER JOIN status AS s '+
                'ON o.idstatus = s.idstatus '+
            'INNER JOIN paymentmethod AS pm '+
                'ON o.idpayment = pm.idpaymentmethod '+
            'INNER JOIN user AS u '+
                'ON o.iduser = u.iduser',
        {
        type: Sequelize.QueryTypes.SELECT,
        
    })
    .then((products)=>{
        res.json(products)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});

//Middleware actualiza Order

function updateorder (req, res, next){
    let status_id = req.body.idstatus;
    let order_id = req.body.idorder;
    
    if (status_id&&order_id){
        next();
    }else {
        res.status(400);
        res.json({message:"No es posible modificar, la información de la orden esta incompleta"})
    }
}
//Modificar estado de la orden
server.put ("/orders",verifyToken,validateAdmin,updateorder,(req, res, next)=>{
   
    let status_id = req.body.idstatus;
    let order_id = req.body.idorder;
    db.query ("UPDATE `delilahresto`.`orders` SET `idstatus` = :safeidstatus WHERE (`idorder` = :safeorderid); ",
    {
        type: Sequelize.QueryTypes.UPDATE,
        replacements:{
            safeidstatus: status_id,
            safeorderid: order_id
        }
    })
    .then ((data)=>{
        res.status(200);
        res.json({message:"Estado de la orden modificado correctamente"})  
    })
    .catch ((error)=>{
        console.log(error);
        res.status(500);
        res.json ({message: error})
    })
});

//Eliminar una orden
server.delete ("/orders/:id",verifyToken,validateAdmin,(req, res, next)=>{
    let id = req.body.idorder;
    db.query ("DELETE from orders where idorder=:safeidorder; ",
                     
    {
        type: Sequelize.QueryTypes.DELETE,
        replacements:{
            safeidorder: id
        }
    })
    .then ((data)=>{
        res.status(200);
        res.json({message:"Se ha eliminado la orden correctamente"})  
    })
    .catch ((error)=>{
        console.log(error);
        res.status(500);
        res.json ({message: error})
    })
});

//Endpoint para ver los estados de orden disponibles
server.get ("/status",verifyToken,validateAdmin,(req, res, next)=>{
    db.query ("SELECT idstatus, name, description FROM status; ",
    {
        type: Sequelize.QueryTypes.SELECT,
    })
    .then ((data)=>{
        res.json(data);
    })
    .catch ((error)=>{
        console.log(error);
        res.status(500);
        res.json({message: error})
    })
})
// Ver los metodos de pago disponibles
server.get ("/methodpay",verifyToken,validateAdmin,(req, res, next)=>{
    db.query ("SELECT * FROM delilahresto.paymentmethod;", 
    {
        type: Sequelize.QueryTypes.SELECT,
    })
    .then ((data)=>{
        res.json(data);
    })
    .catch ((error)=>{
        console.log(error);
        res.status(500);
        res.json({message: error})
    })
})



//Codigo para servidor express y conexion a BD 
server.listen (3000, ()=>{
    console.log ("Ya estoy activo");

    db.authenticate () //esta invocacion de metodo promesa es la conexion a la base de datos
    .then (()=>{
    console.log ("Base de datos conectada")
    })
    .catch ((error)=>{
        console.log (error)
    })
});