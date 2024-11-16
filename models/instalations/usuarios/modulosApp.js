const DataTypes = require('sequelize');
const { AplicacionesCliente } = require('./aplicacionesCliente');

const ModulosApp = (db = '') => {
    const Modulo = db.define('modulos_app', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        modulo: {
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        aplicacion: {
            type: DataTypes.INTEGER,
            references: {
                model: AplicacionesCliente(db),
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Modulo;
}

module.exports = {ModulosApp}