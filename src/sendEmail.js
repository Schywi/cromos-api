require('dotenv').config();





const nodemailer = require('nodemailer');

 const sendEmail = async (form) => {
  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Secret ',
        pass: ' Secret',
    }
  });

  // Message object
  const message = {
      from: `Sender Name <Secret@gmail.com>`,
      to: `Recipient <Secret@gmail.com>`,
      subject: 'Orçamento via site',
      text: `${form.message}`,
      html: `
      <body>
     
      <p> <strong>Telefone: </strong> ${form.phone} |  <strong>Empresa: </strong> ${form.company} |  <strong>E-mail: </strong> ${form.email}</p>
      <p> <strong>Mensagem: </strong>  <br/> ${form.message} </p>

     
      </body>
      </html>
  `
  };

  transporter.sendMail(message, (err, info) => {
      if (err) {
          console.log('Error occurred. ' + err.message);
           
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });



}


module.exports = sendEmail;
  