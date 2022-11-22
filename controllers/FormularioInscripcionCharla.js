const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { capitalizeStr, getCharlaByToLink, sanitizeHtmlText, sendSGEmail } = require("../helpers")

const procesarFormularioInscripcionCharla = async (req, res = response) => {

    const {
        toLink,
        ...rest
    } = req.body

    const nombreCompleto = sanitizeHtmlText(rest.nombreCompleto)
    const rut = sanitizeHtmlText(rest.rut)
    const digito = sanitizeHtmlText(rest.digito)
    const comentarios = sanitizeHtmlText(rest.comentarios)
    const fechaNacimiento = sanitizeHtmlText(rest.fechaNacimiento)
    const email = sanitizeHtmlText(rest.email)
    const telefono = sanitizeHtmlText(rest.telefono)

    const nombreCompletoCapitalized = capitalizeStr(nombreCompleto)
    const primerNombre = nombreCompletoCapitalized.substr(0, nombreCompletoCapitalized.indexOf(' '))
    const charla = await getCharlaByToLink(toLink)
    const tituloCharla = charla[0].Titulo
    const codCharla = charla[0].CodCharla

    const query = `insert into FormularioCharlas values(${ codCharla }, '${ nombreCompletoCapitalized }', ${ rut }, '${ digito }', '${ email }', ${ telefono }, '${ comentarios }', '${ fechaNacimiento }', getdate())`
    simpleQuery(query)


    // Envío Emails
    try {
        const enviar = await enviarEmailCharlaCentro(tituloCharla, nombreCompletoCapitalized, rut, digito, comentarios, fechaNacimiento, email, telefono)
        const enviarPaciente = await enviarEmailCharlaPaciente(email, primerNombre)
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

enviarEmailCharlaCentro = async( tituloCharla, nombre, rut, digito, comentarios, fechaNacimiento, email, telefono) =>{

    let to = ''
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario de Solicitud de Charla'
    const text = 'Formulario de Solicitud de Charla Título Charla Nombre Rut Fecha de Nacimiento Email Teléfono Comentarios'

    let html = `<!DOCTYPE html>
    
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario de Solicitud de Charla </h3>
            </div>
            <div>  
               <table style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
                    <tr>
                        <th style="text-align: left;">Título Charla:</th>
                        <td>${ tituloCharla }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Nombre:</th>
                        <td>${ nombre }</td>
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
                        <th style="text-align: left;">Teléfono:</th>
                        <td>${ telefono }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Comentarios:</th>
                        <td>${ comentarios }</td>
                    </tr>
               </table>
            </div>
        </div>
    </body>
    </html>`

    to = [ {"email" : "centro@terapia.cl" } ]

    // Por mientras se envía al mismo remitente, TESTING
    // to = [ {"email" : email } ]

    return await sendSGEmail(to, from, subject, text, html);
    
}

enviarEmailCharlaPaciente = async(email, nombre) =>{

    const to = [ { "email" : email } ]
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario de Solicitud de Charla Recibido'
    const text = `Formulario de Solicitud de Charla Recibido Nombre Email Telefono Mensaje Estimado hemos recibido 
    satisfactoriamente tu e-mail Te contactaremos a la brevedad Centro de Terapia del Comportamiento`

    const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario de Solicitud de Charla Recibido</h3>
            </div>
            <div>
                <p style="margin-bottom: 60px;">Estimado ${ nombre }, hemos recibido satisfactoriamente tu solicitud de inscripción a la charla/taller.<br>
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
    procesarFormularioInscripcionCharla
}