const DataTypes = require('sequelize');
const { Proveedores } = require('../suppliers/suppliers');

const Productos = (db = '') => {
    const Producto = db.define('productos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        producto: {            
            type: DataTypes.STRING            
        },
        producto_en: {            
            type: DataTypes.STRING            
        },
        anio: {            
            type: DataTypes.INTEGER
        },
        descripcion: {            
            type: DataTypes.STRING
        },
        description_en: {            
            type: DataTypes.STRING
        },
        precio_costo: {            
            type: DataTypes.DOUBLE
        },
        precio_recomendado: {            
            type: DataTypes.DECIMAL
        },
        unidades: {
            type: DataTypes.INTEGER
        },
        tamanio: {
            type: DataTypes.DECIMAL
        },
        ancho: {
            type: DataTypes.DECIMAL
        },
        altura: {
            type: DataTypes.DECIMAL
        },
        peso: {
            type: DataTypes.DECIMAL
        },
        foto: {
            type: DataTypes.STRING
        },
        tipo_producto: {            
            type: DataTypes.INTEGER,
            references: {
                model: TipoProducto(db),
                key: 'id'
            }
        },
        grupo_producto: {            
            type: DataTypes.INTEGER,
            references: {
                model: GrupoProducto(db),
                key: 'id'
            }
        },
        clase_producto: {            
            type: DataTypes.INTEGER,
            references: {
                model: ClaseProducto(db),
                key: 'id'
            }
        },
        segmento_producto: {            
            type: DataTypes.INTEGER,
            references: {
                model: SegmentoProducto(db),
                key: 'id'
            }
        },
        id_proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Proveedores(db),
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true 
    });

    // Producto.belongsTo(Proveedores(db),{
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    // });

    return Producto;
}

const TipoProducto = (db = '') => {
    const Producto = db.define('tipo_producto', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        tipo_producto: {            
            type: DataTypes.STRING            
        },
        tipo_producto_en: {            
            type: DataTypes.STRING            
        },
        descripcion: {            
            type: DataTypes.STRING
        },
        description_en: {            
            type: DataTypes.STRING
        },
        foto: {            
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true 
    });

    return Producto;
}

const GrupoProducto = (db = '') => {
    const Producto = db.define('grupo_producto', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        grupo_producto: {            
            type: DataTypes.STRING            
        },
        descripcion: {            
            type: DataTypes.STRING
        },
        grupo_producto_en: {            
            type: DataTypes.STRING            
        },
        description_en: {            
            type: DataTypes.STRING
        },
        foto: {            
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true 
    });

    return Producto;
}

const ClaseProducto = (db = '') => {
    const Producto = db.define('clase_producto', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        clase_producto: {            
            type: DataTypes.STRING            
        },
        descripcion: {            
            type: DataTypes.STRING
        },
        clase_producto_en: {            
            type: DataTypes.STRING            
        },
        descripcion_en: {            
            type: DataTypes.STRING
        },
        foto: {            
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    },
    {
        freezeTableName: true 
    });

    return Producto;
}

const SegmentoProducto = (db = '') => {
    const Producto = db.define('segmento_producto', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        segmento_producto: {            
            type: DataTypes.STRING            
        },
        segmento_producto_en: {
            type: DataTypes.STRING
        },
        descripcion: {            
            type: DataTypes.STRING
        },
        description_en: {
            type: DataTypes.STRING
        },
        foto: {            
            type: DataTypes.STRING
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },        
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    },
    {
        freezeTableName: true 
    });

    return Producto;
}

// const Adicionales = (db = '') => {
//     const Adicional = db.define('adicionales', {
//         id:{
//             type: DataTypes.INTEGER, 
//             primaryKey: true,
//             autoIncrement: true
//         },
//         producto_adicional: {            
//             type: DataTypes.STRING            
//         },
//         producto_adicional_en: {            
//             type: DataTypes.STRING            
//         },
//         descripcion: {            
//             type: DataTypes.STRING
//         },
//         descripcion_en: {            
//             type: DataTypes.STRING
//         },
//         activo: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: true
//         },
//         deleteAt: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         }
//     },
//     {
//         freezeTableName: true 
//     });

//     return Adicional;
// }

const ProductosAdicionales = (db = '') => {
    const ProductoAdicional = db.define('productos_adicionales', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        // id_adicional: {            
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Adicionales(db),
        //         key: 'id'
        //     },
        //       onUpdate: 'CASCADE',
        //     onDelete: 'CASCADE'
        // },
        producto_adicional_es: {            
            type: DataTypes.STRING            
        },
        producto_adicional_en: {            
            type: DataTypes.STRING            
        },
        precio_costo: {            
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        id_segmento_producto_adicional: {            
            type: DataTypes.INTEGER,
            references: {
                model: SegmentacionProductosAdicionales(db),
                key: 'id'
            },
             onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true 
    });

    return ProductoAdicional;
}

const SegmentacionProductosAdicionales = (db = '') => {
    const SegmentacionProductoAdicional = db.define('segmentacion_productos_adicionales', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {            
            type: DataTypes.INTEGER,
            references: {
                model: Productos(db),
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        nombre_es: {            
            type: DataTypes.STRING,
        },
        nombre_en: {            
            type: DataTypes.STRING,
        },
        requerido: {            
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        unidades: {            
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        permite_repetir: {            
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        tipo: {            
            type: DataTypes.INTEGER
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true 
    });

    return SegmentacionProductoAdicional;
}

const Fotos_productos = (db = '') => {
    const FotosProducto = db.define('fotos_productos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        ruta: {
            type: DataTypes.STRING
        },
        orden: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        producto: {
            type: DataTypes.INTEGER,
            references: {
                model: Productos(db),
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true 
    });

    return FotosProducto;
}

// const Fotos_adicionales = (db = '') => {
//     const FotoAdicional = db.define('fotos__adicionales', {
//         id:{
//             type: DataTypes.INTEGER, 
//             primaryKey: true,
//             autoIncrement: true
//         },
//         ruta: {
//             type: DataTypes.STRING,
//         },
//         orden: {
//             type: DataTypes.INTEGER,
//             defaultValue: 0
//         },
//         adicional: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Adicionales(db),
//                 key: 'id'
//             }
//         },
//     },
//     {
//         freezeTableName: true 
//     });

//     return FotoAdicional;
// }

module.exports = {
    Productos,
    TipoProducto,
    GrupoProducto,
    ClaseProducto,
    SegmentoProducto,
    // Adicionales,
    ProductosAdicionales,
    Fotos_productos,
    // Fotos_adicionales,
    SegmentacionProductosAdicionales
}