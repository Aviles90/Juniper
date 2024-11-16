const DataTypes = require('sequelize');
const { Clientes } = require('./clientes');

const Contactos = (db = '') => {
    const Contactos = db.define('contactos_clientes', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nombre_contacto: {            
            type: DataTypes.STRING
        },
        ape_paterno: {            
            type: DataTypes.STRING
        },
        ape_materno: {            
            type: DataTypes.STRING
        },
        alias: {            
            type: DataTypes.STRING
        },
        email_contacto: {            
            type: DataTypes.STRING
        },
        telefono_contacto: {            
            type: DataTypes.STRING
        },
        id_cliente:{
            type: DataTypes.INTEGER, 
            references: {
                model: Clientes(db),
                key: 'id'
            }
        },
        direccion: {            
            type: DataTypes.STRING
        },        
        latitud_contacto: {            
            type: DataTypes.STRING
        },        
        longitud_contacto: {            
            type: DataTypes.STRING
        },        
        referencia: {            
            type: DataTypes.STRING
        },        
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Contactos;
}

module.exports = {
    Contactos
}