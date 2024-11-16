const DataTypes = require('sequelize');
const { Productos } = require('../productos');
const { Servicios } = require('../servicios');
const { SegmentacionProductosAdicionales } = require('../productos/productos');
const { Ventas } = require('./ventas');
const { Contactos } = require('../clientes');

//Con esta tabla obtendremos todas las líneas de productos de la venta, incluso antes de cerrra la venta
const CarritosShop = (db = '') => {
    const CarritoShop = db.define('carritos_shop', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
            references: {
                model: Productos(db),
                key: 'id'
            }
        },
        id_servicio: {
            type: DataTypes.INTEGER,
            references: {
                model: Servicios(db),
                key: 'id'
            }
        },
        id_venta: {
            type: DataTypes.INTEGER,
            references: {
                model: Ventas(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        // id_contacto: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Contactos(db),
        //         key: 'id'
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE',
        // },
        unidades: {
            type: DataTypes.INTEGER,
        },
        precio_costo_unitario: {
            type: DataTypes.DECIMAL(10, 2),
        },
        precio_costo_total: {
            type: DataTypes.DECIMAL(10, 2),
        },
        precio_venta: {
            type: DataTypes.DECIMAL(10, 2),
        },
        comision: {
            type: DataTypes.INTEGER,
        },
        comision_aplicada: {
            type: DataTypes.DECIMAL(10, 2),
        },
        markup: {
            type: DataTypes.INTEGER,
        },
        precio_markup: {
            type: DataTypes.DECIMAL(10, 2),
        },
        // // profit: {     
        // //     type: DataTypes.DECIMAL(10,2),
        // // },
        // // id_contacto: {            
        // //     type: DataTypes.DECIMAL(10,2),
        // // },
        moneda_compra: {
            type: DataTypes.STRING,
        },
        moneda_venta: {
            type: DataTypes.STRING,
        },
        // // factor_cambio: {            
        // //     type: DataTypes.DECIMAL(10,2),
        // // },
        descuento: {
            type: DataTypes.INTEGER,
        },
        // descuento_aplicado: {
        //     type: DataTypes.DECIMAL(10,2),
        // },
        total_complementos: {
            type: DataTypes.DECIMAL(10, 2),
        },
        total_final: {
            type: DataTypes.DECIMAL(10, 2),
        },
        estado: { // estado del complemento, da la posibilidad de cancdelar solo este complemento del pedido
            type: DataTypes.INTEGER,
            references: {
                model: EstadosCarrito(db),
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            defaultValue: 1
        },
        descripcion : {
            type: DataTypes.STRING,
        }
    },
        {
            freezeTableName: true
        });

    return CarritoShop;
}

const DetallesCarrito = (db = '') => {
    const DetallesCarrito = db.define('detalles_carrito', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrito: {            
            type: DataTypes.INTEGER,
            references: {
                model: CarritosShop(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        id_venta: {            
            type: DataTypes.INTEGER,
            references: {
                model: Ventas(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        // id_producto_adicional: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: ProductosAdicionales(db),                
        //         key: 'id'
        //     }
        // },
        id_segmento_producto_adicional: {
            type: DataTypes.INTEGER,
            references: {
                model: SegmentacionProductosAdicionales(db),
                key: 'id'
            }
        },
        concepto: {
            type: DataTypes.STRING,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        unidades: {
            type: DataTypes.INTEGER,
        },
        precio_unitario: {
            type: DataTypes.DECIMAL(10, 2),
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
        }
    },
        {
            freezeTableName: true
        });
    return DetallesCarrito;
}


const EstadosCarrito = (db = '') => {
    const EstadosCarrito = db.define('estado_carrito', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: DataTypes.STRING,
        }
    },
        {
            timestamps: false,
            deletedAt: true,
            freezeTableName: true
        });

    return EstadosCarrito;
}

const ContactosCarrito = (db = '') => {
    const ContactosCarrito = db.define('contactos_carrito', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrito: {
            type: DataTypes.INTEGER,
            references: {
                model: CarritosShop(db),
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_contacto: {
            type: DataTypes.INTEGER,
            references: {
                model: Contactos(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
    },
        {
            timestamps: false,
            deletedAt: true,
            freezeTableName: true
        });

    return ContactosCarrito;
}

module.exports = {
    CarritosShop,
    DetallesCarrito,
    ContactosCarrito,
    EstadosCarrito,
}