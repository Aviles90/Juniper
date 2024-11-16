const { connApi } = require("../../database/connectionMySQL");

/**
    Consultas utilizadas en diferentes partes del código
*/

const getVentaQuery = async (db, id_venta) => {
    try {

        /*
        let query = `SELECT 
                    v.id as id_venta
                    , v.id_transaction
                    , v.client_secret
                    , v.canal as id_canal
                    , v.estado as estado_venta
                    , cv.canal
                    , v.createdAt
                    , v.updatedAt
                    , c.id as id_cliente
                    , c.nombre as nombre_cliente
                    , c.ape_paterno as ape_paterno_cliente
                    , c.ape_materno as ape_materno_cliente
                    , c.telefono as telefono_cliente
                    , c.email_cliente
                    , c.foto as foto_cliente
                    , cs.id as id_carrito
                    , cs.unidades
                    , cs.id_producto
                    , p.producto 
                    , p.foto as foto_producto 
                    , p.id_proveedor
                    , p2.nombre_proveedor
                    , p2.calle as direccion
                    , p2.latitud_proveedor 
                    , p2.longitud_proveedor 
                    , p2.referencia_direccion_es 
                    , p2.foto as foto_proveedor
                    , cs.id_servicio
                    , cs.precio_venta
                    , cs.comision
                    , cs.estado as id_estado_carrito
                    , cc2.id as id_contacto
                    , cc2.nombre_contacto 
                    , cc2.ape_paterno as ape_paterno_contacto
                    , cc2.ape_materno as ape_materno_contacto
                    , cc2.alias as alias_contacto
                    , cc2.email_contacto 
                    , cc2.telefono_contacto 
                    , cc2.direccion as direccion_contacto
                    , cc2.latitud_contacto 
                    , cc2.longitud_contacto 
                    , ec.estado as estado_carrito
                    , dc.id as id_detalle
                    , dc.concepto
                    , dc.descripcion
                    , dc.unidades as unidades_detalles
                    , dc.precio_unitario as precio_unitario_detalle
                    , dc.total as total_detalle
                    , dc.id_segmento_producto_adicional
                    , (select sum(cs2.precio_venta) from carritos_shop cs2 where cs2.id_venta = cs.id_venta) as precio_venta_total
                    , (select sum(dc.total) from detalles_carrito dc where dc.id_venta = cs.id_venta) as precio_venta_complementos
                    , COALESCE ( (select e.etapa from historial h 
                        left join etapas e ON h.etapa = e.id 
                        where h.venta= cs.id_venta and h.createdAt = (SELECT MAX(h2.updatedAt) from historial h2 where h2.venta = cs.id_venta)
                        limit 1), 'Por confirmar') as etapa
                    , COALESCE ( (select e.id from historial h 
                    left join etapas e ON h.etapa = e.id 
                    where h.venta= cs.id_venta and h.createdAt = (SELECT MAX(h2.updatedAt) from historial h2 where h2.venta = cs.id_venta)
                    limit 1), '0') as etapaId
                    from ventas v 
                    left join clientes c  on v.cliente = c.id
                    left join canales_venta cv on v.canal = cv.id 
                    left join carritos_shop cs on v.id = cs.id_venta
                    left join estado_carrito ec on cs.estado = ec.id
                    left join contactos_carrito cc on cs.id = cc.id_carrito
                    left join productos p on cs.id_producto = p.id
                    left join proveedores p2 on p.id_proveedor = p2.id
                    left join contactos_clientes cc2 on cc.id_contacto  = cc2.id
                    left join detalles_carrito dc  on cs.id  = dc.id_carrito
                    where v.id = ${id_venta}`*/

        let query = `SELECT v.id as id_venta
                    , v.id_transaction
                    , v.client_secret
                    , v.canal as id_canal
                    , v.estado as estado_venta
                    , cv.canal
                    , v.createdAt
                    , v.updatedAt
                    , c.id as id_cliente
                    , c.nombre as nombre_cliente
                    , c.ape_paterno as ape_paterno_cliente
                    , c.ape_materno as ape_materno_cliente
                    , c.telefono as telefono_cliente
                    , c.email_cliente
                    , c.foto as foto_cliente
                    , cs.id as id_carrito
                    , cs.unidades
                    , cs.id_producto
                    , p.producto 
                    , p.foto as foto_producto 
                    , p.id_proveedor
                    , p2.nombre_proveedor
                    , p2.calle as direccion
                    , p2.latitud_proveedor 
                    , p2.longitud_proveedor 
                    , p2.referencia_direccion_es 
                    , p2.foto as foto_proveedor
                    , cs.id_servicio
                    , cs.precio_venta
                    , cs.comision
                    , cs.estado as id_estado_carrito
                    , cs.descripcion as comentario
                    , cc2.id as id_contacto
                    , cc2.nombre_contacto 
                    , cc2.ape_paterno as ape_paterno_contacto
                    , cc2.ape_materno as ape_materno_contacto
                    , cc2.alias as alias_contacto
                    , cc2.email_contacto 
                    , cc2.telefono_contacto 
                    , cc2.direccion as direccion_contacto
                    , cc2.latitud_contacto 
                    , cc2.longitud_contacto 
                    , ec.estado as estado_carrito
                    , dc.id as id_detalle
                    , dc.concepto
                    , dc.descripcion
                    , dc.unidades as unidades_detalles
                    , dc.precio_unitario as precio_unitario_detalle
                    , dc.total as total_detalle
                    , dc.id_segmento_producto_adicional
                    , (select sum(cs2.precio_venta) from carritos_shop cs2 where cs2.id_venta = cs.id_venta) as precio_venta_total
                    , (select sum(dc.total) from detalles_carrito dc where dc.id_venta = cs.id_venta) as precio_venta_complementos
                    , COALESCE ( (select e.etapa from historial h 
                left join etapas e ON h.etapa = e.id 
                        where h.venta= cs.id_venta
                    order by h.id DESC limit 1), 'Por confirmar') as etapa
                    , COALESCE ( (select e.id from historial h 
                    left join etapas e ON h.etapa = e.id 
                    where h.venta = cs.id_venta order by h.id DESC limit 1), '0') as etapaId
                    from ventas v 
                    left join clientes c  on v.cliente = c.id
                    left join canales_venta cv on v.canal = cv.id 
                    left join carritos_shop cs on v.id = cs.id_venta
                    left join estado_carrito ec on cs.estado = ec.id
                    left join contactos_carrito cc on cs.id = cc.id_carrito
                    left join productos p on cs.id_producto = p.id
                    left join proveedores p2 on p.id_proveedor = p2.id
                    left join contactos_clientes cc2 on cc.id_contacto  = cc2.id
                    left join detalles_carrito dc  on cs.id  = dc.id_carrito
                    where v.id = ${id_venta}`;

        const [dbResult] = await db.query(query);

        if (dbResult.length == 0) {
            return res = {
                ok: false,
                msg: 'No se encontró número de orden.'
            };
        }
        // Función para generar la estructura JSON deseada
        const generateVentaJSON = (dbResult) => {

            if (dbResult[0].estado_venta == "Quo") {
                dbResult[0].etapa = 'Cotización pendiente'
            }
            // Inicializar el objeto de venta
            const venta = {
                id_venta: dbResult[0].id_venta,
                estado_venta: dbResult[0].estado_venta,
                estado_venta_name: dbResult[0].estado_carrito,
                id_transaction: dbResult[0].id_transaction,
                client_secret: dbResult[0].client_secret,
                precio_venta_total: dbResult[0].precio_venta_total,
                precio_venta_complementos: dbResult[0].precio_venta_complementos,
                etapa: {
                    etapaId: +dbResult[0].etapaId,
                    etapa_name: dbResult[0].etapa
                },
                canal: {
                    id_canal: dbResult[0].id_canal,
                    canal: dbResult[0].canal || null,
                },
                cliente: {
                    id_cliente: dbResult[0].id_cliente,
                    nombre_cliente: dbResult[0].nombre_cliente || null,
                    ape_paterno: dbResult[0].ape_paterno_cliente || null,
                    ape_materno: dbResult[0].ape_materno_cliente || null,
                    telefono: dbResult[0].telefono_cliente || null,
                    email_cliente: dbResult[0].email_cliente || null,
                    foto_cliente: dbResult[0].foto_cliente || null
                },
                lineas: [],
                createdAt: dbResult[0].createdAt,
                updatedAt: dbResult[0].updatedAt
            };

            // Mapa para agrupar las líneas por id_carrito
            const lineasMap = new Map();

            // Iterar sobre los resultados
            dbResult.forEach(row => {
                if (!lineasMap.has(row.id_carrito)) {
                    lineasMap.set(row.id_carrito, {
                        id_carrito: row.id_carrito,
                        unidades: row.unidades,
                        id_producto: row.id_producto,
                        producto: row.producto,
                        foto_producto: row.foto_producto,
                        proveedor: {
                            id_proveedor: row.id_proveedor,
                            nombre_proveedor: row.nombre_proveedor,
                            direccion: row.direccion,
                            latitud_proveedor: row.latitud_proveedor,
                            longitud_proveedor: row.longitud_proveedor,
                            referencia_direccion_es: row.referencia_direccion_es,
                            foto_proveedor: row.foto_proveedor
                        },
                        id_servicio: row.id_servicio,
                        precio_venta: row.precio_venta,
                        comision: row.comision,
                        id_estado_carrito: row.id_estado_carrito,
                        estado_carrito: row.estado_carrito,
                        descripcion: row.comentario,
                        Contactos: [],
                        Detalles: []
                    });
                }

                const linea = lineasMap.get(row.id_carrito);

                // Agregar contacto solo si no existe ya en esa línea
                const contactoExiste = linea.Contactos.some(c => c.id_contacto === row.id_contacto);
                if (!contactoExiste && row.id_contacto) {
                    linea.Contactos.push({
                        id_contacto: row.id_contacto,
                        nombre: row.nombre_contacto,
                        ape_paterno: row.ape_paterno_contacto,
                        ape_materno: row.ape_materno_contacto,
                        alias: row.alias_contacto,
                        email_contacto: row.email_contacto,
                        telefono_contacto: row.telefono_contacto,
                        latitud_contacto: row.latitud_contacto,
                        longitud_contacto: row.longitud_contacto,
                        direccion_contacto: row.direccion_contacto
                    });
                }

                // Agregar detalles
                linea.Detalles.push({
                    id_detalle: row.id_detalle,
                    concepto: row.concepto,
                    descripcion: row.descripcion,
                    unidades: row.unidades_detalles,
                    precio_unitario: row.precio_unitario_detalle,
                    total: row.total_detalle,
                    id_segmento_producto_adicional: row.id_segmento_producto_adicional
                });
            });

            // Convertir el mapa a un array y asignarlo a las líneas de la venta
            venta.lineas = Array.from(lineasMap.values());

            return { venta };
        }

        const data = generateVentaJSON(dbResult)


        return res = {
            ok: true,
            data,
            msg: 'Transacción finalizada'
        };



    } catch (error) {
        console.log(error);
        return res = {
            ok: false,
            msg: 'Ha ocurrido un error, comuníquese con el administrador'
        }
    }

}

module.exports = {
    getVentaQuery
}
