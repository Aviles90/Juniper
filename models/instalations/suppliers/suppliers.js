const DataTypes = require('sequelize');
const { Zona_nivel_1 } = require('../clientes/direcciones');
const { Grupo_proveedores, RolesProveedores } = require('./propiedades_suppliers');
// const { Referidos } = require('../loyalty/referidos');

const Proveedores = (db = '') => {
    const Proveedores = db.define('proveedores', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nombre_proveedor: {            
            type: DataTypes.STRING
        },
        nombre_proveedor_en: {
            type: DataTypes.STRING
        },
        email_proveedor: {            
            type: DataTypes.STRING
        },
        telefono_proveedor: {            
            type: DataTypes.STRING
        },
        password_proveedor:{
            type: DataTypes.STRING
        },
        razon_social: {            
            type: DataTypes.STRING
        },
        rfc_proveedor: {            
            type: DataTypes.STRING
        },
        email_proveedor_factura: {            
            type: DataTypes.STRING
        },
        direccion_factura: {            
            type: DataTypes.STRING
        },
        regimen_proveedor: {            
            type: DataTypes.STRING
        },
        cuenta_bancaria: {            
            type: DataTypes.STRING            
        },
        id_colonia:{
            type: DataTypes.INTEGER, 
            references: {
                model: Zona_nivel_1(db),
                key: 'id'
            }
        },
        calle: {            
            type: DataTypes.STRING
        },
        no_ext: {            
            type: DataTypes.STRING
        },
        no_int: {            
            type: DataTypes.STRING
        },
        latitud_proveedor: {
            type: DataTypes.STRING
        },
        longitud_proveedor: {
            type: DataTypes.STRING
        },
        referencia_direccion_es: {
            type: DataTypes.STRING
        },
        referencia_direccion_en: {
            type: DataTypes.STRING
        },
        codigo_proveedor: {
            type: DataTypes.STRING
        },
        caja_proveedor: {
            type: DataTypes.DECIMAL
        },
        credito: {
            type: DataTypes.DECIMAL
        },
        verificado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        referido_por: { // campo que sirve para saber el id de la referencia       
            type: DataTypes.INTEGER,
            // references: {
            //     model: Referidos(db),
            //     key: 'id'
            // },
            // onDelete: 'CASCADE',
            // onUpdate: 'CASCADE'
        },
        descripcion_es: {
            type: DataTypes.STRING
        },
        descripcion_en: {
            type: DataTypes.STRING
        },
        km_redonda: {
            type: DataTypes.INTEGER
        },
        foto: {
            type: DataTypes.STRING,
        },
        foto_portada: {
            type: DataTypes.STRING
        },
        foto_portada_mobile: {
            type: DataTypes.STRING
        },
        id_grupo_proveedor:{
            type: DataTypes.INTEGER,
            references: {
                model: Grupo_proveedores(db),
                key: 'id'
            }
        },
        nombre_contacto_proveedor:{
            type: DataTypes.STRING
        },
        correo_contacto_proveedor:{
            type: DataTypes.STRING
        },
        telefono_contacto_proveedor:{
            type: DataTypes.STRING
        },
        roleId:{
            type: DataTypes.INTEGER,
            references: {
                model: RolesProveedores(db),
                key: 'id'
            }
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

    // Proveedores.hasMany(Productos(db),{
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //   } )

    //   console.log(Productos(db));

    return Proveedores;
}

const Documentos_proveedores = (db = '') => {
    const Documentos_proveedores = db.define('documentos_proveedores', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.INTEGER,
            references: {
                model: Tipos_documentos_proveedores(db),
                key: 'id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        },
        expira: {
            type: DataTypes.DATEONLY
        },
        valido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        url: {
            type: DataTypes.STRING
        },
        descripcion_es:{
            type: DataTypes.STRING
        },
        descripcion_en:{
            type: DataTypes.STRING
        },
        id_proveedor:{
            type: DataTypes.INTEGER,
            references: {
                model: Proveedores(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Documentos_proveedores;
}

const Tipos_documentos_proveedores = (db = '') => {
    const tipos_documentos_proveedores = db.define('tipos_documentos_proveedores', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {            
            type: DataTypes.STRING
        },        
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: false,
      },
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return tipos_documentos_proveedores;
}

const vehiculosDeProveedores = (db = '') => {
    const Autos = db.define('vehiculos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        marca: {
            type: DataTypes.STRING,
        },
        modelo: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.STRING,
        },
        color: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        },
        foto_expira: {
            type: DataTypes.DATEONLY
        },
        foto_valida: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        seguro: {
            type: DataTypes.STRING
        },
        seguro_expira: {
            type: DataTypes.DATEONLY
        },
        seguro_valido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tarjeta: {
            type: DataTypes.STRING
        },
        tarjeta_expira: {
            type: DataTypes.DATEONLY
        },
        tarjeta_valida: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tag: {
            type: DataTypes.STRING
        },
        tag_expira: {
            type: DataTypes.DATEONLY
        },
        tag_valido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        activo:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    // {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Autos;
}

const vehiculosProveedores = (db = '') => {
    const Autos = db.define('vehiculos_proveedores', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        proveedor: {
            type: DataTypes.INTEGER,
            references: {
                model: Proveedores(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        vehiculo: {
            type: DataTypes.INTEGER,
            references: {
                model: vehiculosDeProveedores(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        estado: {
            type: DataTypes.INTEGER,
            references: {
                model: estadosVehiculosProveedores(db),
                key: 'id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE'
        },
        descripcion_es: {
            type: DataTypes.STRING,
        },
        descripcion_en: {
            type: DataTypes.STRING,
        }
    },
    // {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Autos;
}

const estadosVehiculosProveedores = (db = '') => {
    const Estados = db.define('estados_vehiculos_autos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: DataTypes.STRING,
        }
    },
    {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Estados;
}

module.exports = {
    Documentos_proveedores,
    Proveedores,
    Tipos_documentos_proveedores,
    estadosVehiculosProveedores,
    vehiculosDeProveedores,
    vehiculosProveedores,
}