const {
    Zona_nivel_4,
    Zona_nivel_3,
    Zona_nivel_2,
    Zona_nivel_1,
} = require('./direcciones');

const {
    Clientes
} = require('./clientes');

const {
    dataBases
} = require('./dataBases');
const { Contactos } = require('./contactos-clientes');


module.exports = {
    dataBases,
    Zona_nivel_4,
    Zona_nivel_3,
    Zona_nivel_2,
    Zona_nivel_1,
    Clientes,
    Contactos
}