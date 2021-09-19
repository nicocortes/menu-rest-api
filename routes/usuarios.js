const {Router} = require ('express')
const {check} = require ('express-validator')
const {validarCampos} = require("../middlewares/validar-campos")
const {emailExiste, idExiste} = require("../helpers/db-validatos")
const {validarJWT} = require("../middlewares/validar-jwt")
const{esAdminRole} = require("../middlewares/validar-rol")




const router = Router();
const {

  usuariosGet,
  usuarioGetId,
  usuariosPost,
  usuariosPut,
  usuariosDelete,

}= require('../controllers/usuarios')



//GET usuarios
router.get("/", usuariosGet);

//GET usuario
router.get(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		// validarCampos,
	],
	usuarioGetId
);


//POST usuarios
router.post('/',
[check("nombre", "El Nombre es obligatorio").not().isEmpty(),
check("password", "Debe tener una contraaseña").not().isEmpty().trim(),
check("password", "El Password debe tener 5 caracteres mínimo").isLength({min:6}),
check("email", "No es un correo válido").isEmail(),
check("email").custom(emailExiste),
check("rol", "No es un rol válido").isIn(["ADMIN_ROLE","USER_ROLE"]),
validarCampos

],

usuariosPost);

//PUT usuarios
router.put('/:id',
[check("id", "No es un Id valido").isMongoId(),
// check("id").custom(idExiste),
validarCampos],
usuariosPut);

//DELETE usuarios
router.delete("/:id",[
  validarCampos,
  validarJWT,
  esAdminRole,
  check("id", "No es un Id valido").isMongoId(),
  check("id").custom(idExiste),
  
 ],

usuariosDelete);



module.exports = router




