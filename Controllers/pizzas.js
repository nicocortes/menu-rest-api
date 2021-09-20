const {request, response} = require ('express');
const Pizza = require('../models/pizza')


//GET PIZZAS
const pizzasGet = async (req = request, res= response) =>{
    let {limite = 5, desde=0} = req.query

    limite = Number(limite)
    desde = Number(desde)

    if (isNaN(limite)) {
        limite = 5
    }
    if (isNaN(desde)) {
        desde = 0
    }

    const [total, pizzas] = await Promise.all([
        Pizza.countDocuments({ estado: true }),
        Pizza.find({ estado: true }).skip(desde).limit(limite).populate("categoria", "nombre")
    ])



        
        res.json({
            msg: "GET pizzas",
            Total: total,
            pizzas,
            
            
            
        });
      
      }

 //GET PIZZA  
 
 const pizzaGet = async (req = request, res = response) => {
	const { id } = req.params;

	const pizza = await Pizza.findById(id)
		// .populate("usuario", "nombre email")
		.populate("categoria", "nombre");

	res.json({
		pizza,
	});
};

      
//POST
const pizzasPost = async (req = request, res= response) =>{

    const {nombre, precio, detalle,categoria, img} =req.body;
    const pizza = new Pizza({nombre, precio,detalle, categoria, img})
    await pizza.save()

        
    res.json({
        msg: "pizza creada",
        pizza
        
    });
  
  }

  
//PUT
const pizzasPut = async (req = request, res= response) =>{

    const id = req.params.id;
    const resto = req.body;



    const pizza = await Pizza.findByIdAndUpdate(id,resto, {new:true});

        
    res.json({
        msg: "Pizza Actualizada",
        pizza
    });
  
  }

  
//DELETE
const pizzasDelete = async (req = request, res= response) =>{

    const  id  = req.params.id

    //Para borrar completamente
    // const usuario = await Usuario.findOneAndDelete(id);

    //Para solo cambiar el estado,

    const pizza = await Pizza.findByIdAndUpdate(id, {estado:false});
        
    res.json({
        msg: "Pizza Eliminada",
        pizza
    });
  
  }

  module.exports = {
      pizzasGet,
      pizzaGet,
      pizzasPost,
      pizzasPut,
      pizzasDelete

  }