const { response } = require("express");
const Pedido = require("../models/pedido");
const Pizza = require("../models/pizza");


//GET
const obtenerPedido = async (req, res = response) => {
	const { id } = req.params;

	const pedido = await Pedido.findById(id)
	  .populate("usuario", "nombre email")
	  //.populate("categoria", "nombre");
  
	res.json({
	  pedido,
	});
}

//GET
const obtenerPedidos  = async (req, res = response) => {
	let { limite = 5, desde = 0 } = req.query;

	limite = Number(limite);
  	desde = Number(desde);

  	if (isNaN(limite)) {
    	limite = 5;
  	}

  	if (isNaN(desde)) {
    	desde = 0;
  	}

	const [total, pedidos] = await Promise.all([
		Pedido.countDocuments({ estado: true }),
		Pedido.find({ estado: true })
		  .skip(desde)
		  .limit(limite)
		  .populate("usuario", "nombre email")
		  //.populate("categoria", "nombre"),
	]);

	res.json({
		Total: total,
		pedidos,
	});
}

//POST
const crearPedido = async (req, res = response) => {
	//desestructurar
	//colocamos las propiedades que deseamos no sean modificadas
	//por el usuario
	
	const { estado,realizado, ...body } = req.body;
	//console.log(req.body);
 	//res.send({ status: 'SUCCESS' });
	//falta verificar si el usuario autenticado
	//tiene un pedido en curso.

	//const pizza_elegida = await Pizza.findById(body.items[0].pizza).populate('pizza');

	  
	
	//express operator ...
	//en ...body se guardan el resto de las propiedades

	//creo el objeto "Data"
	//En el Request tengo el usuario que esta logueado
	//Toda la informacion que mande la servidor se almacena el Request
	//no importa el momento en el que lo hiciste (si fue cuando te logueaste)
	//esa informacion se mantiene
	const data = {
		...body,
		usuario: req.usuario._id,
	};
	
	
	//creamos una variable pedido que sera un instancia del modelo pedido
	//recibe como parametro el objeto "data"
	//luego se fijara en el modelo que las propiedades existan
	//en la variable "data" esta toda la informacion que quiero guardar
	const pedido = new Pedido(data);

	//Guardar pedido en DB
	await pedido.save();
	
	//la respuesta del servidor sera 201
	res.status(201).json({
		msg: "Pedido exitoso",
		pedido,
	});
	
};

//PUT
const actualizarPedido = async (req, res = response) => {
	const { id } = req.params;

	console.log('req.params.id', req.params.id);

	try{
		
		const pedido = await Pedido.findById( id );

        if ( !pedido ) {
            return res.status(404).json({
                msg: 'Pedido no encontrado por ID',
				pedido,
            });
        }else{
			if(pedido.realizado){
				return res.status(404).json({
					msg: 'El Pedido ya se encuentra Realizado, no se puede actualizar',
					pedido,
				});
			}
		}
		
		const { _id, estado, usuario, items, total, nota, ...resto } = req.body;
	
	
		/*
		if (resto.nombre) {
	  		resto.nombre = resto.nombre.toUpperCase();
		}
		*/
		resto.realizado = true;
		//resto.usuario = req.usuario._id;
  
		const pedidoActualizado = await Pedido.findByIdAndUpdate(id, resto, {
	  		new: true,
		});
  
		res.json({
	 		msg: "Pedido actualizado",
			pedidoActualizado,
		});
	}catch(error){
		console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error interno.'
        })
	}

	
  };

//DELETE

const borrarPedido = async (req, res = response) => {
	const { id } = req.params;
  
	const pedido = await Pedido.findByIdAndUpdate(
	  id,
	  { estado: false },
	  { new: true }
	);
  
	res.json({
	  msg: "Pedido eliminado",
	  pedido,
	});
  };

module.exports = { 
	crearPedido,
	obtenerPedido,
	obtenerPedidos,
	actualizarPedido,
	borrarPedido,
 }