const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");

//GET
const usuariosGet = async (req = request, res = response) => {
	// let {limite, desde}=req.query;
	// limite = number(limite);
	// desde = number(desde);

	// usuarios = await Usuario.find({estado:true}).limit(limite).skip(desde)
	usuarios = await Usuario.find({ estado: true });

	res.json({
		usuarios,
	});
};

//POST
const usuariosPost = async (req = request, res= response) =>{

    const {nombre, email, password, domicilio, rol} = req.body;

    try {
        if(rol === null)
        {
            rol="USER_ROLE";
        }
        console.log(rol);
        const usuario = new Usuario({nombre, email, password, domicilio, rol})
    
        //encriptacion
        const salt = bcrypt.genSaltSync();
    
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();
        
        res.status(200).json({
		    msg: "Usuario creado con éxito.",
		    usuario,
	    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
  }

  
//PUT
const usuariosPut = async (req = request, res = response) => {
	const { id } = req.params;
	const { _id, rol, ...resto } = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		resto.password = bcrypt.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

	res.json({
		msg: "PUT usuarios",
		usuario,
	});
};

//DELETE
const usuariosDelete = async (req = request, res = response) => {
	const id = req.params.id;

	//Para borrar completamente
	// const usuario = await Usuario.findOneAndDelete(id);

	//Para solo cambiar el estado,

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json({
		msg: "DELETE usuario",
		usuario,
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
};
