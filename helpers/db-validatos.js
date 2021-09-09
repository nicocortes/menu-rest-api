const Usuario = require("../models/usuario")
const Pizza = require("../models/pizza")

const emailExiste = async (email = "")=>{
    const existeEmail = await Usuario.findOne({email})

    if (existeEmail){

        throw new Error(`El email ${email} ya se encuentra registrado`);

    }

};

const idExiste = async (id)=>{
    const existeUsuario = await Usuario.findOne(id)

    if (!existeUsuario){

        throw new Error(`El id ${id} ya existe`);

    }

};

const pizzaExiste = async (nombre)=>{
    const existePizza = await Pizza.findOne({nombre})

    if (existePizza){

        throw new Error(`La Pizza ${nombre} ya existe`);

    }

};








module.exports = {
    emailExiste,
    idExiste,
    pizzaExiste,
};
