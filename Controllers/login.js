const {request, response} = require ('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/generar-jwt');

const login = async (req= request, res=response)=> {
const {email,password} = req.body;

try{

// verificar email
const usuario = await Usuario.findOne({email});



if (!usuario){
    return res.status(400).json({
            msg: "Usuario o Contraseña Incorrectos"
        });

}

//usuario activo?

if (!usuario.estado){
    return res.status(400).json({
            msg: "Usuario o Contraseña Incorrectos"
        });

}

//Verificar Contraseña

const validPassword = bcrypt.compareSync(password, usuario.password);

if (!validPassword){
    return res.status(400).json({
            msg: "Usuario o Contraseña Incorrectos"
        });

}

//genero token

const token = await generarJWT (usuario._id)

//const token = "Holamundo1234"



res.json({
 msg:"Login OK",
 usuario,
 token,

})

}catch (error){

    console.log(error)
    res.status(500).json({
        msg:"Hablar con el Admin",

    });

}

};

module.exports ={
    login,
}






