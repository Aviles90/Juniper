const {Sequelize} = require('sequelize');

const mainDB = new Sequelize(process.env.BD_MYSQL, process.env.USER_MYSQL, process.env.PASS_MYSQL, {
    host: process.env.HOST_MYSQL,
    // port: '8889',
    port: process.env.PORT_MYSQL,
    dialect: 'mysql',
    timezone: '-06:00',
    logging: false
})

// const connMysql = (db) => {
//     const dataBaseClient = new Sequelize(db, process.env.USER_MYSQL, process.env.PASS_MYSQL, {
//         host: process.env.HOST_MYSQL,
//         port: process.env.PORT_MYSQL,
//         // port: '8889',
//         dialect: 'mysql',
//         //logging: false
//     })
//     return dataBaseClient
// }

const connApi = (host, db, user, pass, port) => {
    const dataBaseClient = new Sequelize(db, user, pass, {
        host,
        port,
        dialect: 'mysql',
        timezone: '-06:00',
        // logging: false
        //logging: console.log
    })
    return dataBaseClient;
}

module.exports = {
    mainDB,
    // connMysql,
    connApi
};