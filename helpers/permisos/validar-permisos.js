const { response, request } = require('express');
const { RolesPermisos } = require('../../models/instalations/usuarios');
const { Sequelize } = require('sequelize/lib/sequelize');
const { connApi } = require('../../database/connectionMySQL');

const validarPermisos = async (req=request, res=response, next) => {
    const {host, base, user, pass, port, roleId} = req.usuario
    try {
        const db = connApi(host, base, user, pass, port);
        const permisos = await RolesPermisos(db).findAll({
            attribute:['permiso'],
            where:{
                rol: roleId
            }
        })
        req.permisos = permisos
    } catch (error) {
        console.log(console.log(error));
        return res.status(400).json({
            ok: false,
            msg: "No se logró validar el acceso, comunicte con el administrador"
        })
    }
    next()
}

module.exports = {
    validarPermisos
}