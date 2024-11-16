const express = require('express')
// const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors')

const fileUpload = require('express-fileupload');
// const { mainDB } = require('../database/connectionMySQL');
// const { initializeSocket } = require('./socket'); // Importa la función para inicializar el socket

class Server {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT;

        this.paths = {            
            juniper : '/api/juniper'
            // ota : '/api/ota/aptitude',
        }

        //Conectar a BD
        // this.conectarDB();


        //Middlewares
        this.middlewares();
        // Rutas
        this.routes();
        //Sockets
        // this.sockets();
    }

    async conectarDB() {// aqui s eoueden conectar varias bases de datos
        // await dbConnection(); //BD mongo
        try {

            await mainDB.authenticate();
            console.log('Database online');

        } catch (error) {
            //console.log(error);
            throw new Error('Error al inicializar la base de datos')
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        // Parseo y lectura del body
        this.app.use(express.json());
        //Directorio publico
        //this.app.use( express.static('public') );

        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.paths.juniper, require('../routes/juniper'))
        // this.app.use(this.paths.ota, require('../routes/ota/aptitude/content-api'))
    }

    // sockets() {
    //     // Inicializar Socket.IO con el servidor HTTP
    //     initializeSocket(this.server);
    // }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Ejecutando en puerto ${this.port}`)
        })
    }
}

module.exports = Server;