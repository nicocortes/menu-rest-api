const { request, response } = require("express");
const Consulta = require("../models/consulta");

const consultaPost = async (req = request, res = response) => {
	const { nombre, email, mensaje, asunto, telefono } = req.body;
	const consulta = new Consulta({ nombre, email, mensaje, asunto, telefono });
	await consulta.save();

	res.json({
		msg: "Consulta creada con éxito",
		consulta,
	});
};

module.exports = {
	consultaPost,
};
