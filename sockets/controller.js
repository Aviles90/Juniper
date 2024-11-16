const { Usuarios } = require('./chat/class/usuarios');
const pruebasConeccionSocket = require('./pruebas');
// const { crearMensaje } = require('./chat/utils/utilidades');

const usuarios = new Usuarios();

const socketController = (cliente = Socket, io) => {

    console.log('Nuevo cliente conectado:', cliente.id);

    // cliente.on('prueba-conexion', (payload, callback) => {
    //     console.log(payload);
    //     cliente.emit('prueba-conexion', payload);

    // });

    // cliente.on('get-usuarios-sala', (payload, callback) =>{
    //     console.log(payload);
    //     // cliente.emit('mensaje-nuevo', data);
    //     callback({
    //         ok : true,
    //         mensaje : `obteniendo lista de usuarios de la sala ${payload.sala}`
    //     })
    // })

    // cliente.on('configurar-usuario', ( payload , callback) => {
    //     console.log(payload);
    //     callback({
    //         ok : false,
    //         mensaje : `Usuario ${payload.email}, configurado`
    //     })
    // })


    // cliente.on('entrarChat', (data, callback) => {
    //     if ( !data.nombre || !data.sala ) {
    //         return callback({
    //             error: true,
    //             mensaje: 'El nombre/sala es necesario'
    //         })
    //     }

    //     cliente.join(data.sala);

    //     // let personas = usuarios.agregarPersona( cliente.id, data.nombre, data.sala);
    //     usuarios.agregarPersona( cliente.id, data.nombre, data.sala);

    //     cliente.broadcast.to(data.sala).emit('listaPersona',usuarios.getPersonasPorSala(data.sala));
    //     cliente.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } se unió`))
    //     // callback(personas);
    //     callback(usuarios.getPersonasPorSala(data.sala));
    // });

    /*
    cliente.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(cliente.id);

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        cliente.broadcast.to(persona.sala).emit( 'crearMensaje', mensaje );

        callback(mensaje);

    })

    */
    cliente.on('disconnect', () => {
    // cliente.on('disconnect', () => {
        console.log('cliente desconectado');
        // let personaBorrada = usuarios.borrarPersona( cliente.id );
        // cliente.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`))
        // cliente.broadcast.to(personaBorrada.sala).emit('listaPersona',usuarios.getPersonasPorSala(personaBorrada.sala));

    })

    /*
    //Mensajes privados
    cliente.on('mensajePrivado', data => {
        let persona = usuarios.getPersona( cliente.id );
        cliente.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje(persona.nombre, data.mensaje) )
    })

    */
}

module.exports = { socketController }
