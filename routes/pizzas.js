const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { pizzaExiste, idExiste } = require("../helpers/db-validatos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const router = Router();
const {
	pizzasGet,
	pizzaGet,
	pizzasPost,
	pizzasPut,
	pizzasDelete,
} = require("../controllers/pizzas");

//GET pizzas
router.get("/", pizzasGet);

router.get(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(pizzaExiste),
		validarCampos,
	],
	pizzaGet
);

//POST pizzas
router.post(
	"/",
	[
		check("nombre", "El Nombre es obligatorio").not().isEmpty().trim(),
		check("nombre").custom(pizzaExiste),
		check("precio", "El precio es obligatorio").not().isEmpty(),
		check("detalle", "El detalle es obligatorio").not().isEmpty(),
		check("categoria", "No es una categoria válida").isIn(["Normal", "Light"]),
		validarCampos,
	],
	pizzasPost
);

//PUT pizzas
router.put(
	"/:id",
	[
		check("nombre").custom(pizzaExiste),
		check("categoria", "No es una categoria válida").isIn(["Normal", "Light"]),
		validarCampos,
	],

	pizzasPut
);

//DELETE pizzas
router.delete(
	"/:id",
	[
		validarCampos,
		esAdminRole,
		validarJWT,
		check("id", "No es un Id valido").isMongoId(),
		check("id").custom(idExiste),
	],
	pizzasDelete
);

module.exports = router;
