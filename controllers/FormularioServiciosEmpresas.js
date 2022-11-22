const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { sanitizeHtmlText, sendSGEmail } = require("../helpers") 

const procesarFormularioServiciosEmpresas = async (req, res = response) => {

    const {
        // empresa,
        // contacto,
        // email,
        // telefono,
        servicios,
        //consulta,
        ...rest
    } = req.body

    const empresa = sanitizeHtmlText(rest.empresa)
    const contacto = sanitizeHtmlText(rest.contacto)
    const email = sanitizeHtmlText(rest.email)
    const telefono = sanitizeHtmlText(rest.telefono)
    const consulta = sanitizeHtmlText(rest.consulta)

    // Qry
    const empresaUpper = empresa.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const contactoUpper = contacto.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const primerNombreContacto = contactoUpper.split(' ')[0]

    const query = `INSERT INTO FormularioServiciosEmpresas VALUES('${ empresaUpper }', '${ contactoUpper }', '${ email }', '${ telefono }', '${ consulta }', '${ servicios }', GETDATE())`
    simpleQuery(query)

    // Envío Emails
    try {
        const enviar = await enviarEmailEmpresasCentro(empresaUpper, contactoUpper, email, telefono, servicios, consulta)
        const enviarPaciente = await enviarEmailEmpresasPaciente(email, primerNombreContacto)
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

enviarEmailEmpresasCentro = async(empresa, contacto, email, telefono, servicios, consulta) =>{


    /* Ordena Servicios */ 
    let sortedServicios = ''

    servicios.map((servicio, i) => {

        if(i > 0 && i < servicios.length - 1){
            sortedServicios += ', '
        }else if(i > 0 && i === servicios.length - 1){
            sortedServicios += ' y '
        }
    
        sortedServicios += servicio
    })


    /* Fabrica Email */ 
    let to = ''
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario de Solicitud Servicio'
    const text = 'Formulario de Solicitud Servicio Empresa Contacto Telefono Email Servicios Consulta'

    let html = `<!DOCTYPE html>
    
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario de Solicitud Servicio</h3>
            </div>
            <div>  
               <table style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
                    <tr>
                        <th style="text-align: left;">Empresa:</th>
                        <td>${ empresa }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Contacto:</th>
                        <td>${ contacto }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Telefono:</th>
                        <td>${ telefono }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Email:</th>
                        <td>${ email }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Servicios:</th>
                        <td>${ sortedServicios }</td>
                    </tr>`

                if(consulta){
                    html += `
                    <tr>
                        <th style="text-align: left;">Consulta:</th>
                        <td>${ consulta }</td>
                    </tr> `
                }

      html+=`</table>
            </div>
        </div>
    </body>
    </html>`

    to = [ 
        { "email" : "jvergara@terapia.cl" },
        { "email" : "eaguirre@terapia.cl" },
    ]

    // Por mientras se envía al mismo remitente, TESTING
    // to = [ {"email" : email } ]

    return await sendSGEmail(to, from, subject, text, html);
    
}

enviarEmailEmpresasPaciente = async(email, nombres) =>{

    const to = [ { "email" : email } ]
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario Recibido'
    const text = `Formulario de Orientación Recibido Nombre Email Telefono Mensaje Estimado hemos recibido 
    satisfactoriamente tu e-mail Te contactaremos a la brevedad Centro de Terapia del Comportamiento`

    const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario Recibido</h3>
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
    procesarFormularioServiciosEmpresas
}