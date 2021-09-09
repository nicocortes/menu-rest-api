const {Router} = require ('express');
const { check } = require('express-validator');
const {login} = require("../Controllers/login");

const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//POST
router.post("/login",
[
check("email", "No es un correo válido").isEmail(),
check("password", "Debe tener una contraseña").not().isEmpty().trim(),
validarCampos

]
,login);

module.exports = router;
