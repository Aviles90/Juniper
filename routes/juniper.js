const soap = require('soap');
const { Router, response } = require('express');


const router = Router();

// Obtener empresas para login
router.get( '/get-bookings',  async(req, res=response)=>{
    try {
        const url = 'https://www.yavas.com/wsExportacion/wsBookings.asmx?wsdl';
        // const args = {user: 'Pitagoras', password: 'Mexico1993**', BookingCode:'4T6931'};
        const args = {user: 'Pitagoras', password: 'Mexico1993**', BookingDateFrom:'20231010', BookingDateTo:'20231010', Status:'OK'};

//   soap.createClient(url, {'Content-Type': 'text/xml'}, (err, client)=>{
  soap.createClient(url, {}, (err, client)=>{
      console.log(client);
      client.getBookings(args, function(err, result) {
          return res.status(200).json({
            Bookings : result.getBookingsResult.wsResult.Bookings
          })
      });
  });
    } catch (error) {
        return
    }
});

module.exports = router;