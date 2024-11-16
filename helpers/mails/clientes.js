const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "tyva@tyva.com.mx",
        pass: "Teyeva2024*",
    },
});

const logo_url = `https://tyva.com.mx/teyeva/public/dist/assets/images/logos/logo_teyeva_new.jpeg`

const style = `<style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #000;
      }
      .container {
          max-width: 600px;
          margin: 0 auto;
          /* padding: 20px; */
          padding: 0;
          background-color: #f4e322;
          color: #000000;
          border-radius: 5px;
      }
      .card{
        margin-top: 10px;
          padding: 10px;
          background-color: #e3e4e5;
          color: rgb(88 88 88);
          border-radius: 15px;
          box-shadow: 3px 3px 8px lightgray;
      }
      .header, .footer {
          text-align: center;
          padding: 15px 0;
      }
      .header{
          /* height: 100px; */
          background-color: #000000;
          width: 100%;
          color: #fff;
      }
      .content {
          padding: 20px;
      }
      .button {
          display: inline-block;
          background-color: #000000;
          color: #ffffff;
          padding: 10px 20px;
          margin: 20px 0;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
      }
      .footer{
          font-size: .7em;
      }
          img {
          width:80%;
          }
  </style>`;

const mailRegistroCliente = async (email, nombre) => {
    // send mail with defined transport object
    return await transporter.sendMail({
        from: 'TYV@ Delivery <tyva@tyva.com.mx>', // sender address
        to: `${email}`, // list of receivers
        subject: "Alta de cuenta TYV@", // Subject line
        //   text: "Hello world?", // plain text body
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Confirmación de Cuenta</title>
  ${style}
</head>
<body>
  <div class="container">
       <div style="text-align:center;">
           <img src="${logo_url}" alt="TYVA">
       </div>
      <div class="header">
          <h1>¡Bienvenido!</h1>
      </div>
      <div class="content">
          <div class="card">
              <p>Hola ${nombre},</p>
              <p>Estamos muy emocionados de tenerte con nosotros. Tu cuenta ha sido confirmada exitosamente, gracias por tu confianza.<br></p>              
          </div>
      </div>
      <div class="footer">
          <p><a href="#">Términos y Condiciones</a> | <a href="#">Cancelar Suscripción</a></p>
      </div>
  </div>
</body>
</html>`, // html body
    });
}

const mailRecuperarCuentaCliente = async (email, nombre, token) => {
    // send mail with defined transport object
    const mail = await transporter.sendMail({
        from: 'TYV@ Delivery <tyva@tyva.com.mx>', // sender address
        to: `${email}`, // list of receivers
        subject: "Recupera tu contraseñaTYV@", // Subject line
        //   text: "Hello world?", // plain text body
        html: `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Confirmación de Cuenta</title>
  ${style}
</head>
<body>
<div class="container">
         <div style="text-align:center;">
           <img src="${logo_url}" alt="TYVA">
       </div>
  <div class="header">
      <h1>Recuperación de Contraseña</h1>
  </div>
  <div class="content">
      <div class="card">
          <p>Hola ${nombre},</p>
          <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si fuiste tú quien solicitó esta acción, por favor haz clic en el enlace a continuación para restablecer tu contraseña:</p>
          <a href="https://tyva.com.mx/teyeva/public/" class="button">Recuperar Cuenta</a>
          <p>Si no solicitaste restablecer tu contraseña, por favor ignora este correo.</p>
      </div>

      <div class="card">
      <p>También puedes copiar en nu tavegador la siguiente url: ${token}</p>
      /div>
  </div>
  <div class="footer">
      <p><a href="#">Términos y Condiciones</a> | <a href="#">Cancelar Suscripción</a></p>
  </div>
</div>
</body>
</html>`, // html body
    });

    return mail;
}

module.exports = {
    mailRegistroCliente,
    mailRecuperarCuentaCliente
}