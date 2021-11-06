const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, idExiste } = require("../helpers/db-validatos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const router = Router();
const {
	usuariosGet,
	usuarioGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);

router.get(
	"/:id",
	[check("id", "No es un ID válido").isMongoId(), validarCampos],
	usuarioGet
);

router.post(
	"/",
	[
		check("nombre", "El Nombre es obligatorio").not().isEmpty(),
		check("password", "Debe tener una contraseña").not().isEmpty().trim(),
		check("password", "El Password debe tener 5 caracteres mínimo").isLength({
			min: 6,
		}),
		check("email", "No es un correo válido").isEmail(),
		check("email").custom(emailExiste),
		validarCampos,
	],

	usuariosPost
);

router.put(
	"/:id",
	[check("id", "No es un Id valido").isMongoId(), validarCampos],
	usuariosPut
);

router.delete(
	"/:id",
	[
		validarCampos,
		validarJWT,
		esAdminRole,
		check("id", "No es un Id valido").isMongoId(),
		check("id").custom(idExiste),
	],

	usuariosDelete
);

module.exports = router;
