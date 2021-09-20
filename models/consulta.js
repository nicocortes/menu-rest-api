const { Schema, model } = require("mongoose");

const ConsultaSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},

	email: {
		type: String,
		required: [true, "El email es obligatorio"],
	},

	mensaje: {
		type: String,
		required: [true, "El mensaje es obligatorio"],
	},

	asunto: {
		type: String,
	},

	telefono: {
		type: String,
	},
});

module.exports = model("Consulta", ConsultaSchema);
