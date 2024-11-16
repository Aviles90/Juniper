const {CarritosShop, EstadosCarrito} = require('./carritoShop');
const {MetodosPago} = require('./metodosPago');
const {CanalesVenta} = require('./canales');
const {Ventas} = require('./ventas');
const {Seguimientos} = require('./seguimientos');
const {Pipes} = require('./pipes');
const {Etapas} = require('./etapas');
const {Historial} = require('./historial');

module.exports = {
    CarritosShop,
    MetodosPago,
    CanalesVenta,
    Ventas,
    Seguimientos,
    Pipes,
    Etapas,
    Historial,
    EstadosCarrito
}