const { Banco_codigos } = require("../models/instalations/loyalty/referidos");

const existeCodigoReferido = async (db, codigo) => {
    // console.log(codigo);
    // console.log(db.config);
    if (codigo != null) {
        const codigo_referido = await Banco_codigos(db).findOne({
            where: { codigo }
        })

        if (codigo_referido) {
            return {
                ok: true,
                data: codigo_referido
            };
        } else {
            return {
                ok: false,
                msg: `No se encontró código de referido ingresado`
            };
        }
    }
}

const crearReferido = async (db, data) => {
    console.log(data);
    // if (codigo_referido.cliente) {
    //     await Referidos(db).create({
    //         to: `P-${newProveedor.id}`,
    //         from: `C-${id}`
    //     })
    // } else {
    //     await Referidos(db).create({
    //         to: `P-${newProveedor.id}`,
    //         from: `P-${id}`
    //     })
    // }
    // return res.status(201).json({
    //     ok: true,
    //     data: newProveedor,
    //     msg: `${nombre_proveedor} creado`
    // });
}

module.exports = {
    existeCodigoReferido,
    crearReferido
}