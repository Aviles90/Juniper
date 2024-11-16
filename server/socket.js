const { Server } = require('socket.io');
let io = null;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: true, credentials: true },
  });  

  const clients = {}; // Objeto para almacenar el estado de los clientes

  io.on('connection', (socket) => {
    // const socketId = socket.id;
    console.log('Cliente conectado:', socket.id);
    
     // Emitir el socket.id al cliente cuando se conecte
    //  socket.to(socket.id).emit('socketId', {socketId: socket.id });
    
    let usuariosSala = []

    // Unirse a una sala específica cuando se crea un nuevo pedido
    socket.on('joinOrderRoom', (payload, callback) => {
      const {id_venta, id_cliente, id_proveedor} = payload;

      if (!id_venta) {
        callback({
          ok: false,
          data : {socketId : socket.id},
          msg : 'id_venta no encontrado en el payload'
        })
      }else{       
  
        let persona = { socketId:socket.id, id_cliente, id_proveedor, sala: payload.id_venta};
        let user = usuariosSala.filter( usuario => usuario.socketId == socket.id );
        
        if (user.length == 0) {
          socket.join(id_venta); // Crear o unirse a la sala con el id de la venta
          console.log(`Usuario se une a la sala de la venta: ${id_venta}`);
          usuariosSala.push(persona)
        }
  
        // socket.broadcast.to(payload.id_venta).emit('OrderRoom',clients);
        console.log(usuariosSala);
        
  
        callback({
          ok: true,
          data: usuariosSala,
          // data : {socketId : socket.id},
          msg: `Conectado a la sala`
        })
      }


    });

    // Notificar a todos en la sala cuando haya un evento (por ejemplo, pedido aceptado)
    socket.on('orderUpdate', (orderId, updateData) => {
      console.log(`Actualización del pedido en la sala ${orderId}:`, updateData);
      io.to(orderId).emit('orderUpdated', updateData); // Enviar la actualización a todos en la sala
    });

    // Configuración de eventos
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);      
      usuariosSala = usuariosSala.filter( usuario => usuario.socketId != socket.id );
      console.log('usuariosSala', usuariosSala);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO no ha sido inicializado. Llama a initializeSocket primero.');
  }
  return io;
};

module.exports = { initializeSocket, getIO };