const { response } = require("express");
const Pedido = require("../models/pedido");
const pizza = require("../models/pizza");

// const obtenerPedido = async (req, res = response) => {

// }

const crearPedido = async (req, res = response) => {
	const { estado, usuario, ...body } = req.body;

	// const productoDB = await Producto.findOne({
	// 	nombre: body.nombre.toUpperCase(),
	// });

	// if (productoDB) {
	// 	return res.status(400).json({
	// 		msg: `El producto ${productoDB.nombre} ya existe`,
	// 	});
	// }

	const data = {
		...body,
		// nombre: body.nombre.toUpperCase(),
		usuario: req.usuario._id,
	};

	const pedido = new Pedido(data);

	//Guardar DB

	await pedido.save();

	res.status(201).json({
		msg: "Pedido exitoso",
		pedido,
	});
};

module.exports = { crearPedido };
