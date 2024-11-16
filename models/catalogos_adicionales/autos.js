const DataTypes = require('sequelize');


const Marcas = (db = '') => {
    const Marcas = db.define('marcas_autos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        marca: {            
            type: DataTypes.STRING
        },        
    },
    {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Marcas;
}

const Modelos = (db = '') => {
    const Modelos = db.define('modelos_autos', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        modelo: {            
            type: DataTypes.STRING
        },
        marca: {
            type: DataTypes.INTEGER,
            references: {
                model: Marcas(db),
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Modelos;
}

// const Years = (db = '') => {
//     const Year = db.define('year_autos', {
//         id:{
//             type: DataTypes.INTEGER, 
//             primaryKey: true,
//             autoIncrement: true
//         },
//         year: {            
//             type: DataTypes.STRING
//         },
//         modelo: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Modelos(db),
//                 key: 'id'
//             },
//             onDelete: 'CASCADE',
//             onUpdate: 'CASCADE'
//         }
//     },
//     {timestamps: false},
//     {
//         freezeTableName: true //Nombre definido es igual al de la tabla
//     });

//     return Year;
// }

// const Autos = (db = '') => {
//     const Autos = db.define('autos', {
//         id:{
//             type: DataTypes.INTEGER, 
//             primaryKey: true,
//             autoIncrement: true
//         },
//         marca_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Marcas(db),
//                 key: 'id'
//             },
//             onDelete: 'CASCADE',
//             onUpdate: 'CASCADE'
//         },
//         modelo_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Modelos(db),
//                 key: 'id'
//             },
//             onDelete: 'CASCADE',
//             onUpdate: 'CASCADE'
//         },
//         year_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Years(db),
//                 key: 'id'
//             },
//             onDelete: 'CASCADE',
//             onUpdate: 'CASCADE'
//         },
//         color: {
//             type: DataTypes.STRING
//         },
//         foto: {
//             type: DataTypes.STRING
//         }
//     },
//     {timestamps: false},
//     {
//         freezeTableName: true //Nombre definido es igual al de la tabla
//     });

//     return Autos;
// }

module.exports = {
    Marcas,
    Modelos,
    // Years,
    // Autos
}