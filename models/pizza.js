const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
		unique: true,
	},

	estado: {
		type: Boolean,
		default: true,
	},

	precio: {
		type: Number,
		required: [true, "El precio es obligatorio"],
	},

	detalle: {
		type: String,
		required: [true, "El detalle es obligatorio"],
	},

	categoria: {
		type: String,
		required: [true, "Categoria es obligatorio"],
		enum: ["CLASICA", "SIN TAC", "ESPECIALIDAD DE LA CASA", "A LA PIEDRA"],
	},
	publicado: {
		type: Boolean,
		default: true,
	},
	img: {
		type: String,
	},
});

module.exports = model("Pizza", PizzaSchema);
