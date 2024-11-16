const { Router, response } = require('express');
const axios = require('axios').default;
// const { check } = require('express-validator');
const bcryptjs = require('bcryptjs');
const {Sequelize, DataTypes,Op} = require('sequelize');
// const { login, revalidarToken } = require('../controllers/auth');
// const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const versionApi = '1.0'
//Begin UTC creation
var utcDate = Math.floor(new Date().getTime() / 1000);
//Begin Signature Assembly
var publicKey = 'jjvkxx2mcjwntezukq42nf36';
var privateKey = 'yE5Esb8a5x';
var assemble = (publicKey+privateKey+utcDate);
//Begin SHA-256 Encryption
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update(assemble).digest('hex');
const XSignature= hash;

const qs = require('qs');

/*
//update lastUpdatetime
if(environment.lastUpdateTime == undefined){
    var lastUpdateTime = new Date();
    lastUpdateTime.setDate(lastUpdateTime.getDate() - 7);
    postman.setEnvironmentVariable("lastUpdateTime", lastUpdateTime.toISOString());
}
 */

//Lenguajes
router.get( `/hotel-content-api/types/languages`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/languages`,{
        params: {
            fields: 'all',
            language: 'ALE',
            from: 1,
            to: 100,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const lenguages = BD_APTITUDE.define('lenguages', {
                id:{
                    type: DataTypes.INTEGER, 
                    primaryKey: true,
                    autoIncrement: true
                },
                code: {
                    type: DataTypes.STRING
                },
                name: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                descriptionLanguaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await lenguages.sync({ alter: true } )

            data.languages.forEach(async (language) => {   
                const registro = {
                    code: language.code,
                    name: language.name,
                    description: language.description.content,
                    descriptionLanguaje: language.description.languageCode
                }
                await lenguages.create(registro);
            });

            res.status(201).json({
                msg: `Lenguajes Insertados`
            });

            // data.languages.forEach(language => {
            //     console.log(language);
            // });
            


        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//Segmentos
router.get( `/hotel-content-api/types/segments`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/segments`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 100,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const segments = BD_APTITUDE.define('segments', {
                id:{
                    type: DataTypes.INTEGER, 
                    primaryKey: true,
                    autoIncrement: true
                },
                code: {
                    type: DataTypes.INTEGER
                },
                name: {
                    type: DataTypes.STRING
                },
                languaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await segments.sync({ alter: true } )

            data.segments.forEach(async (segment) => {   
                const registro = {
                    code: segment.code,
                    name: segment.description.content,
                    languaje: segment.description.languageCode,
                }
                await segments.create(registro);
            });

            res.status(201).json({
                msg: `Segmentos Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//Tipos Hoteles
router.get( `/hotel-content-api/types/accommodations`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/accommodations`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 100,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const accommodations = BD_APTITUDE.define('accommodations', {
                id:{
                    type: DataTypes.INTEGER, 
                    primaryKey: true,
                    autoIncrement: true
                },
                typeDescription: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                languaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await accommodations.sync({ alter: true } )

            data.accommodations.forEach(async (accommodation) => {   
                const registro = {
                    code: accommodation.code,
                    typeDescription: accommodation.typeDescription,
                    description: accommodation.typeMultiDescription.content,
                    languaje: accommodation.typeMultiDescription.languageCode,
                }
                await accommodations.create(registro);
            });

            res.status(201).json({
                msg: `Accommodations Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//Grupo de Catregorías
router.get( `/hotel-content-api/types/groupcategories`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/groupcategories`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 100,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const groupcategories = BD_APTITUDE.define('groupcategories', {
                id:{
                    type: DataTypes.INTEGER, 
                    primaryKey: true,
                    autoIncrement: true
                },
                order: {
                    type: DataTypes.INTEGER
                },
                name: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                languaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await groupcategories.sync({ alter: true } )

            data.groupCategories.forEach(async (groupCategorie) => {   
                const registro = {
                    code: groupCategorie.code,
                    order: groupCategorie.order,
                    name: groupCategorie.name.content,
                    description: groupCategorie.description.content,
                    languaje: groupCategorie.name.languageCode,
                }
                await groupcategories.create(registro);
            });

            res.status(201).json({
                msg: `groupcategories Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//Catregorías
router.get( `/hotel-content-api/types/categories`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/categories`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 100,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const categories = BD_APTITUDE.define('categories', {
                id:{
                    type: DataTypes.INTEGER, 
                    primaryKey: true,
                    autoIncrement: true
                },
                code: {
                    type: DataTypes.STRING
                },
                simpleCode: {
                    type: DataTypes.INTEGER
                },
                accommodationType: {
                    type: DataTypes.STRING
                },
                group: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                languaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await categories.sync({ alter: true } )

            data.categories.forEach(async (categorie) => {  
                const registro = {
                    code                : categorie.code,
                    simpleCode          : categorie.simpleCode,
                    accommodationType   : categorie.accommodationType,
                    // group               : categorie.group,
                    // description         : categorie.description.content,
                    // languaje            : categorie.description.languageCode
                }
                if (categorie.group) { registro.group = categorie.group }
                if (categorie.description) { registro.description = categorie.description.content }
                if (categorie.description) { registro.languaje = categorie.description.languageCode }

                await categories.create(registro);
            });

            res.status(201).json({
                msg: `categories Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//Chains
router.get( `/hotel-content-api/types/chains`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/chains`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 2001,
            to: 3000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const chains = BD_APTITUDE.define('chains', {
                id:{
                    type: DataTypes.INTEGER, 
                    primaryKey: true,
                    autoIncrement: true
                },
                code: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                languaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await chains.sync({ alter: true } )

            data.chains.forEach(async (chain) => {  
                try {                    
                    const registro = {
                        code               : chain.code,
                        description        : chain.description.content,
                        languaje           : chain.description.languageCode
                    }
                    await chains.create(registro);
                } catch (error) {
                    //console.log(error);
                }

            });

            res.status(201).json({
                msg: `chains Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//ImageType
router.get( `/hotel-content-api/types/imagetypes`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/imagetypes`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 1000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const imagetypes = BD_APTITUDE.define('imagetypes', {
                id:{
                    type: DataTypes.INTEGER, 
                    primaryKey: true,
                    autoIncrement: true
                },
                code: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                languaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await imagetypes.sync({ alter: true } )

            data.imageTypes.forEach(async (imagetype) => {  
                try {                    
                    const registro = {
                        code               : imagetype.code,
                        description        : imagetype.description.content,
                        languaje           : imagetype.description.languageCode
                    }
                    await imagetypes.create(registro);
                } catch (error) {
                    //console.log(error);
                }

            });

            res.status(201).json({
                msg: `imagetypes Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//facilitygroups
router.get( `/hotel-content-api/types/facilitygroups`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/facilitygroups`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 1000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const facilitygroups = BD_APTITUDE.define('facilitygroups', {
                // id:{
                //     type: DataTypes.INTEGER, 
                //     primaryKey: true,
                //     autoIncrement: true
                // },
                code: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                description: {
                    type: DataTypes.STRING
                },
                languaje: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await facilitygroups.sync({ alter: true } )

            data.facilityGroups.forEach(async (facilityGroup) => {  
                try {                    
                    const registro = {
                        code               : facilityGroup.code,
                        description        : facilityGroup.description.content,
                        languaje           : facilityGroup.description.languageCode
                    }
                    await facilitygroups.create(registro);
                } catch (error) {
                    //console.log(error);
                }

            });

            res.status(201).json({
                msg: `facilitygroups Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//facilitytypologies
router.get( `/hotel-content-api/types/facilitytypologies`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/facilitytypologies`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 1000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const facilitytypologies = BD_APTITUDE.define('facilitytypologies', {
                code: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                numberFlag: {
                    type: DataTypes.BOOLEAN
                },
                logicFlag: {
                    type: DataTypes.BOOLEAN
                },
                feeFlag: {
                    type: DataTypes.BOOLEAN
                },
                distanceFlag: {
                    type: DataTypes.BOOLEAN
                },
                ageFromFlag: {
                    type: DataTypes.BOOLEAN
                },
                ageToFlag: {
                    type: DataTypes.BOOLEAN
                },
                dateFromFlag: {
                    type: DataTypes.BOOLEAN
                },
                dateToFlag: {
                    type: DataTypes.BOOLEAN
                },
                timeFromFlag: {
                    type: DataTypes.BOOLEAN
                },
                timeToFlag: {
                    type: DataTypes.BOOLEAN
                },
                indYesOrNoFlag: {
                    type: DataTypes.BOOLEAN
                },
                amountFlag: {
                    type: DataTypes.BOOLEAN
                },
                currencyFlag: {
                    type: DataTypes.BOOLEAN
                },
                appTypeFlag: {
                    type: DataTypes.BOOLEAN
                },
                textFlag: {
                    type: DataTypes.BOOLEAN
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await facilitytypologies.sync({ alter: true } )

            data.facilityTypologies.forEach(async (facilityTypologie) => {  
                try {                    
                    // const registro = {
                    //     code               : facilityTypologie.code,
                    //     description        : facilityTypologie.description.content,
                    //     languaje           : facilityTypologie.description.languageCode
                    // }
                    await facilitytypologies.create(facilityTypologie);
                } catch (error) {
                    //console.log(error);
                }

            });

            res.status(201).json({
                msg: `facilitytypologies Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//facilities
router.get( `/hotel-content-api/types/facilities`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/facilities`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 1000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const facilities = BD_APTITUDE.define('facilities', {
                code: {
                    type: DataTypes.INTEGER,
                    // primaryKey: true,
                },
                facilityGroupCode: {
                    type: DataTypes.INTEGER
                },
                facilityTypologyCode: {
                    type: DataTypes.INTEGER
                },
                description: {
                    type: DataTypes.STRING
                },
                languageCode: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await facilities.sync({ alter: true } )

            data.facilities.forEach(async (facilitie) => {  
                try {                    
                    const registro = {
                        code               : facilitie.code,
                        facilityGroupCode        : facilitie.facilityGroupCode,
                        facilityTypologyCode           : facilitie.facilityTypologyCode,
                        description           : facilitie.description.content,
                        languageCode           : facilitie.description.languageCode
                    }
                    await facilities.create(registro);
                } catch (error) {
                    //console.log(error);
                }

            });

            res.status(201).json({
                msg: `facilities Insertados`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

// - - - - - LOCATIONS - - - - -
//countries
router.get( `/hotel-content-api/locations/countries`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/locations/countries`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 300,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //// console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const countries = BD_APTITUDE.define('countries', {
                code: {
                    type: DataTypes.STRING,
                    // primaryKey: true,
                },
                isoCode: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                languageCode: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });
          
            const states = BD_APTITUDE.define('states', {
                code: {
                    type: DataTypes.STRING,
                    // primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                countrie: {
                    type: DataTypes.STRING
                },
                languageCode: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await countries.sync({ alter: true } )
            await states.sync({ alter: true } )

            data.countries.forEach(async (countrie) => {  
                try {                    
                    const registro = {
                        code               : countrie.code,
                        isoCode            : countrie.isoCode,
                        description        : countrie.description.content,
                        languageCode       : countrie.description.languageCode
                    }
                    if ( await countries.create(registro) ) {
                        countrie.states.forEach(async (state) => {
                            const newState = {
                                code: state.code,
                                name: state.name,
                                countrie: countrie.isoCode,
                                languageCode: countrie.description.languageCode
                            }
                            await states.create(newState)
                        });
                    }
                    
                } catch (error) {
                    //console.log(error);
                }

            });

            res.status(201).json({
                msg: `countries insert`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//countries
router.get( `/hotel-content-api/locations/destinations`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/locations/destinations`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 6001,
            to: 7000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
        .then(async (response) => {
            // handle success
            //// console.log(response);
            // res.json(response.data);
            const {data} = response

            const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
                host: 'localhost',
                port: '3306',
                dialect: 'mysql',
                // logging: false
            })

            const destinations = BD_APTITUDE.define('destinations', {
                code: {
                    type: DataTypes.STRING,
                    // primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                countryCode: {
                    type: DataTypes.STRING
                },
                isoCode: {
                    type: DataTypes.STRING
                },
                languageCode:{
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });
          
            const zones = BD_APTITUDE.define('zones', {
                zoneCode: {
                    type: DataTypes.STRING,
                    // primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                description: {
                    type: DataTypes.STRING
                },
                groupZones: {
                    type: DataTypes.STRING
                },
                languageCode: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });
            
            const groupZones = BD_APTITUDE.define('groupZones', {
                groupZoneCode: {
                    type: DataTypes.STRING,
                    // primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                languageCode: {
                    type: DataTypes.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName: true //Nombre definido es igual al de la tabla
            });

            await destinations.sync({ alter: true } )
            await zones.sync({ alter: true } )
            await groupZones.sync({ alter: true } )

            data.destinations.forEach(async (destination) => {  
                try {                    
                    const registro = {
                        code               : destination.code,
                        name            : destination.name.content,
                        countryCode        : destination.countryCode,
                        isoCode       : destination.isoCode,
                        languageCode       : destination.name.languageCode
                    }
                    if ( await destinations.create(registro) ) {
                        destination.groupZones.forEach(async (groupZone) => {
                            const newGroupZone = {
                                groupZoneCode: groupZone.groupZoneCode,
                                name: groupZone.name.content,
                                destination: destination.code,
                                languageCode: destination.name.languageCode
                            }
                            await groupZones.create(newGroupZone)                          
                        });
                        destination.zones.forEach(async (zone) => {
                            const newzone = {
                                zoneCode: zone.zoneCode,
                                name: zone.name,
                                description: zone.description.content,
                                languageCode: zone.description.languageCode
                            }
                            await zones.create(newzone)                          
                        });
                    }
                    
                } catch (error) {
                    //console.log(error);
                }

            });

            res.status(201).json({
                msg: `destinations insert`
            });

        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            res.status(401).json({
                msg: error.message
            })
        })
        .then(function () {
            // always executed
        });

});

//currencies
router.get( `/hotel-content-api/types/currencies`,  async (req, res) => {
//Begin UTC creation
var utcDate = Math.floor(new Date().getTime() / 1000);
//Begin Signature Assembly
var publicKey = 'jjvkxx2mcjwntezukq42nf36';
var privateKey = 'yE5Esb8a5x';
var assemble = (publicKey+privateKey+utcDate);
//Begin SHA-256 Encryption
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update(assemble).digest('hex');
const XSignature= hash

axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/currencies`,{
    params: {
        fields: 'all',
        language: 'CAS',
        from: 1,
        to: 200,
        useSecondaryLanguage: true,
        // lastUpdateTime
    },
    headers: {
        'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
        'X-Signature': XSignature,
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip'
    }
})
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: 'localhost',
            port: '3306',
            dialect: 'mysql',
            // logging: false
        })

        const currencies = BD_APTITUDE.define('currencies', {
            code: {
                type: DataTypes.STRING,
                // primaryKey: true,
            },
            description: {
                type: DataTypes.STRING
            },
            currencyType: {
                type: DataTypes.STRING
            },
            languageCode:{
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true //Nombre definido es igual al de la tabla
        });

        await currencies.sync({ alter: true } );

        data.currencies.forEach(async (currencie) => {  
            try {                    
                const registro = {
                    code               : currencie.code,
                    description            : currencie.description.content,
                    currencyType        : currencie.currencyType,
                    languageCode       : currencie.description.languageCode
                }

                await currencies.create(registro)
                
            } catch (error) {
                //console.log(error);
            }

        });


        res.status(201).json({
            msg: `currencies insert`
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//promotions
router.get( `/hotel-content-api/types/promotions`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/promotions`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 200,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: 'localhost',
            port: '3306',
            dialect: 'mysql',
            // logging: false
        })

        const promotions = BD_APTITUDE.define('promotions', {
            code: {
                type: DataTypes.STRING,
                // primaryKey: true,
            },
            description: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            },
            languageCode:{
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true //Nombre definido es igual al de la tabla
        });

        await promotions.sync({ alter: true } );

        data.promotions.forEach(async (promotion) => {  
            try {                    
                const registro = {
                    code               : promotion.code,
                    description            : promotion.description.content,
                    name        : promotion.name.content,
                    languageCode       : promotion.description.languageCode
                }

                await promotions.create(registro)
                
            } catch (error) {
                //console.log(error);
            }

        });

        res.status(201).json({
            msg: `promotions insert`
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//boards - Regimens
router.get( `/hotel-content-api/types/boards`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/boards`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 200,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: 'localhost',
            port: '3306',
            dialect: 'mysql',
            // logging: false
        })

        const boards = BD_APTITUDE.define('boards', {
            code: {
                type: DataTypes.STRING,
                // primaryKey: true,
            },
            description: {
                type: DataTypes.STRING
            },
            multiLingualCode: {
                type: DataTypes.STRING
            },
            languageCode:{
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true //Nombre definido es igual al de la tabla
        });

        await boards.sync({ alter: true } );

        data.boards.forEach(async (board) => {  
            try {                    
                const registro = {
                    code               : board.code,
                    description            : board.description.content,
                    multiLingualCode        : board.multiLingualCode,
                    languageCode       : board.description.languageCode
                }

                await boards.create(registro)
                
            } catch (error) {
                //console.log(error);
            }

        });

        res.status(201).json({
            msg: `boards insert`
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//Rooms
router.get( `/hotel-content-api/types/rooms`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/rooms`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 11001,
            to: 12000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: 'localhost',
            port: '3306',
            dialect: 'mysql',
            // logging: false
        })

        const rooms = BD_APTITUDE.define('rooms', {
            code: {
                type: DataTypes.STRING,
                // primaryKey: true,
            },
            type: {
                type: DataTypes.STRING
            },
            characteristic: {
                type: DataTypes.STRING
            },
            minPax:{
                type: DataTypes.INTEGER
            },
            maxPax:{
                type: DataTypes.INTEGER
            },
            maxAdults:{
                type: DataTypes.INTEGER
            },
            maxChildren:{
                type: DataTypes.INTEGER
            },
            minAdults:{
                type: DataTypes.INTEGER
            },
            description:{
                type: DataTypes.STRING
            },
            typeDescription:{
                type: DataTypes.STRING
            },
            characteristicDescription:{
                type: DataTypes.STRING
            },
            languageCode:{
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true //Nombre definido es igual al de la tabla
        });

        await rooms.sync({ alter: true } );

        data.rooms.forEach(async (room) => {  
            try {                    
                const registro = {
                    code    :   room.code,
                    type    :   room.type,
                    characteristic  :   room.characteristic,
                    minPax  :   room.minPax,
                    maxPax  :   room.maxPax,
                    maxAdults   :   room.maxAdults,
                    maxChildren :   room.maxChildren,
                    minAdults   :   room.minAdults,
                    description :   room.description,
                    typeDescription :   room.typeDescription.content,
                    characteristicDescription   :   room.characteristicDescription.content,
                    languageCode    :   room.typeDescription.languageCode
                }

                await rooms.create(registro)
                
            } catch (error) {
                //console.log(error);
            }

        });

        res.status(201).json({
            msg: `rooms insert`
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//issues
router.get( `/hotel-content-api/types/issues`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/issues`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1,
            to: 1000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: 'localhost',
            port: '3306',
            dialect: 'mysql',
            // logging: false
        })

        const issues = BD_APTITUDE.define('issues', {
            code: {
                type: DataTypes.STRING,
                // primaryKey: true,
            },
            type: {
                type: DataTypes.STRING
            },
            description:{
                type: DataTypes.STRING
            },
            name:{
                type: DataTypes.STRING
            },
            alternative:{
                type: DataTypes.BOOLEAN
            },
            languageCode:{
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true //Nombre definido es igual al de la tabla
        });

        await issues.sync({ alter: true } );

        data.issues.forEach(async (issue) => {  
            try {                    
                const registro = {
                    code    :   issue.code,
                    type    :   issue.type,
                    description  :   issue.description.content,
                    name  :   issue.name.content,
                    alternative  :   issue.alternative,
                    languageCode   :   issue.description.languageCode
                }

                await issues.create(registro)
                
            } catch (error) {
                //console.log(error);
            }

        });

        res.status(201).json({
            msg: `issues insert`
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//terminals
router.get( `/hotel-content-api/types/terminals`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/terminals`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 1001,
            to: 2000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: 'localhost',
            port: '3306',
            dialect: 'mysql',
            // logging: false
        })

        const terminals = BD_APTITUDE.define('terminals', {
            code: {
                type: DataTypes.STRING,
                // primaryKey: true,
            },
            type: {
                type: DataTypes.STRING
            },
            country:{
                type: DataTypes.STRING
            },
            name:{
                type: DataTypes.STRING
            },
            description:{
                type: DataTypes.STRING
            },
            languageCode:{
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true //Nombre definido es igual al de la tabla
        });

        await terminals.sync({ alter: true } );

        data.terminals.forEach(async (terminal) => {  
            try {                    
                const registro = {
                    code    :   terminal.code,
                    type    :   terminal.type,
                    country  :   terminal.country,
                    name  :   terminal.name.content,
                    description  :   terminal.description.content,
                    languageCode   :   terminal.name.languageCode
                }

                await terminals.create(registro)
                
            } catch (error) {
                //console.log(error);
            }

        });

        res.status(201).json({
            msg: `terminals insert`
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//RateComments
router.get( `/hotel-content-api/types/ratecomments`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/types/ratecomments`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 9001,
            to: 10000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: process.env.HOST_MYSQL,
            port: process.env.PORT_MYSQL,
            // port: '8889',
            dialect: 'mysql',
            // logging: false
        })

        const ratecomments = BD_APTITUDE.define('ratecomments', {
            incoming:        {type: DataTypes.INTEGER},
            hotel:           {type: DataTypes.INTEGER},
            code:            {type: DataTypes.STRING},            
        },
        {
            timestamps: false,
            freezeTableName: true 
        });
        
        const rateCodes = BD_APTITUDE.define('rateCodes', {
            rateCodes:        {type: DataTypes.INTEGER},
            code:            {type: DataTypes.STRING}
        },
        {
            timestamps: false,
            freezeTableName: true 
        });

        const comments = BD_APTITUDE.define('comments', {
            dateEnd:        {type: DataTypes.DATE},
            dateStart:      {type: DataTypes.DATE},
            description:    {type: DataTypes.STRING(1000)},
            code:           {type: DataTypes.STRING},
            languageCode:   {type: DataTypes.STRING}
        },
        {
            timestamps: false,
            freezeTableName: true 
        });

        await ratecomments.sync({ alter: true } );
        await rateCodes.sync({ alter: true } );
        await comments.sync({ alter: true } );

        data.rateComments.forEach(async (ratecomment) => {  
            try {                    
                const registroRateComment = {
                    incoming    :   ratecomment.incoming,
                    hotel       :   ratecomment.hotel,
                    code        :   ratecomment.code,
                }
                if (await ratecomments.create(registroRateComment)) {
                    if (ratecomment.commentsByRates.length > 0) {
                        ratecomment.commentsByRates.forEach(async (commentsByRates) => {
                            commentsByRates.rateCodes.forEach(async(rateCode) => {
                                const registrorateCode = { rateCodes:rateCode, code : ratecomment.code }
                                await rateCodes.create(registrorateCode)
                            });
                            commentsByRates.comments.forEach(async(comment) => {
                                let description =  comment.description.toString();
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                description =  description.replace("\n", " <br/> "); 
                                // description =  description.replace("'", "");  
                                // description =  description.replace("'", "");  
                                  
                                // console.log(description);

                                const registroComment = { 
                                    dateEnd: comment.dateEnd, 
                                    dateStart : comment.dateStart, 
                                    description,
                                    code : ratecomment.code,
                                    languageCode : 'CAS',
                                }
                                // console.log(registroComment);
                                try {                                    
                                    await comments.create(registroComment)
                                } catch (error) {
                                    //console.log(error);
                                }
                            });
                        });
                    }
                }                
                
            } catch (error) {
                //console.log(error);
            }

        });

        res.status(201).json({
            msg: `ratecomments insert`
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//Hotels
router.get( `/hotel-content-api/hotels`,  async (req, res) => {

    axios.get(`https://api.hotelbeds.com/hotel-content-api/1.0/hotels`,{
        params: {
            fields: 'all',
            language: 'CAS',
            from: 3001,
            to: 4000,
            useSecondaryLanguage: true,
            // lastUpdateTime
        },
        headers: {
            'Api-key': 'jjvkxx2mcjwntezukq42nf36', 
            'X-Signature': XSignature,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip'
        }
    })
    .then(async (response) => {
        const {data} = response;

        const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
            host: process.env.HOST_MYSQL,
            port: process.env.PORT_MYSQL,
            // port: '8889',
            dialect: 'mysql',
            // logging: false
        })

        const hotels = BD_APTITUDE.define('hotels', {
            code:                  {type: DataTypes.INTEGER},
            name:                  {type: DataTypes.STRING},
            description:           {type: DataTypes.STRING(10000)},
            countryCode:           {type: DataTypes.STRING},
            stateCode:             {type: DataTypes.STRING},
            destinationCode:       {type: DataTypes.STRING},
            zoneCode:              {type: DataTypes.INTEGER},
            // coordinate_lat:        {type: DataTypes.DOUBLE},
            // coordinate_lng:        {type: DataTypes.DOUBLE},
            coordinates:        {type: DataTypes.JSON},
            exclusiveDeal:         {type: DataTypes.INTEGER},
            categoryCode:          {type: DataTypes.STRING},
            categoryGroupCode:     {type: DataTypes.STRING},
            chainCode:            {type: DataTypes.STRING},
            accommodationTypeCode: {type: DataTypes.STRING},

            boardCodes:           {type: DataTypes.STRING},
            segmentCodes:          {type: DataTypes.STRING},
            amenityCodes:          {type: DataTypes.STRING},

            address:        {type: DataTypes.JSON},
            // address_street:        {type: DataTypes.STRING},
            // address_number:        {type: DataTypes.STRING},
            postalCode:            {type: DataTypes.STRING},
            city:                  {type: DataTypes.STRING},
            email:                {type: DataTypes.STRING},
            license:              {type: DataTypes.STRING},

            phones:                {type: DataTypes.JSON},
            rooms:                 {type: DataTypes.JSON},
            facilities:            {type: DataTypes.JSON},
            terminals:            {type: DataTypes.JSON},
            issues:               {type: DataTypes.JSON},
            interestPoints:       {type: DataTypes.JSON},
            images:                {type: DataTypes.JSON},
            wildcards:            {type: DataTypes.JSON},

            web:                  {type: DataTypes.STRING},
            lastUpdate:            {type: DataTypes.DATE},
            S2C:                  {type: DataTypes.STRING},
            ranking:               {type: DataTypes.INTEGER},         
        },
        {
            timestamps: false,
            freezeTableName: true 
        });

        await hotels.sync({ alter: true } );
        // await rateCodes.sync({ alter: true } );
        // await comments.sync({ alter: true } );

        data.hotels.forEach(async (hotel) => {  
            try {                    
                const registroHotel = {
                    code:                  hotel.code,
                    name:                  hotel.name.content,
                    description:           hotel.description.content,
                    countryCode:           hotel.countryCode,
                    stateCode:             hotel.stateCode,
                    destinationCode:       hotel.destinationCode,
                    zoneCode:              hotel.zoneCode,
                    coordinates:           hotel.coordinates,
                    exclusiveDeal:         hotel.exclusiveDeal,
                    categoryCode:          hotel.categoryCode,
                    categoryGroupCode:     hotel.categoryGroupCode,
                    chainCode:             hotel?.chainCode,
                    accommodationTypeCode: hotel.accommodationTypeCode,

                    boardCodes:            hotel.boardCodes?.toString(),
                    segmentCodes:          hotel.segmentCodes.toString(),
                    amenityCodes:          hotel.amenityCodes?.toString(),
                    address:        hotel.address,
                    postalCode:            hotel.postalCode,
                    city:                  hotel.city.content,
                    email:                hotel?.email,
                    license:              hotel?.license,
                    phones:               hotel.phones,
                    rooms:                 hotel.rooms,
                    facilities:            hotel.facilities,
                    terminals:            hotel?.terminals,
                    issues:               hotel?.issues,
                    interestPoints:       hotel?.interestPoints,
                    images:                hotel?.images,
                    wildcards:            hotel?.wildcards,
                    web:                  hotel?.web,
                    lastUpdate:           hotel.lastUpdate,
                    S2C:                  hotel?.S2C,
                    ranking:              hotel.ranking
                }
                
                await hotels.create(registroHotel)
                    
                           
                
            } catch (error) {
                //console.log(error);
            }

        });

        res.status(201).json({
            msg: `hotels insert`,
            data
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(401).json({
            msg: error.message
        })
    })
    .then(function () {
        // always executed
    });
});

//Availability Hotels by code
router.post( `/hotels`,  async (req, res) => {

    // const url = `https://api.hotelbeds.com/hotel-api/1.0/hotels`;
    const url = `https://api.test.hotelbeds.com/hotel-api/1.0/hotels`;
    const headers = {
        // "Api-key": 'jjvkxx2mcjwntezukq42nf36', 
        "Api-key": 'afb41e1516486b8a3b177a7addd4dbd6', 
        "X-Signature": '5a6f017b840bb0bda18da5c192c5e778f8dd2c34455a9dae0e1d2b596eb99745',
        // "X-Signature": XSignature,
        "Accept": 'application/json',
        // "Accept-Encoding": 'gzip',
        "Content-Type": 'application/json'
    }
    const body = {
        "platform": 17,
        "stay": {
            "checkIn": "2022-07-01",
            "checkOut": "2022-07-02",
            "shiftDays": null
        },
        "occupancies": [
            {
                "rooms": 1,
                "adults": 2,
                "children": 0,
                "paxes": [
                    {
                        "roomId": null,
                        "type": "AD",
                        "age": "30",
                        "name": null,
                        "surname": null
                    },
                    {
                        "roomId": null,
                        "type": "AD",
                        "age": "30",
                        "name": null,
                        "surname": null
                    }
                ]
            }
        ],
        "hotels": {
            "hotel": [
                637422,
                148766,
                22462,
                198796,
                283593,
                3999,
                595504,
                7889,
                626901,
                160938,
                169223,
                99433,
                94124,
                429018,
                161796,
                416918,
                388541,
                3892,
                365627,
                26720,
                6881,
                578289,
                128674,
                73481,
                140257,
                8152,
                5178,
                216587,
                370161,
                127828,
                457981,
                150816,
                155726,
                558621,
                8387,
                596682,
                632823,
                146776,
                7892,
                3902,
                503041,
                5185,
                213669,
                3688,
                388055,
                146700,
                20158,
                161795,
                5183,
                177454,
                545761,
                14551,
                132480,
                429440,
                188472,
                7895,
                8384,
                74705,
                183273,
                673877,
                107117,
                86017,
                187909,
                148765,
                132664,
                8301,
                155197,
                134311,
                8503,
                219422,
                457081,
                14447,
                3690,
                4895,
                555961,
                6880,
                140885,
                8567,
                641453,
                546202,
                547441,
                3900,
                125857,
                3931,
                130214,
                150997,
                6885,
                84920,
                387055,
                192349,
                8545,
                8540,
                545262,
                28730,
                85496,
                18920,
                59159,
                4000,
                8382,
                8410,
                3969,
                3677,
                17294,
                79470,
                8362,
                8385,
                140963,
                15242,
                369559,
                4001,
                662498,
                646488,
                198910,
                212588,
                17056,
                411378,
                8242,
                663112,
                75080,
                1918,
                7896,
                92664,
                162748,
                162749,
                645773,
                34963,
                116413,
                392065,
                198828,
                113416,
                54973,
                135692,
                148442,
                183010,
                107361,
                637596,
                134150,
                143954,
                4894,
                549841,
                160937,
                161374,
                55373,
                209473,
                140895,
                8581,
                8011,
                205388,
                75399,
                644442,
                7900,
                642401,
                172388,
                17285,
                179187,
                181628,
                458061,
                8383,
                1921,
                3898,
                629645,
                583086,
                228302,
                7893,
                7847,
                5186,
                7849,
                5403,
                549002,
                666232,
                675670,
                614802,
                633084,
                590824,
                706644,
                706596,
                450737,
                714599,
                728186,
                67179,
                728184,
                739510,
                421618,
                657605,
                655067,
                728183,
                748158,
                666091,
                505321,
                449640,
                545241,
                656053,
                590823,
                675136,
                751653,
                741497,
                810752,
                411483,
                607348,
                675973,
                711362,
                858195,
                411420,
                4718,
                884626,
                858221,
                884627,
                881785,
                884579,
                887317,
                700688,
                859011,
                883505,
                645399,
                678004,
                886375,
                151393,
                912740,
                887319,
                596681
            ],
            "hotels": null,
            "checkIn": null,
            "total": 0,
            "checkOut": null
        },
        "rooms": null,
        "keywords": null,
        "accommodations": null,
        "boards": null,
        "reviews": null,
        "filter": {
            "minRate": null,
            "maxRate": null,
            "minCategory": null,
            "maxCategory": null,
            "paymentType": "AT_WEB",
            "maxRatesPerRoom": null,
            "packaging": false,
            "hotelPackage": "BOTH",
            "maxRooms": null
        },
        "dailyRate": true,
        "sourceMarket": "MX",
        "language": "CAS"
    }
    const options = {
        // baseURL: url,
        url,
        method: 'POST',
        headers,
        // data: {},
        // body,
        // data: body,        
        data:qs.stringify(body),
        timeout: 15000,
        // responseType: 'json'
    }

    // const intance = axios.create({
    //     baseURL: `https://api.hotelbeds.com/hotel-api/1.0/hotels`,
    //     headers,
    //     data:qs.stringify(body)
    // });

    // const resp = await intance.post()    

    
    // axios.post('https://api.hotelbeds.com/hotel-api/1.0/hotels',qs.stringify(body),{headers})
    // axios.post(url,{body},{headers})
    axios(options)
    // axios.post(url, qs.stringify(body), {headers})
    // axios.post(url, qs.stringify(body), options)
    
    .then(async (response) => {
        
        // const BD_APTITUDE = new Sequelize('OTA_Aptitude', process.env.USER_MYSQL, process.env.PASS_MYSQL, {
        //     host: 'localhost',
        //     port: '3306',
        //     dialect: 'mysql',
        //     logging: true
        // })
        // const hotels_table = BD_APTITUDE.define('hotels')
        // const { hotels } = response.hotels;

        // hotels.forEach(hotel => {
        //     const attributes = hotels_table.findOne({
        //         attributes: ['images', 'coordinates'],
        //         where: {
        //             code: hotel.code
        //       }
        //     })
        //     console.log(attributes);
        // });

        res.status(201).json({
            response
        });

    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        res.status(404).json(error)
    })
    
});

module.exports = router;