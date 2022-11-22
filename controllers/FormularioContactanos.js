const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { sanitizeHtmlText, capitalizeStr, sendSGEmail } = require("../helpers");


const procesarFormularioContactanos = async (req, res = response) => {

    const {
        sucursal,
        ...rest
    } = req.body

    const nombre = sanitizeHtmlText(rest.nombre)
    const email = sanitizeHtmlText(rest.email)
    const telefono = sanitizeHtmlText(rest.telefono)
    const asunto = sanitizeHtmlText(rest.asunto)
    const mensaje = sanitizeHtmlText(rest.mensaje)

    // Qry
    const nombreUpper = nombre.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const date = new Date().toISOString()
    const query = `INSERT INTO FormularioContacto VALUES('${ nombreUpper }', '', '${ email }', '${ telefono }', '${ mensaje }', '${ date }', ${ sucursal }, '${ asunto }' )`
    simpleQuery(query)

    // Envío Emails
    try {
        const enviar = await enviarEmailContactoCentro(sucursal, nombreUpper, email, telefono, asunto, mensaje)
        const enviarPaciente = await enviarEmailContactoPaciente(email, nombreUpper)
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

enviarEmailContactoCentro = async(sucursal, nombre, email, telefono, asunto, mensaje) =>{

    let to = ''
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario de Contacto'
    const text = 'Formulario de Contacto Nombre Email Telefono Mensaje'
    const html = `<!DOCTYPE html>
    
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario de Contacto Recibido</h3>
            </div>
            <div>  
               <table style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
                    <tr>
                        <th style="text-align: left;">Nombre:</th>
                        <td>${ nombre }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Email:</th>
                        <td>${ email }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Telefono:</th>
                        <td>${ telefono }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Asunto:</th>
                        <td>${ asunto }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Mensaje:</th>
                        <td>${ mensaje }</td>
                    </tr>
               </table>
            </div>
        </div>
    </body>
    </html>`


    switch(sucursal){
        case 1: 
        to = [ {"email" : "centro@terapia.cl" } ] 
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

enviarEmailContactoPaciente = async(email, nombre) =>{

    const to = [ { "email" : email } ]
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario de Contacto Recibido'
    const text = `Formulario de Contacto Recibido Nombre Email Telefono Mensaje Estimado hemos recibido 
    satisfactoriamente tu e-mail Te contactaremos a la brevedad Centro de Terapia del Comportamiento`

    const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario de Contacto Recibido</h3>
            </div>
            <div>
                <p style="margin-bottom: 60px;">Estimado ${ nombre }, hemos recibido satisfactoriamente tu e-mail.<br>
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
    procesarFormularioContactanos
}