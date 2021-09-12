const { Router } = require("express");
const { check } = require("express-validator");
const { crearPedido } = require("../controllers/pedido");
const { pizzaExiste, idExiste } = require("../helpers/db-validatos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const router = Router();

// router.get("/", pedidoGet)

router.post("/", [validarJWT], crearPedido);

// router.put("/:id", pedidoPost);

// router.delete("/:id", pedidoDelete)

module.exports = router;
