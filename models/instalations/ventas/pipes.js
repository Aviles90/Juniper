const DataTypes = require('sequelize');

const Pipes = (db = '') => {
    const Pipe = db.define('pipes', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        pipe: {            
            type: DataTypes.STRING,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        // lead_ticket: {
        //     type: DataTypes.BOOLEAN,
        // },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    },
    {
        freezeTableName: true,
        timestamps: false, 
    });

    return Pipe;
}

module.exports = {
    Pipes
}