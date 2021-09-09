const { validationResult } = require('express-validator');

const validarCampos = (req,res,next)=>{

    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.json({errors: errores.array()});
    }

    next()


}

module.exports = {validarCampos};

    