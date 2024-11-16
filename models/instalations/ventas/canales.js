const DataTypes = require('sequelize');

const CanalesVenta = (db = '') => {
    const Canal = db.define('canales_venta', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        canal: {            
            type: DataTypes.STRING,
        },
        activo: {            
            type: DataTypes.INTEGER,
        }
    },
    {
        freezeTableName: true,
        timestamps: false, 
    });

    return Canal;
}

module.exports = {
    CanalesVenta
}