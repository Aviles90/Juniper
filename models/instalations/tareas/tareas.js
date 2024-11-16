const DataTypes = require('sequelize');
const { Usuarios } = require('../usuarios');
const { Ventas } = require('../ventas');

const Tareas = (db = '') => {
    const Tarea = db.define('tareas', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        asunto: {
            type: DataTypes.STRING,
        },
        fecha_inicio: {
            type: DataTypes.DATE
        },
        fecha_fin: {
            type: DataTypes.DATE,
        },
        hora_inicio: {
            type: DataTypes.TIME,
        },
        hora_fin: {
            type: DataTypes.TIME,
        },
        dia_completo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        finalizada: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuarios(db),
                key: 'id'
            }
        },
        venta: {
            type: DataTypes.INTEGER,
            references: {
                model: Ventas(db),
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Tarea;
}

module.exports = {Tareas}