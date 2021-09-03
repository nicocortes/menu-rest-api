const express = require("express");

class Server {
	constructor() {
		this.app = express();

		this.middlewares();
	}

	middlewares() {
		this.app.use(express.static("public"));
	}

	listen() {
		this.app.listen(process.env.PORT, () => {
			console.log("Server on port", process.env.PORT);
		});
	}
}

module.exports = Server;
