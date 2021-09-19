const {request, response} = require ('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');




//GET Usuarios
const usuariosGet = async (req = request, res= response) =>{

    let {limite=5, desde=0}=req.query;
    limite = Number(limite);
    desde = Number(desde);


    const usuarios = await Usuario.find({estado:true}).limit(limite).skip(desde)
    const total= await Usuario.countDocuments({estado:true})

//    const usuarios = await Usuario.find({estado:true})
        
        res.json({
            total,
            usuarios,
        });
      
      }

      //GET Usuario

      const usuarioGetId = async (req = request, res = response) => {
        const { id } = req.params;
    
        const usuario = await Usuario.findById(id)
            // .populate("usuario", "nombre email")
            .populate("nombre", "nombre email");
    
        res.json({
            usuario,
        });
    };


      
//POST
const usuariosPost = async (req = request, res= response) =>{


console.log(req.body)
    const {nombre, email, password, rol} =req.body;
    const usuario = new Usuario({nombre, email, password, rol})
    
//encriptacion

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save()

        
    res.json({
        msg: "Usuario creado",
        usuario
        
        
    });
  
  }

  
//PUT
const usuariosPut = async (req = request, res= response) =>{



    const id = req.params.id;
    const {nombre,password,rol, ...resto} = req.body;

    if (password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto, {new:true});
    

        
    res.json({
        msg: "Usuario Actualizado",
        usuario
    });
  
  }

  
//DELETE
const usuariosDelete = async (req = request, res= response) =>{

    const  id  = req.params.id

    //Para borrar completamente
    // const usuario = await Usuario.findOneAndDelete(id);

    //Para solo cambiar el estado,

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

        
    res.json({
        msg: "Usuario Borrado",
        usuario
    });
  
  }

  module.exports = {
      usuariosGet,
      usuarioGetId,
      usuariosPost,
      usuariosPut,
      usuariosDelete,

  }
