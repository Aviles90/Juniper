const soap = require('soap');
const { Router, response } = require('express');
const puppeteer = require("puppeteer");


const router = Router();

// Obtener empresas para login
router.get('/get-bookings', (req, res = response) => {
    try {
        // const url = 'https://www.yavas.com/wsExportacion/wsBookings.asmx?wsdl';
        // const args = {user: 'Pitagoras', password: 'Mexico1993**', BookingCode:'4T6931'};
        const args = { user: 'Pitagoras', password: 'Mexico1993**', BookingDateFrom: '20231010', BookingDateTo: '20231010', Status: 'OK' };

        //   soap.createClient(url, {'Content-Type': 'text/xml'}, (err, client)=>{
        soap.createClient(url, {}, (err, client) => {
            client.getBookings(args, function (err, result) {
                return res.status(200).json({
                    Bookings: result.getBookingsResult.wsResult.Bookings
                })
            });
        });

    } catch (error) {
        console.log(error);

        return
    }
});

router.get('/get-bono', async (req, res = response) => {

    const { bookingCode } = req.query;
    console.log('bookingCode recibido:', bookingCode);
    

    if (bookingCode) {
        try {
            const url = 'https://volaris.juniper.es/wsExportacion/wsBookings.asmx?wsdl';
            const args = { user: 'Pitagoras', password: 'Mexico1993**', BookingCode: bookingCode };

            //   soap.createClient(url, {'Content-Type': 'text/xml'}, (err, client)=>{
            soap.createClient(url, {}, async (err, client) => {
                await client.getBookings(args, async (err, result) => {
                    const Booking = result.getBookingsResult.wsResult.Bookings
                    console.log('Esperando respuesta de Juniper...');

                    if (Booking == undefined) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Reserva no encontrada'
                        })
                    } else {
                        const { attributes, Customer, Agent, Holder, Lines } = Booking.Booking
                        // console.log('booking encontrada:', attributes);
                        

                        const head = `<head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Bono de Reserva</title>
                                        <style>
                                            body {
                                                font-family: Arial, sans-serif;
                                                max-width: 600px;
                                                margin: auto;
                                                padding: 20px;
                                                border: 1px solid #ddd;
                                                border-radius: 10px;
                                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                            }
                                            .header {
                                                display: flex;
                                                justify-content: space-between;
                                                align-items: center;
                                                margin-bottom: 20px;
                                            }
                                            .section {
                                                margin-bottom: 15px;
                                                padding-bottom: 10px;
                                                border-bottom: 1px solid #ddd;
                                            }
                                            .section h3 {
                                                margin-bottom: 5px;
                                                color: #333;
                                            }
                                            .estado-booking{
                                                font-size: small;
                                                color: seagreen;
                                            }
                                            .detalle-booking{
                                                font-size: small;
                                            }
                                            *{
                                                font-weight: 100;
                                            }
                                        </style>
                                    </head>`;

                        let header = `<div class="header">
                                        <h2>Bono de Reserva <br>
                                            <small class="estado-booking">${attributes.Status}</small><br>
                                            <small class="detalle-booking">Fecha de creación: ${attributes.BookingDate.split("T")[0]} </small><br>
                                                <small class="detalle-booking">Reserva Ya Vas: ${attributes.BookingCode}</small><br>
                                                <small class="detalle-booking">No. Reservación: <strong> ${Lines.Line[0].attributes.Externalreference}</strong></small>
                                        </h2>        
                                        <div class="logo"><img src="https://media.staticontent.com/media/pictures/bd14a40a-0f23-41d0-9b02-c583b59933f2" alt="Ya Vas"  width="100%"></div>
                                    </div>`;

                        let sections = `<div class="section">
                                    <h3>Titular de la Reserva:</h3>        <small>${Holder.NameHolder} ${Holder.LastName}</small>
                                </div>
                                <div class="section">
                                    <h3>Detalles de Productos:</h3>
                                    <p>${Lines.Line[0].ServiceName} <br>
                                        <small>${Lines.Line[0].roomlist.room.addressline}</small>
                                        <br>
                                        <small>Del ${Lines.Line[0].BeginTravelDate.split("T")[0]} al ${Lines.Line[0].EndTravelDate.split("T")[0]} </small> 
                                    </p>
                                </div>`;

                        // console.log(Lines.Line);
                        let habitaciones = '';
                        let habitacion = ''
                        let paxHtml = '<ul>';

                        try {
                            Lines.Line.forEach(Line => {
                                if (Line.roomlist.room) {
                                    console.log(Line.roomlist.room);
                                    console.log('*****************************');
                                    
                                    
                                     habitacion = `<ul><li><small>${Line.roomlist.room.typeroomname}</small></li><li><small>${Line.roomlist.room.boardtype.$value}</small></li></ul>`;
                                   
                                     console.log( Array(Line.roomlist.room.paxes.pax)[0].length);

                                     let paxArray = []
                                     if (Array(Line.roomlist.room.paxes.pax)[0].length) {
                                        paxArray = Line.roomlist.room.paxes.pax
                                     }else{
                                        paxArray = Array(Line.roomlist.room.paxes.pax)
                                     }
                                    //  paxArray[0]= Line.roomlist.room.paxes.pax
                                     console.log(paxArray);
                                     

                                    paxArray.forEach(pax => {
                                        // console.log(pax);
                                        
                                        paxHtml += `<li><small>${pax.name} ${pax.lastname}</small></li>`;
                                    });
                                    paxHtml += '</ul>'
                                                  
                                };
                                habitaciones = habitacion + paxHtml;
                            });
                        } catch (error) {
                            // console.error(error);
                        }

                        let sectionsFinal = `<div class="section">
                                    <h3>Políticas de cancelación</h3>
                                    <p><small>${Lines.Line[0].CancellationPolicy.Description}</small></p>
                                </div>

                                <div class="section" style='font-size:8px'>
                                        ${Lines.Line[0].HotelRemarks}
                                </div>`;

                        const html = `<!DOCTYPE html>
                                                <html lang="es">
                                                    ${head}
                                                    <body>
                                                    ${header}
                                                    ${sections}
                                                    <div class="section">
                                                        <h3>Habitaciones</h3>
                                                        <p>
                                                        ${habitaciones}
                                                        </p>
                                                    </div>
                                                    ${sectionsFinal}
                                            </body>
                                            </html>`;

                                            // const browser = await puppeteer.launch();
                                        //     const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
                                        //     const page = await browser.newPage();
                                        //     await page.setContent(html);
                                        //    // Generar PDF
                                        //     const pdfBuffer = await page.pdf({ format: "A4" });
                                        //     await browser.close();

                                            // Verificar si el PDF se generó correctamente
                        // if (!pdfBuffer || pdfBuffer.length === 0) {
                        //     return res.status(400).json({ ok: false, msg: "Error al generar el PDF" });
                        // }

                        // Configuración correcta para la descarga
                        // res.setHeader("Content-Disposition", 'attachment; filename="reserva.pdf"');
                        // res.setHeader("Content-Type", "application/pdf");
                        // res.setHeader("Content-Length", pdfBuffer.length);

                        // Enviar PDF
                        // res.send(pdfBuffer);
                        return res.status(200).send(html)
                        // return res.status(200).json({
                        // attributes,
                        // Customer,
                        // Agent,
                        // Holder,
                        // Lines
                        // })
                    }

                });
            });

        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo procesar la reserva'
            })
        }
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'No se recibió localizador'
        })
    }
});

module.exports = router;