/*
const { Categoria, Role, Usuario, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la BD`)
    }
} 
const esEmailValido = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la BD`)
    }
} 
const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
} 

const existeCategoriaporId = async(id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
} 

const existeProductoporId = async(id = '') => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
} 

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) =>{
    const incluida = colecciones.includes(coleccion)
    if (!incluida) {
        throw new Error(`La colección ${coleccion}, no es permitida . ${colecciones}`);
    }

    return true;
}
*/

// const validarDatosConexion = (host = '', port = '', base = '', user = '', pass = '') =>{    
//     if (!host && !port && !base && !user && !pass) {
//         throw new Error(`Revisa los datos de conexión`);
//     }

//     return true;
// }

module.exports = {
    /*
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId,
    existeCategoriaporId,
    existeProductoporId,
    coleccionesPermitidas
    */
    // validarDatosConexion
}