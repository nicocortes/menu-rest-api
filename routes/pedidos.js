const { Router } = require("express");
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

router.get(
	"/:id",
	[check("id", "No es un ID válido").isMongoId()],
	obtenerPedido
);

router.get("/user/:id", obtenerPedidosUser);

router.get("/", obtenerPedidos);

router.post("/", [validarJWT], crearPedido);

router.put(
	"/:id",
	[
		validarJWT,
		check("id", "El ID del Pedido es necesario").not().isEmpty(),
		validarCampos,
	],
	actualizarPedido
);

router.delete(
	"/:id",
	[validarJWT, check("id", "No es un ID válido").isMongoId(), validarCampos],
	borrarPedido
);

module.exports = router;
