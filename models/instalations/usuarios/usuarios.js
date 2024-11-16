const DataTypes = require('sequelize');
const { Roles } = require('./roles');

const Usuarios = (db = '', body = '') => {
    const Usuario = db.define('usuarios', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        sexo: {
            type: DataTypes.BOOLEAN
        },
        nombre: {
            type: DataTypes.STRING,
        },
        ape_paterno: {
            type: DataTypes.STRING,
        },
        ape_materno: {
            type: DataTypes.STRING,
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
        },
        telefono: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        foto: {
            type: DataTypes.STRING,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        verificado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: Roles(db),
                key: 'id'
            }
        },
        password: {
            type: DataTypes.STRING,
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });
    
    // Usuario.hasOne(Roles(db));
    Usuario.belongsTo(Roles(db));

    return Usuario;
}

module.exports = {Usuarios}