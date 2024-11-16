const DataTypes = require('sequelize');
const { Usuarios } = require('../usuarios');
const { Ventas } = require('./ventas');
const { Etapas } = require('./etapas');
const { Seguimientos } = require('./seguimientos');

const Historial = (db = '') => {
    const Historia = db.define('historial', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        comentario: {            
            type: DataTypes.STRING,
        },
        archivo: {
            type: DataTypes.STRING,
        },
        usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuarios(db),
                key: 'id'
            },
            // onDelete: 'SET NULL',
            // onUpdate: 'CASCADE',
        },
        venta: {            
            type: DataTypes.INTEGER,
            references: {
                model: Ventas(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        seguimiento: {            
            type: DataTypes.INTEGER,
            references: {
                model: Seguimientos(db),
                key: 'id'
            }
        },
        etapa: {
            type: DataTypes.INTEGER,
            references: {
                    model: Etapas(db),
                    key: 'id'
                }
        },
        // onDelete: 'SET NULL',
        // onUpdate: 'CASCADE',
    },
    {
        freezeTableName: true 
    });

    return Historia;
}

module.exports = {
    Historial
}