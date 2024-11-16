const DataTypes = require('sequelize');
const { Zona_nivel_1 } = require('./direcciones');
const { Referidos } = require('../loyalty/referidos');

const Clientes = (db = '') => {
    const Clientes = db.define('clientes', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {            
            type: DataTypes.STRING
        },
        ape_paterno: {            
            type: DataTypes.STRING
        },
        ape_materno: {            
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        sexo: {            
            type: DataTypes.BOOLEAN, //1 Masculino, 0 femenino
            // defaultValue: 1 
        },
        email_cliente: {            
            type: DataTypes.STRING
        },
        telefono: {            
            type: DataTypes.STRING
        },
        id_colonia:{
            type: DataTypes.INTEGER, 
            references: {
                model: Zona_nivel_1(db),
                key: 'id'
            }
        },
        calle: {            
            type: DataTypes.STRING
        },
        no_ext: {            
            type: DataTypes.STRING
        },
        no_int: {            
            type: DataTypes.STRING
        },
        email_activo: { //campo que sirve para identificar si el cliente quiere o no recibir promociones 
            type: DataTypes.BOOLEAN   ,
            defaultValue: true         
        },
        referido_por: { // campo que sirve para saber el id de la referencia       
            type: DataTypes.INTEGER,
            references: {
                model: Referidos(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        foto:{
            type: DataTypes.STRING
        },
        id_stripe:{
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Clientes;
}

const DispositivosClientes = (db = '') => {
    const DispositivosClientes = db.define('dispositivos-clientes', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {            
            type: DataTypes.STRING
        },
        token_push: {            
            type: DataTypes.STRING
        },
        id_cliente:{
            type: DataTypes.INTEGER, 
            references: {
                model: Clientes(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }

    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return DispositivosClientes;
}

module.exports = {
    DispositivosClientes,
    Clientes
}