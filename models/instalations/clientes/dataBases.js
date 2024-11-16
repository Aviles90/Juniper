const DataTypes = require('sequelize');
//Esta tabla solo existe en la báse de datos principal y se utiliza para asociar la Base de Datos a Loguearse
//Se crea con el usuario maestro
const dataBases = (db = '') => {
    const Bases = db.define('bases_clientes', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        empresa:{
            type: DataTypes.STRING
        },
        base:{
            type: DataTypes.STRING
        },
        host:{
            type: DataTypes.STRING
        },
        user:{
            type: DataTypes.STRING
        },
        pass:{
            type: DataTypes.STRING
        },
        port:{
            type: DataTypes.STRING
        },
        estado: {            
            type: DataTypes.BOOLEAN
        },
        api_google_maps:{
            type: DataTypes.STRING
        },
        host_media: {            
            type: DataTypes.STRING
        },
        endpoint_media: {            
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Bases;
}

module.exports = {
    dataBases
}