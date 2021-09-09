
const {request, response}= require('express')
const jwt = require('jsonwebtoken')
const Usuario = require ('../models/usuario')

const validarJWT = async (req=request, res=response, next) =>{
    const token= req.header("x-token")

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try{

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)



        //leer usuario
        const usuario =  await Usuario.findById(uid)
        
        //El usuario existe?
        if (!usuario){
            return res.status(401).json({
                msg:"Token No Valido - El usuario No existe",
            });
        
            
        }

        //verificar si el uid es de un usuario activo
        if (!usuario.estado){
            return res.status(401).json({
                msg:"Token No Valido - El usuario Inactivo",
            });
        
            
        }

        req.usuario = usuario

        next()

    }catch(error){
        res.status(401).json({
            msg:"Token NO VALIDO",
        });

    }
};

module.exports = {validarJWT}


