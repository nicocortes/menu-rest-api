const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { consultaPost } = require("../controllers/consulta");

const router = Router();

//Contacto
router.post(
	"/",
	[validarCampos],

	consultaPost
);

module.exports = router;
