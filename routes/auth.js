const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/login");

const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.post(
	"/login",
	[
		check("email", "No es un correo válido").isEmail(),
		check("password", "Debe tener una contraseña").not().isEmpty().trim(),
		validarCampos,
	],
	login
);

module.exports = router;
