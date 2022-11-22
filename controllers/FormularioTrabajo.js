const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { subirArchivo, sendSGEmail, sanitizeHtmlText } = require("../helpers");
const path = require('path');
const fs = require('fs');
const FileType = require('file-type');

const procesarFormularioTrabajo = async (req, res = response) => {

    const {
        rut,
        digito,
        especialidad,
        grupoEtario,
        dispSucursal,
        ...rest
    } = req.body

    const nombres = sanitizeHtmlText(rest.nombres)
    const apellidos = sanitizeHtmlText(rest.apellidos)
    const email = sanitizeHtmlText(rest.email)
    const telefono = sanitizeHtmlText(rest.telefono)
    const anosExperiencia = sanitizeHtmlText(rest.anosExperiencia)
    const dispHoraria = sanitizeHtmlText(rest.dispHoraria)
    const expeHonorarios = sanitizeHtmlText(rest.expeHonorarios)
    const comentarios = sanitizeHtmlText(rest.comentarios)

    let fileName = ''
    let fileExtension = ''
    let attachments = []

    // Si hay archivo, lo guardamos y definimos el attachment
    if(req.files){
        fileName = await subirArchivo(req.files, ['doc', 'docx', 'pdf'], 'cvs')
        let filePath = path.join(__dirname, '../uploads/cvs', fileName)
        let fileSplit = fileName.split('.')
        fileExtension = fileSplit[fileSplit.length-1]

        let attachment = fs.readFileSync(filePath).toString("base64")
        let type = await FileType.fromFile(filePath)

        attachments = [
          {
            content: attachment,
            filename: fileName,
            type: type.mime,
            disposition: "attachment"
          }
        ]
    }

    // Definimos nombre completo
    const nombresUpper = nombres.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const apellidosUpper = apellidos.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
    const nombreCompleto = nombresUpper+' '+apellidosUpper

    // Insertamos
    const query = `INSERT INTO FormularioTrabajo VALUES('${nombreCompleto}',${rut},'${digito}','${email}','${telefono}','${especialidad}',${anosExperiencia},'${grupoEtario}','${dispSucursal}','${dispHoraria}','${expeHonorarios}','${comentarios}', GETDATE(), '${fileName}')`
    simpleQuery(query)

    // Enviamos Emails
    try {
        const enviar = await enviarEmailTrabajoCentro(
            nombreCompleto,
            rut,
            digito,
            email,
            telefono,
            especialidad,
            anosExperiencia,
            grupoEtario,
            dispHoraria,
            dispSucursal,
            expeHonorarios,
            comentarios,
            fileExtension,
            attachments,
        )
        const enviarPaciente = await enviarEmailTrabajoPostulante(email, nombresUpper)
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

enviarEmailTrabajoCentro = async(nombreCompleto, rut, digito, email, telefono, especialidad, anosExperiencia, grupoEtario, dispHoraria, dispSucursal, expeHonorarios, comentarios, fileExtension, attachments) => {
    
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario Laboral'
    const text = 'Formulario de Orientación Nombre Email Telefono Mensaje'
    // const cc = [ { email } ]
    const qrySucursales = 'select CodSucursal, EmailEncargado, Nombre from Sucursal'
    const sucursales = await simpleQuery(qrySucursales)
    let strSucursales = ''
    let incluyeProvidencia = false


    // **************** CONTROL "TO" Y STRING "SUCURSAL" SEGUN SUCURSAL ******************
    const arrDispSucursal = dispSucursal.split(',')
    const to = []
    arrDispSucursal.map((sucursal, i) => { // Busca sucursales válidas en la selección
        let findedSucursal = sucursales.find(suc => suc.CodSucursal === Number(sucursal))
        if(findedSucursal){
            to.push({ "email": findedSucursal.EmailEncargado })

            if (findedSucursal.CodSucursal === 1)
                incluyeProvidencia = true
            
            if(i > 0 && i < arrDispSucursal.length - 1){
                strSucursales += ', '
            }else if(i > 0 && i === arrDispSucursal.length - 1){
                strSucursales += ' y '
            }
            strSucursales += findedSucursal.Nombre
        }
    })

    if(dispSucursal.length > 1 && !incluyeProvidencia )  // Si se escogió más de una sucursal y no está incluída Providencia, agrega al encargado técnico
        to.push({ "email": process.env.MAIL_ENC_TECNICO })

        // Por mientras se envía al mismo remitente, TESTING
        // const toTest = [ {"email" : email } ]


    // **************** CONTROL STRING "GRUPO ETARIO" SEGUN SUCURSAL ******************
    let arrGrupoEtario = grupoEtario.split(',').filter(item => item.trim() === 'Adultos Mayores' || item.trim() === 'Niños' || item.trim() === 'Adultos' || item.trim() === 'Adolescentes')
    let strGrupoEtario = ''
    arrGrupoEtario.map((grupo, i) => {
        if(i > 0 && i < arrGrupoEtario.length - 1){
            strGrupoEtario += ', '
        }else if(i > 0 && i === arrGrupoEtario.length - 1){
            strGrupoEtario += ' y '
        }
        strGrupoEtario += grupo 
    })


    let html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario Laboral</h3>
            </div>

            <div>
                <table>
                <tr>
                    <th style="text-align: left;">Nombres</th>
                    <td> ${ nombreCompleto }</td>
                </tr>`

                if(rut){
                html += `
                <tr>
                    <th style="text-align: left;">Rut:</th>
                    <td> ${ rut.toLocaleString('es-CL') }-${ digito } </td>
                </tr>`
                }

                html += `
                <tr>
                    <th style="text-align: left;">Email:</th>
                    <td> ${ email }</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Teléfono:</th>
                    <td>${ telefono }</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Especialidad:</th>
                    <td>${ especialidad }</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Años de Experiencia:</th>
                    <td>${ anosExperiencia }</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Grupo Etario de Trabajo:</th>
                    <td>${ strGrupoEtario }</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Disponibilidad Horaria:</th>
                    <td>${ dispHoraria }</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Disponibilidad de Sucursal:</th>
                    <td>${ strSucursales }</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Expectativa Honorarios:</th>
                    <td>${ expeHonorarios }</td>
                </tr>
            
                `
                if(comentarios){
                    html += `
                    <tr>
                        <th style="text-align: left;">Comentarios:</th>
                        <td>${ comentarios }</td>
                    </tr>`
                }

                if(fileExtension){
                    html += `
                    <tr>
                        <th style="text-align: left;">Curriculum:</th>
                        <td> Se adjuntó un archivo con extensión: ${ fileExtension }</td>
                    </tr>`
                }

                html += `</table>
            </div>
        </div>
    </body>
    </html>
    `
    return await sendSGEmail(to, from, subject, text, html, cc = [], attachments);

}

enviarEmailTrabajoPostulante = async(email, nombres) => {

    const to = [ { "email" : email } ]
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Formulario Laboral Recibido'
    const text = `Formulario Laboral Recibido Nombre Email Telefono Mensaje Estimado hemos recibido 
    satisfactoriamente tu e-mail Te contactaremos a la brevedad Centro de Terapia del Comportamiento`

    const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Formulario Laboral Recibido</h3>
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
    `
    return await sendSGEmail(to, from, subject, text, html);
    
}


module.exports = {
    procesarFormularioTrabajo
}