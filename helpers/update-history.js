const { Historial } = require("../models/instalations/ventas/historial")

const createHistory = async (db, comentario, usuario, venta, seguimiento, etapa) => {

    try {
        const newHitory = await Historial(db).create({
            comentario,
            usuario, 
            venta, 
            seguimiento, 
            etapa
        })

        if (newHitory.id) {
            return true;
        }else{
            return false;
        }
    
    } catch (error) {
        console.log(error);        
        return false
    }
}

module.exports = {createHistory}