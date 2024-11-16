const { connApi } = require("../../database/connectionMySQL");
const { Proveedores } = require("../../models/instalations/suppliers/suppliers");

const permiso_newProveedorReferido = async (req, res, next) => {
    //Permite reconocer el código de referido para proveedores nuevos.
    //Siempre se va a permitir la inserción la diferencia es agregar o no el id del proveedor que refiere al nuevo
    const { host, base, user, pass, port } = req.usuario
    const {codigo_referido} = req.body;
    let permisosArray = [];

    req.permisos.forEach(element => {        
        permisosArray.push(element.permiso)
    });

    if (permisosArray.includes(1)) {
        if (codigo_referido == null || codigo_referido == undefined) {
            return res.status(400).json({
                ok: false,
                msg: `El código de referido es obligatorio`
            }); 
        }
        //validamos que exista el código de referido pertenezca a un proveedor existente
        const db = connApi(host, base, user, pass, port);
        const proveedoresModel = await Proveedores(db);

        const codigoExiste = await proveedoresModel.findOne({
            attributes: ['id'], //obtenemos el id para ligar el proveedor que refirió al nuevo
            where: {
                codigo_proveedor: codigo_referido
            }
        });

        if (codigoExiste) {
            req.body.referido = codigoExiste.id
        }else{
            return res.status(400).json({
                ok: false,
                msg: `No se encontró el código de referido`
            });
        }
        
    }

    next()        
}

module.exports = {
    permiso_newProveedorReferido
}