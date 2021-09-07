const express = require("express");
const cors = require("cors");
//Importar conexion a BD
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    //Inicialicen cuando se levante el server
    this.app = express(); //Asigno a app todas las funcionalidades de Express
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.categoriasPath = "/api/categorias";
    this.productosPath = "/api/productos";
    //Conexion DB
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas
    this.routes();
  }
  //Funcion para conectar a base de datos
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    //Carpeta pública
    this.app.use(express.static("public"));
    //CORS
    this.app.use(cors());
    //Acceso al body - Leer y parsear
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.productosPath, require("../routes/productos"));
  }
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server on port", process.env.PORT);
    });
  }
}
module.exports = Server;