const{request,response}=require("express")
const Usuario=require("../models/usuario")
const bcryptjs= require("bcryptjs")

const usuariosGet=async(req=request,res=response)=>{

    // console.log(req.query)
let(limite=10,desde=0)=req.query
limite=Number(limite)
desde=Number(desde)

const usuarios= await Usuario.find({estado:true}).limit(limit).skip(desde)
const total= await Usuario.countDocuments({estado:true})

res.json({Total: total,
    usuarios})


}

const usuariosPost=async (req=request,res=response)=>{


    const {nombre,email,password, rol}=req.body

    const usuario=new Usuario({nombre,email,password, rol})

    const salt=bcryptjs.genSaltSync()
    usuario.password=bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({

      msg:"Usuario creado correctamente",
      usuario

    })


}


const usuariosPut= async (req=request,res=response)=>{
    
const id=req.params.id;
const {_id,email,google,password,...resto}=req.body

if(password){
    const salt=bcryptjs.genSaltSync();
    resto.password=bcryptjs.hashSync(password, salt)
}

const usuario=await Usuario.findByIdAndUpdate(id,resto,{new:true})


    res.json({

        msg: "PUT usuarios",
       usuario,
    }) 


}

const usuariosDelete=async(req=request,res=response)=>{
    const id= req.params.id
    //para borrar
    // const usuario= await Usuario.findByIdAndDelete(id)

    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({

        msg: "delete usuarios",
        usuario,
    })


}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}