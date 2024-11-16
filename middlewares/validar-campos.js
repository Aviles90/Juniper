const { request } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req = request, res, next ) => { // los middlewares tienen el tercer parametro next
    
    // console.log(req);

    const errors = validationResult(req) 
    if (!errors.isEmpty() ) { //si los errores estan vacios
        return res.status(400).json(errors);
    }

    /*
    try {
        const {body} = req
        console.log(body);
        let claves = Object.keys(body);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            // console.log(body[clave]);
            // console.log(body[clave].trim().length);
            if (!body[clave].trim().length > 0 ) {
                    console.log(`El campo ${clave} se recibió vacío`);
                    return res.status(400).json({
                        ok: false,
                        msg: `El campo ${clave} se recibió vacío`
                    });
                }
        }   
    } catch (error) {
        // console.log(error);
    }
    */

    next(); // si llega a este punto, continua con el siguiente middleware o el controlador
}

module.exports = {
    validarCampos
}