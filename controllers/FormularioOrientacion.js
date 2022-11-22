const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { sanitizeHtmlText, sendSGEmail } = require("../helpers");

const procesarFormularioOrientacion = async (req, res = response) => {

    const {
        sucursal,
        ...rest
    } = req.body

    const nombres = sanitizeHtmlText(rest.nombres)
    const apellidos = sanitizeHtmlText(rest.apellidos)
    const rut = sanitizeHtmlText(rest.rut)
    const digito = sanitizeHtmlText(rest.digito)
    const email = sanitizeHtmlText(rest.email)
    const celular = sanitizeHtmlText(rest.celular)
    const prevision = sanitizeHtmlText(rest.prevision)
    const fechaNacimiento = sanitizeHtmlText(rest.fechaNacimiento)

    // Qry
    const nombresUpper = nombres.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const apellidosUpper = apellidos.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const primerNombre = nombresUpper.split(' ')[0]

    const query = `INSERT INTO FormularioOrientacion VALUES('${ nombresUpper }', '${ apellidosUpper }', ${ rut }, '${ digito }', '${ email }', '${ celular}', '', '${ prevision }', '', '', '${ fechaNacimiento }', GETDATE()) `
    simpleQuery(query)


    // Envío Emails
    try {
        const enviar = await enviarEmailOrientacionCentro(sucursal, nombresUpper, apellidos, rut, digito, email, celular, prevision, fechaNacimiento)
        const enviarPaciente = await enviarEmailOrientacionPaciente(email, primerNombre)
        res.status(200).json({
            enviar, 
            enviarPaciente
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Error al enviar e-mail, comuníquese con el administrador'
        })
    }
}

enviarEmailOrientacionCentro = async(sucursal, nombres, apellidos, rut, digito, email, celular, prevision, fechaNacimiento) =>{

    let to = ''
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario de Orientación'
    const text = 'Formulario de Orientación Nombre Email Telefono Mensaje'

    let html = `<!DOCTYPE html>
    
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario de Orientación</h3>
            </div>
            <div>  
               <table style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
                    <tr>
                        <th style="text-align: left;">Nombres:</th>
                        <td>${ nombres }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Apellidos:</th>
                        <td>${ apellidos }</td>
                    </tr>`;
                if(rut){
                    html+= `
                    <tr>
                        <th style="text-align: left;">Rut:</th>
                        <td>${ rut }-${ digito }</td>
                    </tr>`
                }

                html+=`
                    <tr>
                        <th style="text-align: left;">Fecha de Nacimiento:</th>
                        <td>${ fechaNacimiento }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Email:</th>
                        <td>${ email }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Celular:</th>
                        <td>${ celular }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Previsión:</th>
                        <td>${ prevision }</td>
                    </tr>
               </table>
            </div>
        </div>
    </body>
    </html>`

    switch(sucursal){
        case 1: 
        to = [ {"email" : "contact@terapia.cl" } ] 
        break;
        case 2: 
        to = [ {"email" : "centrovina@terapia.cl" } ] 
        break;
        case 3: 
        to = [ {"email" : "centrosantiago@terapia.cl" } ] 
        break;
    }

    // Por mientras se envía al mismo remitente, TESTING
    // to = [ {"email" : email } ]

    return await sendSGEmail(to, from, subject, text, html);
    
}

enviarEmailOrientacionPaciente = async(email, nombres) =>{

    const to = [ { "email" : email } ]
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario de Orientación Recibido'
    const text = `Formulario de Orientación Recibido Nombre Email Telefono Mensaje Estimado hemos recibido 
    satisfactoriamente tu e-mail Te contactaremos a la brevedad Centro de Terapia del Comportamiento`

    const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario de Orientación Recibido</h3>
            </div>
            <div>
                <p style="margin-bottom: 60px;">Estimado ${ nombres }, hemos recibido satisfactoriamente tu e-mail.<br>
                Te contactaremos a la brevedad.
                </p>
                <p>Atte.<br>
                Centro de Terapia del Comportamiento
                </p>
            </div>
        </div> 
    </body>
    </html>
    `
    return await sendSGEmail(to, from, subject, text, html);
    
}


module.exports = {
    procesarFormularioOrientacion
}