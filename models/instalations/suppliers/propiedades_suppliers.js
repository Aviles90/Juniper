const DataTypes = require('sequelize');

const Grupo_proveedores = (db = '') => {    
    const grupo_proveedores = db.define('grupo_proveedores', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nombre_grupo_es: {            
            type: DataTypes.STRING
        },
        nombre_grupo_en: {            
            type: DataTypes.STRING
        },
        descripcion_grupo_es: {            
            type: DataTypes.STRING
        },
        descripcion_grupo_en: {            
            type: DataTypes.STRING
        },
        foto: {            
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return grupo_proveedores;
}

const RolesProveedores = (db = '') => {    
    const roles_proveedores = db.define('roles_proveedores', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nombre_rol: {            
            type: DataTypes.STRING
        },
        descripcion_rol_es: {            
            type: DataTypes.STRING
        },
        descripcion_rol_en: {            
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

    return roles_proveedores;
}



module.exports = {
    Grupo_proveedores,
    RolesProveedores
}