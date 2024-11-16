const DataTypes = require('sequelize');

const MetodosPago = (db = '') => {
    const MetodoPago = db.define('metodos_pago', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        metodo: {            
            type: DataTypes.STRING,
        },
        activo: {            
            type: DataTypes.INTEGER,
        }
    },
    {
        freezeTableName: true 
    });

    return MetodoPago;
}

module.exports = {
    MetodosPago
}