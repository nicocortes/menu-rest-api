const {Schema, model} = require('mongoose')

const PizzaSchema = new Schema ({

    nombre: {
        type: String,
        require:[true, "El nombre es obligatorio"],
        unique: true

    },

    estado:{
        type: Boolean,
        default: true
        
    },

    precio:{
        type: Number,
        require:[true, "El precio es obligatorio"]

    },

    detalle:{
        type: String,
        require:[true, "El detalle es obligatorio"]

    },

    categoria:{
        type: String,
        require:[true, "Categoria es obligatorio"],
        enum: ["CLASICA", "SIN TAC","ESPECIALIDAD DE LA CASA", "A LA PIEDRA"]

    },

    img:{

        type:String
    },

    disponible:{
        type: Boolean,
        default: true
    }



    
})

module.exports= model("Pizza", PizzaSchema)