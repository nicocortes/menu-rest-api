const { Schema, model } = require("mongoose");

const PedidoSchema = new Schema(
	{
		usuario: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		pizzas: [
			{
				sabor: {
					type: String,
					required: true,
				},
				cantidad: {
					type: Number,
					required: true,
				},
				precio: {
					type: Number,
					required: true,
				},
				subtotal: {
					type: Number,
					required: true,
				},
			},
		],
		total: {
			type: Number,
		},
		costo: {
			type: Number,
		},
		nota: {
			type: String,
		},
		estado: {
			type: Boolean,
			default: true,
			required: true,
		},
		realizado: {
			type: Boolean,
			default: false,
			required: true,
		},
		Fecha: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

PedidoSchema.methods.toJSON = function () {
	const { __v, estado, ...data } = this.toObject();

	return data;
};

module.exports = model("Pedido", PedidoSchema);
