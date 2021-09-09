const express = require('express')
const cors = require('express')
//importo conex a DB
const {dbConnection} = require('../database/config')

class Server {

    constructor(){
    //defino lo que quiero que se inicialice cuando levanate el server

    this.app = express()
    this.usuariosPath="/api/usuarios"
    this.pizzasPath="/api/pizzas"
    this.authPath="/api/auth"

    //comnexion
    this.conectarDB();

    //middlewares
    this.middlewares();

    //rutas
    this.routes();


    }

    //funcion para conectar la DB

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

       //Carpeta publica
       
       this.app.use(express.static("public"));

       //Cors
       this.app.use(cors());

       //Acceso al Body
       this.app.use(express.json());
       this.app.use(express.urlencoded({extended:true}));
       





    }

    routes(){
        this.app.use(this.authPath, require("../routes/auth"))
        this.app.use(this.usuariosPath, require("../routes/usuarios"))
        this.app.use(this.pizzasPath, require("../routes/pizzas"))
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log("Server onLine");
        });
        
    }

}

module.exports = Server