const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.usuariosPath = "/api/usuarios";
		this.pizzasPath = "/api/pizzas";
		this.authPath = "/api/auth";
		this.pedidoPath = "/api/pedidos";
		this.consultaPath = "/api/consulta";

		this.conectarDB();

		this.middlewares();

		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(express.static("public"));

		this.app.use(cors());

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	routes() {
		this.app.use(this.authPath, require("../routes/auth"));
		this.app.use(this.usuariosPath, require("../routes/usuarios"));
		this.app.use(this.pizzasPath, require("../routes/pizzas"));
		this.app.use(this.pedidoPath, require("../routes/pedidos"));
		this.app.use(this.consultaPath, require("../routes/consulta"));
	}

	listen() {
		this.app.listen(process.env.PORT, () => {
			console.log("Server onLine");
		});
	}
}

module.exports = Server;
