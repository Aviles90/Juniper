const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { mainDB, connApi } = require('../database/connectionMySQL');
const { Usuarios } = require('../models/instalations/usuarios');
const { Proveedores } = require('../models/instalations/suppliers/suppliers');
const { Clientes } = require('../models/instalations/clientes');
// const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        // console.log(uid);
        // console.table(uid);
        let usuarioDB;

        if (uid.email) {
            // console.log('ENTRO USUARIO');

            //buscamos si se tratá de un usuario Master o SuperUsuario        
            usuarioDB = await Usuarios(mainDB).findOne({
                where: {
                    id: uid.id,
                    email: uid.email,
                    activo: true
                }
            });

            if (!usuarioDB) {
                //Si no es un Super usuario, buscamos si es un usuario de la empresa
                const db = connApi(uid.host, uid.base, uid.user, uid.pass, uid.port);
                usuarioDB = await Usuarios(db).findOne({
                    where: {
                        id: uid.id,
                        email: uid.email,
                        activo: true
                    }
                });
            }

        } else if(uid.email_cliente) {// En caso de no ser un super usuario o usuario, buscamos si es cliente
            //console.table(uid);
            // console.log('ENTRO CLIENTE');
            
            const db = connApi(uid.host, uid.base, uid.user, uid.pass, uid.port);
            usuarioDB = await Clientes(db).findOne({
                where: {
                    id: uid.id,
                    email_cliente: uid.email_cliente,
                    activo: true
                }
            });
        } else {// En caso de no ser un super usuario, usuario o cliente, buscamos si es proveedor
            // console.log('ENTRO PROVEEDOR');

            // console.table(uid);
            const db = connApi(uid.host, uid.base, uid.user, uid.pass, uid.port);
            usuarioDB = await Proveedores(db).findOne({
                where: {
                    id: uid.id,
                    email_proveedor: uid.email_proveedor,
                    activo: true
                }
            });
        }


        if (!usuarioDB) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }
        // verificar si el uid tiene estado true
        if (!usuarioDB.activo) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario inhabilitado'
            });
        }

        req.usuario = usuarioDB;
        // req.usuario = {
        //     id: usuarioDB.id,
        //     verificado: usuarioDB.verificado,
        //     id_grupo_proveedor: usuarioDB.id_grupo_proveedor,
        //     roleId: usuarioDB.roleId,
        //     activo: usuarioDB.activo,            
        //     deleteAt: usuarioDB.deleteAt,            
        // };
        req.usuario.db_id = uid.db_id;
        req.usuario.base = uid.base;
        req.usuario.empresa = uid.empresa;
        req.usuario.host = uid.host;
        req.usuario.user = uid.user;
        req.usuario.pass = uid.pass;
        req.usuario.port = uid.port;
        req.usuario.api_google_maps = uid.api_google_maps
        req.usuario.host_media = uid.host_media
        req.usuario.endpoint_media = uid.endpoint_media

        

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}