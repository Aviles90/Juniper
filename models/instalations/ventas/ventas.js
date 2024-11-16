const DataTypes = require('sequelize');
const { Clientes } = require('../clientes');
const { CanalesVenta } = require('./canales');

const Ventas = (db = '') => {
    
    const Venta = db.define('ventas', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        cliente: {            
            type: DataTypes.INTEGER,
            references: {
                model: Clientes(db),
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        },
        canal: {            
            type: DataTypes.INTEGER,
            references: {
                model: CanalesVenta(db),
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        },
        vendido: {            
            type: DataTypes.BOOLEAN
        },
        estado: { //Mismo estado Carrito, investigar posteriormente porque no permite hacer la realción
            type: DataTypes.INTEGER,
        },
        // campana: {            
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Campanas(db),
        //         key: 'id'
        //     }
        // },
        // metodo_pago: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //             model: MetodosPago(db),
        //             key: 'id'
        //         }
        // },
        localizador_interno: {            
            type: DataTypes.STRING
        },
        id_transaction: {
            type: DataTypes.STRING
        },
        client_secret: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true 
    });

    return Venta;
}

module.exports = {
    Ventas
}