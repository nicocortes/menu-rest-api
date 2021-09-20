const mongoose = require('mongoose')

const dbConnection = async () =>{
    try {

        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Base de Datos online")
        
    } catch (error) {
        console.log(error)
        throw new Error('Error de conexion a al DB')
        
    }
}
module.exports={
    dbConnection
};