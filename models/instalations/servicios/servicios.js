const DataTypes = require('sequelize');
const { CategoriasServicios, GruposServicios, TiposServicios, SegmentosServicios } = require('./categorias.servicios');
const { Proveedores } = require('../suppliers/suppliers');

const Servicios = (db = '') => {
    const Servicio = db.define('servicios', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        servicio: {            
            type: DataTypes.STRING
        },
        servicio_en: {            
            type: DataTypes.STRING
        },
        descripcion_es: {            
            type: DataTypes.STRING
        },
        descripcion_en: {            
            type: DataTypes.STRING
        },
        fecha_inicio: {
            type: DataTypes.DATE
        },
        fecha_fin: {            
            type: DataTypes.DATE
        },
        duracion: {    // duración en minutos        
            type: DataTypes.INTEGER
        },
        duracion_real: {    // duración en minutos        
            type: DataTypes.INTEGER
        },
        precio_costo: { //revisar este campo se obtenga por contratos de compra
            type: DataTypes.DECIMAL
        },
        inventario: { //cupo o capacidad            
            type: DataTypes.INTEGER
        },
        id_proveedor: {
            type: DataTypes.INTEGER,
            references: {
                model: Proveedores(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        categoria_servicio: {
            type: DataTypes.INTEGER,
            references: {
                model: CategoriasServicios(db),
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        },
        grupo_servicio: {
            type: DataTypes.INTEGER,
            references: {
                model: GruposServicios(db),
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        },
        tipo_servicio: {
            type: DataTypes.INTEGER,
            references: {
                model: TiposServicios(db),
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        },
        segmento_servicio: {
            type: DataTypes.INTEGER,
            references: {
                model: SegmentosServicios(db),
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        },
        activo: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Servicio;
}

module.exports = {
    Servicios
}