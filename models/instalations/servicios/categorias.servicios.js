const DataTypes = require('sequelize');

const CategoriasServicios = (db = '') => {
    const CategoriaServicio = db.define('categorias_servicios', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        categoria_servicio_es: {
            type: DataTypes.STRING
        },
        categoria_servicio_en: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        deleteAt: {            
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return CategoriaServicio;
}

const GruposServicios = (db = '') => {
    const GruposServicios = db.define('grupos_servicios', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        grupo_servicio_es: {            
            type: DataTypes.STRING
        },
        grupo_servicio_en: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        deleteAt: {            
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return GruposServicios;
}

const TiposServicios = (db = '') => {
    const TiposServicios = db.define('tipos_servicios', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        tipo_servicio_es: {            
            type: DataTypes.STRING
        },
        tipo_servicio_en: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        deleteAt: {            
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return TiposServicios;
}

const SegmentosServicios = (db = '') => {
    const SegmentosServicios = db.define('segmentos_servicios', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        segmento_servicio_es: {            
            type: DataTypes.STRING
        },
        segmento_servicio_en: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        },
        activo: {            
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        deleteAt: {            
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return SegmentosServicios;
}

module.exports = {
    CategoriasServicios,
    GruposServicios,
    TiposServicios,
    SegmentosServicios
}