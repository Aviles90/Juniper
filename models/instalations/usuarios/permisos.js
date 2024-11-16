const DataTypes = require('sequelize');
// const { AplicacionesCliente } = require('./aplicacionesCliente');
// const { ModulosApp } = require('./modulosApp');
// const  {ModulosApp}  = require('./index');

const Permisos = (db = '') => {
    const Permiso = db.define('permisos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        permiso: {
            type: DataTypes.STRING
        }
        // modulo: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: ModulosApp(db),
        //         key: 'id'
        //     }
        // },
        // aplicacion: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: AplicacionesCliente(db),
        //         key: 'id'
        //     }
        // }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Permiso;
}

module.exports = {Permisos}