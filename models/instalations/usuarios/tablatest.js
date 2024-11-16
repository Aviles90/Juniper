const DataTypes = require('sequelize');
const dbMySQL = require('../../../database/connectionMySQL');

const Usuario = dbMySQL.define('UsuarioTest', {
    id:{
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    test: {
        type: DataTypes.STRING
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    }
},
{
    freezeTableName: true //Nombre definido es igual al de la tabla
});


module.exports = Usuario;