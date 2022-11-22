const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// email sender function

const sendEmail = () => {
    return new Promise((resolve, reject) => {
        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'tolcetec7@gmail.com',
                pass: 'cetec1953!'
            }
        });
        // Definimos el email
        var mailOptions = {
            from: 'Remitente',
            to: 'andres.santibanezp@gmail.com',
            subject: 'Asunto',
            text: 'Contenido del email'
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
    })
};


const sendSGEmail = (to, from, subject, text, html, cc = [], attachments = []) => {
    return new Promise((resolve, reject) => {

        const msg = {
            from,
            subject,
            text,
            html,
            attachments,
            "personalizations": [
                {
                    to,
                    cc,
                }
            ]
        }

        sgMail
            .send(msg)
            .then((response) => {
                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
                resolve(response)
            })
            .catch((error) => {
                // console.error(error)
                reject(error)
            })

    })
}



module.exports = {
    sendEmail,
    sendSGEmail
}