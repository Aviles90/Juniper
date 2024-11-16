const DataTypes = require('sequelize');
// const { RolesPermisos } = require('./rolesPermisos');

const Roles = (db = '') => {
    const Rol = db.define('roles', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        rol: {
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        // permiso: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: RolesPermisos(db),
        //         key: 'id'
        //     }
        // }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Rol;
}

module.exports = {Roles}