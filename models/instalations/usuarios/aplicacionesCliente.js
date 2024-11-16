const DataTypes = require('sequelize');

const AplicacionesCliente = (db = '') => {
    const Aplicacion = db.define('aplicaciones_cliente', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        aplicacion: {
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Aplicacion;
}

module.exports = {AplicacionesCliente}