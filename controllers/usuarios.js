const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");

const usuariosGet = async (req = request, res = response) => {
	let { limite = 6, desde = 0 } = req.query;

	limite = Number(limite);
	desde = Number(desde);

	if (isNaN(limite)) {
		limite = 5;
	}
	if (isNaN(desde)) {
		desde = 0;
	}

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments({ estado: true }),
		Usuario.find({ estado: true }).skip(desde).limit(limite),
	]);

	res.json({
		Total: total,
		usuarios,
	});
};

const usuarioGet = async (req, res = response) => {
	const { id } = req.params;
	const usuario = await Usuario.findById(id);
	res.json({
		usuario,
	});
};

const usuariosPost = async (req = request, res = response) => {
	const { nombre, email, password, domicilio, rol } = req.body;

	try {
		if (rol === null) {
			rol = "USER_ROLE";
		}
		const usuario = new Usuario({ nombre, email, password, domicilio, rol });

		const salt = bcrypt.genSaltSync();

		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		res.status(200).json({
			msg: "Usuario creado con �xito.",
			usuario,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Error inesperado...",
		});
	}
};

const usuariosPut = async (req = request, res = response) => {
	const { id } = req.params;
	const { _id, password, ...resto } = req.body;

	const usuario = await Usuario.findByIdAndUpdate(id, resto, {
		new: true,
	});

	res.json({
		msg: "PUT usuarios",
		usuario,
	});
};

const usuariosDelete = async (req = request, res = response) => {
	const id = req.params.id;
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json({
		msg: "DELETE usuario",
		usuario,
	});
};

module.exports = {
	usuariosGet,
	usuarioGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
};
