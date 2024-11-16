const DataTypes = require('sequelize');
const { Pipes } = require('./pipes');

const Etapas = (db = '') => {
    const Etapa = db.define('etapas', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        etapa: {            
            type: DataTypes.STRING,
        },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        order: {            
            type: DataTypes.INTEGER
        },
        // obligatorio: {            
        //     type: DataTypes.BOOLEAN
        // },
        pipe: {
            type: DataTypes.INTEGER,
            references: {
                model: Pipes(db),
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    return Etapa;
}

module.exports = {
    Etapas
}