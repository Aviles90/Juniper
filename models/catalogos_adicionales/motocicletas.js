const DataTypes = require('sequelize');


const Marcas_motos = (db = '') => {
    const marcasMotos = db.define('marcas_motos', {
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

    return marcasMotos;
}

const Modelos_motos = (db = '') => {
    const modelosMotos = db.define('modelos_motos', {
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
                model: Marcas_motos(db),
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

    return modelosMotos;
}

module.exports = {
    Marcas_motos,
    Modelos_motos
}