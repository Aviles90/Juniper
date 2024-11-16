const DataTypes = require('sequelize');
// const { Usuarios } = require('./usuarios');
const { Permisos } = require('./permisos');
const { Roles } = require('./roles');

const RolesPermisos = (db = '') => {
    const RolPermiso = db.define('roles_permisos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        rol: {
            type: DataTypes.INTEGER,
            references: {
                model: Roles(db),
                key: 'id'
            }
        },
        permiso: {
            type: DataTypes.INTEGER,
            references: {
                model: Permisos(db),
                key: 'id'
            }
        },
        // usuario: {
        // type: DataTypes.INTEGER,
        //     references: {
        //         model: Usuarios(db),
        //         key: 'id'
        //     }
        // }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return RolPermiso;
}

module.exports = {RolesPermisos}