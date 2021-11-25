const { request, response } = require("express");
const Pizza = require("../models/pizza");

const pizzasGet = async (req, res = response) => {
	let { limite = 6, desde = 0 } = req.query;
	const { categoria } = req.params;

	let busqueda = {};

	if (categoria != "todo") {
		busqueda = { categoria: categoria, publicado: true };
	} else {
		busqueda = { publicado: true };
	}

	limite = Number(limite);
	desde = Number(desde);

	if (isNaN(limite)) {
		limite = 5;
	}
	if (isNaN(desde)) {
		desde = 0;
	}

	const [
		totalClasicas,
		totalSinTacc,
		totalEsp,
		totalPiedra,
		total,
		totalPublicados,
		totalxCat,
		pizzas,
		pizzasPublicadas,
	] = await Promise.all([
		Pizza.countDocuments({ categoria: "CLASICA", publicado: true }),
		Pizza.countDocuments({ categoria: "SIN TAC", publicado: true }),
		Pizza.countDocuments({
			categoria: "ESPECIALIDAD DE LA CASA",
			publicado: true,
		}),
		Pizza.countDocuments({ categoria: "A LA PIEDRA", publicado: true }),
		Pizza.countDocuments({ estado: true }),
		Pizza.countDocuments({ publicado: true }),
		Pizza.countDocuments(busqueda),
		Pizza.find({ estado: true })
			.skip(desde)
			.limit(limite)
			.populate("categoria", "nombre"),
		Pizza.find(busqueda)
			.skip(desde)
			.limit(limite)
			.populate("categoria", "nombre"),
	]);

	res.json({
		Total: total,
		publicados: totalPublicados,
		totalCategorias: {
			clasicas: totalClasicas,
			sinTacc: totalSinTacc,
			especialidad: totalEsp,
			aLaPiedra: totalPiedra,
		},
		totalxCat: totalxCat,
		pizzas,
		pizzasPublicadas,
	});
};

const pizzaGet = async (req, res = response) => {
	const { id } = req.params;

	const pizza = await Pizza.findById(id).populate("categoria", "nombre");

	res.json({
		pizza,
	});
};

const pizzasPost = async (req = request, res = response) => {
	const { nombre, precio, detalle, categoria, img } = req.body;
	const pizza = new Pizza({ nombre, precio, detalle, categoria, img });
	await pizza.save();

	res.json({
		msg: "Pizza creada",
		pizza,
	});
};

const pizzasPut = async (req = request, res = response) => {
	const { id } = req.params;
	const { _id, estado, ...resto } = req.body;
	const pizza = await Pizza.findByIdAndUpdate(id, resto, { new: true });

	res.json({
		msg: "Pizza actualizada",
		pizza,
	});
};

const pizzasDelete = async (req = request, res = response) => {
	const id = req.params.id;

	const pizza = await Pizza.findByIdAndUpdate(id, { estado: false });

	res.json({
		msg: "Pizza eliminada",
		pizza,
	});
};

module.exports = {
	pizzasGet,
	pizzaGet,
	pizzasPost,
	pizzasPut,
	pizzasDelete,
};
