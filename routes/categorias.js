const{Router}=require("express")
const{check}= require("express-validator")

const{existeCategoria}= require("../helpers/db-validators")

const{validarCampos}= require("../middlewares/validar-campos")
const{validarJWT}= require("../middlewares/validar-jwt")
const{esAdminRole}= require("../middlewares/validar-rol")


const{
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
}= require("../controllers/categorias")

const router=Router();

router.get("/", obtenerCategorias);
router.get(
    "/:id",
    [
check("id","No es un ID valido").isMongoId(),
check("id").custom(existeCategoria),
validarCampos,
],
    obtenerCategoria
)

router.post("/",
[
validarJWT,
esAdminRole,
check("nombre","El nombre es obligatorio").not().isEmpty(),
validarCampos,

],
crearCategorias
);

router.put("/",
[
validarJWT,
check("id","No es un ID valido").isMongoId(),
check("id)").custom(existeCategoria),
validarCampos,

],
actualizarCategoria

)

router.delete("/:id",

[
validarJWT,
esAdminRole,
check("id","No es un ID valido").isMongoId(),
check("id").custom(existeCategoria),
validarCampos,

],
borrarCategoria

);

module.exports=router