const{Router}=require("express")
const{check}=require("express-validator")

const{existeProducto}=require("../helpers/db-validators")
const{existeCategoria}=require("../helpers/db-validators")
const{validarCampos}=require("../middlewares/validar-campos")
const{validarJWT}=require("../middlewares/validar-jwt")
const{esAdminRole}=require("../middlewares/validar-rol")


const
{obtenerProductos,
obtenerProducto,
crearProductos,
actualizarProducto,
borrarProducto,
}=require("../controllers/productos")


const router= Router();

router.get("/",obtenerProductos);

router.get("/:id",
[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
],
obtenerProducto
)


router.post("/",[
    validarJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("categoria","No es un ID valido").isMongoId(),
    check("categoria").custom(existeCategoria),
validarCampos,
],
crearProductos

)

router.put("/:id",
[
    validarJWT,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,


],
actualizarProducto,

)

router.delete("/id",
[
    validarJWT,
    esAdminRole,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,






],
borrarProducto
);

module.exports=router




