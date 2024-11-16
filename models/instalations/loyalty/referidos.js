const DataTypes = require('sequelize');
const { Proveedores } = require('../suppliers/suppliers');
// const { Clientes } = require('../clientes');


const Referidos = (db = '') => {
    const Referido = db.define('referidos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        // type_from: { //inicial de la tabla que refiere, ejemplo C: clientes, P:proveedores            
        //     type: DataTypes.STRING
        // },
        from: {            
            // type: DataTypes.INTEGER
            type: DataTypes.STRING
        },
        // type_to: {
        //     type: DataTypes.STRING
        // },
        to: {            
            // type: DataTypes.INTEGER,
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Referido;
}

const Banco_codigos = (db = '') => {
    const Referido = db.define('banco_codigos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING,
            unique: true
        },
        cliente: {                        
            type: DataTypes.INTEGER,
            unique: true,
            // defaultValue:null,
            // references: {
            //     model: Clientes(db),
            //     key: 'id'
            // },
            // onDelete: "CASCADE",
            // onUpdate: "CASCADE"
        },
        proveedor: {            
            type: DataTypes.INTEGER,
            defaultValue:null,
            unique: true,
            references: {
                model: Proveedores(db),
                key: 'id'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Referido;
}

module.exports = {
    Referidos,
    Banco_codigos
}