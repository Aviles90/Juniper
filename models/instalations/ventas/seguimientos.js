const DataTypes = require('sequelize');

const Seguimientos = (db = '') => {
    const Seguimiento = db.define('seguimientos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        seguimiento: {            
            type: DataTypes.STRING,
        },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    },
    {
        freezeTableName: true 
    });

    return Seguimiento;
}

module.exports = {
    Seguimientos
}