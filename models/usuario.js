const {Schema, model}=require("mongoose")

const UsuarioSchema= new Schema({

nombre:{
    type:String,
    required:[true, "Campo obligatorio"],
},
email:{
    type: String,
    required:[true,"Campo obligatorio"],
    unique:true,
},
password:{
    type: String,
    required:[true,"Campo obligatorio"],
},
img:{
    type: String,

},
rol:{
type: String,
required:true,
enum:["USER_ROLE","ADMIN_ROLE"],
},
estado:{
    type: Boolean,
    default: true,

},

google:{
    type: Boolean,
    default:false,
}

})

UsuarioSchema.methods.toJSON=function(){
const{password,__v,_id,...usuario}=this.toObject()
usuario.uid=_id
return usuario

}

module.exports=model("Usuario",UsuarioSchema)