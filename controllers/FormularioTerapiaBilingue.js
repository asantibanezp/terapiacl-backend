const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { getSucursal } = require("../helpers/db-queries");
const { sanitizeHtmlText, sendSGEmail } = require("../helpers") 


const procesarFormularioTerapiaBilingue = async (req, res = response) => {

    const {
        sexo,
        cod_sucursal,
        locale,
        ...rest
    } = req.body

    const nombres = sanitizeHtmlText(rest.nombres)
    const apellidos = sanitizeHtmlText(rest.apellidos)
    const documento = sanitizeHtmlText(rest.documento)
    const tipo_documento = sanitizeHtmlText(rest.tipo_documento)
    const fecha_nacimiento = sanitizeHtmlText(rest.fecha_nacimiento)
    const pais_nacimiento = sanitizeHtmlText(rest.pais_nacimiento)
    const email = sanitizeHtmlText(rest.email)
    const telefono = sanitizeHtmlText(rest.telefono)
    const especialidad_lenguaje = sanitizeHtmlText(rest.especialidad_lenguaje)
    const comentarios = sanitizeHtmlText(rest.comentarios)

    let rut = null
    let dv = ''
    let pasaporte = ''
    
    if(tipo_documento === 1){
        let rutCompleto = documento.split('.').join('')
        rut = rutCompleto.split('-')[0]
        dv = rutCompleto.split('-')[1]
    }else{
        pasaporte = documento
    }

    const nombre_completo = nombres+' '+apellidos
    const nombreCompletoUpper = nombre_completo.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const fecha_actual = new Date().toISOString()

    // ########## TRADUCCIONES ##########
    res.setLocale(locale)
    /* Email Centro */
    const drawer = 'formulario-terapia-bilingue.email-centro.'
    const txt_titulo = res.__(drawer+'titulo')
    const txt_nombre_completo_upper =  res.__(drawer+'nombre')
    const txt_genero = res.__(drawer+'genero') 
    const txt_rut = res.__(drawer+'rut')
    const txt_pasaporte = res.__(drawer+'pasaporte')
    const txt_especialidad_lenguaje = res.__(drawer+'especialidad')
    const txt_pais_nacimiento = res.__(drawer+'pais-nacimiento')
    const txt_fecha_nacimiento = res.__(drawer+'fecha-nacimiento')
    const txt_telefono = res.__(drawer+'telefono')
    const txt_email = res.__(drawer+'email')
    const txt_comentarios = res.__(drawer+'comentarios')
    const txt_fecha = res.__(drawer+'fecha')
    const genero = (sexo === 1) ? res.__(drawer+'masculino') : res.__(drawer+'femenino')
    /* Email Paciente */
    const drawer2 = 'formulario-terapia-bilingue.email-paciente.'
    const txt2_titulo = res.__(drawer2+'titulo')
    const txt2_texto = res.__(drawer2+'texto', nombreCompletoUpper)
    const txt2_despedida = res.__(drawer2+'despedida')
    const txt2_saludos = res.__(drawer2+'saludos')

    // ########## QRY ##########
    const query = `INSERT INTO FormularioTerapiaBilingue VALUES('${ nombreCompletoUpper }', ${ sexo }, ${ rut }, '${ dv }', '${ pasaporte }', ${ tipo_documento }, '${ fecha_nacimiento }', '${ pais_nacimiento }', '${ email }', '${ telefono }', '${ especialidad_lenguaje }', '${ comentarios }', ${ cod_sucursal }, '${ locale }', '${ fecha_actual }')`
    console.log(query)
    simpleQuery(query)

    // ########## ENVÍO EMAILS ##########
    try {
        await enviarEmailTerapiaBilingueCentro(nombreCompletoUpper, genero, rut, dv, pasaporte, tipo_documento, fecha_nacimiento, pais_nacimiento, email, telefono, especialidad_lenguaje, comentarios, cod_sucursal, fecha_actual, locale, txt_titulo, txt_nombre_completo_upper, txt_genero, txt_rut, txt_pasaporte, txt_especialidad_lenguaje, txt_pais_nacimiento, txt_telefono, txt_email, txt_comentarios, txt_fecha_nacimiento, txt_fecha)
        await enviarEmailTerapiaBilinguePaciente(email, txt2_titulo, txt2_texto, txt2_despedida, txt2_saludos)
        res.status(200).json({
            msg: 'Emails Enviados!'
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error al enviar e-mail, comuníquese con el administrador'
        })
    }
}

enviarEmailTerapiaBilingueCentro = async(nombreCompletoUpper, genero, rut, dv, pasaporte, tipo_documento, fecha_nacimiento, pais_nacimiento, email, telefono, especialidad_lenguaje, comentarios, cod_sucursal, fecha_actual, locale, txt_titulo, txt_nombre_completo_upper, txt_genero, txt_rut, txt_pasaporte, txt_especialidad_lenguaje, txt_pais_nacimiento, txt_telefono, txt_email, txt_comentarios, txt_fecha_nacimiento, txt_fecha) =>{

    const sucursal = await getSucursal(cod_sucursal)
    const nombreSucursal = sucursal[0].Nombre
    const [ fecha, hora_ini ] = fecha_actual.split('T')
    const hora = hora_ini.substr(0, hora_ini.indexOf('.'))

    let to = ''
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = `${ txt_titulo } ${ nombreSucursal }`
    const text = `${ txt_titulo } ${ nombreSucursal } Nombre Genero Rut Pasaporte Especialidad Pais Fecha Nacimiento Email Telefono Mensaje`
    let html = `<!DOCTYPE html>
    
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>${ txt_titulo } ${ nombreSucursal }</h3>
            </div>
            <div>  
               <table style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
                    <tr>
                        <th style="text-align: left;">${ txt_nombre_completo_upper }:</th>
                        <td>${ nombreCompletoUpper }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">${ txt_genero }:</th>
                        <td>${ genero }</td>
                    </tr>`

                    if (tipo_documento === 1) {
                    html += 
                    `<tr>
                        <th style="text-align: left;">${ txt_rut }:</th>
                        <td>${ rut } - ${ dv }</td>
                    </tr>`
                    } else {
                    html += 
                    `<tr>
                        <th style="text-align: left;">${ txt_pasaporte }:</th>
                        <td>${ pasaporte }</td>
                    </tr>`
                    }

                    html +=
                    `<tr>
                        <th style="text-align: left;">${ txt_especialidad_lenguaje }:</th>
                        <td>${ especialidad_lenguaje }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">${ txt_pais_nacimiento }:</th>
                        <td>${ pais_nacimiento }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">${ txt_fecha_nacimiento }:</th>
                        <td>${ fecha_nacimiento }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">${ txt_telefono }:</th>
                        <td>${ telefono }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">${ txt_email }:</th>
                        <td>${ email }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">${ txt_comentarios }:</th>
                        <td>${ comentarios }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">${ txt_fecha }:</th>
                        <td>${ fecha } / ${ hora }</td>
                    </tr>
               </table>
            </div>
        </div>
    </body>
    </html>`

    // switch(cod_sucursal){
    //     case 1: 
    //     to = [ {"email" : "centro@terapia.cl" } ] 
    //     break;
    //     case 2: 
    //     to = [ {"email" : "centrovina@terapia.cl" } ] 
    //     break;
    //     case 3: 
    //     to = [ {"email" : "centrosantiago@terapia.cl" } ] 
    //     break;
    // }

     to = [ {"email" : "jvergara@terapia.cl" } ]
  
    return await sendSGEmail(to, from, subject, text, html);
    
}

enviarEmailTerapiaBilinguePaciente = async(email, txt2_titulo, txt2_texto, txt2_despedida, txt2_saludos) =>{

    const to = [ { "email" : email } ]
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = `${ txt2_titulo }`
    const text = `Formulario de Terapia Bilingue Recibido Nombre Email Telefono Mensaje Estimado hemos recibido 
    satisfactoriamente tu e-mail Te contactaremos a la brevedad Centro de Terapia del Comportamiento`

    const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>${ txt2_titulo }</h3>
            </div>
            <div>
                <p style="margin-bottom: 60px;">${ txt2_texto }.<br>
                ${ txt2_despedida }.
                </p>
                <p>${ txt2_saludos }.<br>
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
    procesarFormularioTerapiaBilingue
}