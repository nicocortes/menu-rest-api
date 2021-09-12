const { Schema, model } = require("mongoose");

const PedidoSchema = new Schema(
	{
		usuario: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},

		pizza: {
			type: Schema.Types.ObjectId,
			ref: "Pizza",
			required: true,
		},
		detalle: {
			type: String,
			required: true,
		},

		estado: {
			type: Boolean,
			default: true,
			required: true,
		},

		Fecha: {
			type: Date,
			// required: [true,"La Fecha no es valida"],
		},

		cantidad: {
			type: Number,
			default: true,
		},
	},
	{ timestamps: true }
);

// CategoriaSchema.methods.toJSON=function(){
//     const{__v,estado,...data}=this.toObject();
//     return data
// }

module.exports = model("Pedido", PedidoSchema);
