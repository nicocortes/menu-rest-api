const { Router } = require("express");
//importo para hacer validaciones
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
	crearPedido,
	obtenerPedidos,
	obtenerPedido,
	actualizarPedido,
	borrarPedido,
	obtenerPedidosUser,
} = require("../controllers/pedidos");

const router = Router();

//Obtener los pedido por id - publico

router.get(
	"/:id",
	[check("id", "No es un ID válido").isMongoId()],
	obtenerPedido
);

//Get pedidos por id de usuario
router.get(
	"/user/:id",
	// [validarJWT, check("id", "No es un ID válido").isMongoId()],
	obtenerPedidosUser
);

//Obtener todos los pedidos - publico
router.get("/", obtenerPedidos);

//crear un pedido
router.post("/", [validarJWT], crearPedido);

//actualizar pedido por id privado
router.put(
	"/:id",
	[
		validarJWT,
		check("id", "El ID del Pedido es necesario").not().isEmpty(),
		//check('id','El ID debe de ser válido').isMongoId(),
		validarCampos,
	],
	actualizarPedido
);

//Borra un Pedido (Ocurre cuando cancela el Cliente candela el Pedido, deja un comentario en la propiedad Nota)
//borrar categoria privado - admin
router.delete(
	"/:id",
	[
		validarJWT,
		//esAdminRole,
		check("id", "No es un ID válido").isMongoId(),
		//check("id").custom(existePedido),
		validarCampos,
	],
	borrarPedido
);

module.exports = router;
