const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		const usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(400).json({
				msg: "Usuario o Contraseña Incorrectos",
			});
		}

		if (!usuario.estado) {
			return res.status(400).json({
				msg: "Usuario o Contraseña Incorrectos",
			});
		}

		const validPassword = bcrypt.compareSync(password, usuario.password);

		if (!validPassword) {
			return res.status(400).json({
				msg: "Usuario o Contraseña Incorrectos",
			});
		}

		const token = await generarJWT(usuario._id);

		res.json({
			msg: "Login OK",
			usuario,
			token,
		});
	} catch (error) {
		res.status(500).json({
			msg: "Hablar con el Admin",
		});
	}
};

module.exports = {
	login,
};
