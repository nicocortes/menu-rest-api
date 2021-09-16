const { Schema, model } = require("mongoose");

const PedidoSchema = new Schema(
	{
		//solo un usuario registrado puede hacer pedidos
		usuario: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		items:[{			
			nombre:{
				type: String,
				required: true, 
			},
			cantidad:{
				type: Number,
				required: true,
			},
			precio:{
				type: Number,
				required: true,	
			}
		}],
		total: {
			type: Number,			
		},
		//para poder persistir el motivo por el cual se cancelo el pedido
		nota: {
			type: String,			
		},	
		//utilizado para baja lógica	
		estado: {
			type: Boolean,
			default: true,
			required: true,
		},
		//el Pedido nace con esta propiedad en false, significa que el Pedido todavia 
		//no se termino para despacharlo al Cliente
		realizado: {
			type: Boolean,
			default: false,
			required: true,
		},
		//Fecha en la que el usuario registrado confirmo el carrito de compras
		//y se convierte en Pedido (una comanda para la cocina)
		Fecha: {
			type: Date,
			default: Date.now
		},	
		
	},
	{ timestamps: true }
);

PedidoSchema.methods.toJSON = function () {
	const { __v, estado, ...data } = this.toObject();
  
	return data;
};

module.exports = model("Pedido", PedidoSchema);
