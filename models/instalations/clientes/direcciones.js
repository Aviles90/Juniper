const DataTypes = require('sequelize');

const Zona_nivel_4 = (db = '') => {
    const Pais = db.define('zona_nivel_4', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: false
        },
        nombre: {            
            type: DataTypes.STRING
        }
    },
    {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Pais;
}

const Zona_nivel_3 = (db = '') => {
    const Zona_nivel_3 = db.define('zona_nivel_3', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: false
        },
        nombre: {            
            type: DataTypes.STRING
        },
        zona: {            
            type: DataTypes.INTEGER,
            references: {
                model: Zona_nivel_4(db),
                key: 'id'
            }
        }
    },
    {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Zona_nivel_3;
}

const Zona_nivel_2 = (db = '') => {
    const Zona_nivel_2 = db.define('zona_nivel_2', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: false
        },
        nombre: {            
            type: DataTypes.STRING
        },
        zona: {            
            type: DataTypes.INTEGER,
            references: {
                model: Zona_nivel_3(db),
                key: 'id'
            }
        }
    },
    {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Zona_nivel_2;
}

const Zona_nivel_1 = (db = '') => {
    const Zona_nivel_1 = db.define('zona_nivel_1', {
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: false
        },
        nombre: {            
            type: DataTypes.STRING
        },
        zona: {            
            type: DataTypes.INTEGER,
            references: {
                model: Zona_nivel_2(db),
                key: 'id'
            }
        }
        // ,define: {
        //     timestamps: false,
        //   },
    },
    {timestamps: false},
    {
        freezeTableName: true //Nombre definido es igual al de la tabla
    });

    return Zona_nivel_1;
}

module.exports = {
    Zona_nivel_4,
    Zona_nivel_3,
    Zona_nivel_2,
    Zona_nivel_1
}