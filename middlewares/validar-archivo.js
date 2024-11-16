const { response } = require("express");

const validarArchivoSubir = (req, res= response, next) => {
    //obtener usuario
    const { usuario } = req;
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos por subir'
        });        
    }

    //Validar configuración de medios
    if (!usuario.endpoint_media) {
        return res.status(400).json({
            ok: false,
            msg: `Falta configurar la url del servicio receptora de medios`
        })
    }

    //validar tamaños aceptados
    const maxSize = 5000000; //5Mb
    if (req.files.file.size > maxSize) {
        return res.status(400).json({
            ok: false,
            msg: `El archivo debe ser menor a ${maxSize / 1000000}Mb`
        })
    }



    next();
}

module.exports = {validarArchivoSubir};