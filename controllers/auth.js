const{response,request}=require("express")
const Usuario=require("../models/usuario")
const bcryptjs=require("bcryptjs")
const {generarJWT}=require("../helpers/generar-jwt")


const login=async(req=request,res=response)=>{
    const{email,password}=req.body
    
try{


}catch(error){}

try{

    const usuario=await Usuario.findOne({email})
    if(!usuario){
        return res.status(400).json({
            msg: "Usuario o contraseña incorrectos"
        })
    }

if(!usuario.estado){
    return res.status(400).json({
        msg:"Usuario o contraseña incorrectos - estado: false",
    })

}

const validPassword=bcryptjs.compareSync(password,usuario.password)
if(!validPassword){
    return res.status(400).json({
        msg:"Usuario o contraseña incorrectos"
    })
}
const token= await generarJWT(usuario._id)
res.json({
    msg:"Login OK",
    usuario,
    token,
})

} catch (error){
    console.log(error)
    return res.status(500).json({
        msg:"Hablar con el Admin",
    }) 
}

}
module.exports={
    login,

}