const nodemailer = require('nodemailer');

class EmailManager {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: "coderhouse50015@gmail.com",
                pass: "norp renb afxw uxyq"
            }
        });
    }

    async enviarCorreoCompra(email, first_name, ticket) {
        try {
            const mailOptions = {
                from: "Coder Test <coderhouse50015@gmail.com>",
                to: email,
                subject: 'Confirmación de compra',
                html: `
                    <h1>Confirmación de compra</h1>
                    <p>Gracias por tu compra, ${first_name}!</p>
                    <p>El número de tu orden es: ${ticket}</p>
    
                `
            };

            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    }

    async enviarCorreoRestablecimiento(email, first_name, token) {
        try {
            const mailOptions = {
                from: "Coder Test <coderhouse50015@gmail.com>",
                to: email,
                subject: 'Restablecimiento de contraseña',
                html: `
                    <h1>Restablecimiento de Contraseña</h1>
                    <p>Hola ${first_name}!</p>
                    <p>Pediste restablecer tu contraseña. Te enviamos el código de confirmacion</p>
                    <strong> ${token} </strong>
                    <p> Este código expira en una hora </p>
                    <a href="http://localhost:8080/password"> Restablecer Contraseña </a>
                `
            };

            await this.transporter.sendMail(mailOptions);
            
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    }
}

module.exports = EmailManager;



