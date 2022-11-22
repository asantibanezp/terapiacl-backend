const { compareAsc, format } = require('date-fns')
const { es, hr } = require('date-fns/locale')
const sanitizeHtml = require('sanitize-html');



const calcularEdad = async (fnac = new Date('1990-03-02')) => {
    var diff_ms = Date.now() - fnac.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const capitalizeStr = (str) => {
    return str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

const formatDateTime = (sqlDate) => { // Recibe datetime SQL sin formatear. Retorna arreglo con Fecha y Hora, ej: [ '01:25:36', '14-11-2021' ]
    let dateTimeISO = sqlDate.toISOString()
    let time = dateTimeISO.substr(dateTimeISO.indexOf('T')+1, 8)
    let date = format(new Date(sqlDate), 'dd-MM-yyyy')
    
    const output = [time, date]
    return output
}

// const formatDatePalabra = (sqlDate) => { // Recibe datetime SQL sin formatear. Retorna arreglo con Fecha y Hora, ej: [ '01:25:36', '14-11-2021' ]
//     const mesPalabra = format(new Date(sqlDate), 'MMMM', { locale: es })
//     const dia = format(new Date(sqlDate), 'dd')
//     const ano = format(new Date(sqlDate), 'yyyy')
    
//     const output = `${ dia } de ${ mesPalabra } de ${ ano }`
//     return output
// }

const formatDatePalabra = (sqlDate) => { // Recibe datetime SQL sin formatear. Retorna string formato dia-mesPalabra-ano, ej: "16 de Junio de 2022"
  
  const isoSqlDate = sqlDate.toISOString()
  const indexSplit = isoSqlDate.indexOf('T')
  const date = isoSqlDate.substr(0, indexSplit)

  let output = ''

  if(date !== '1900-01-01'){
    const [ ano, mes, dia ] = date.split('-')

    let mesPalabra = ''
    switch(mes){
      case '01': mesPalabra = 'Enero'; break;
      case '02': mesPalabra = 'Febrero'; break;
      case '03': mesPalabra = 'Marzo'; break;
      case '04': mesPalabra = 'Abril'; break;
      case '05': mesPalabra = 'Mayo'; break;
      case '06': mesPalabra = 'Junio'; break;
      case '07': mesPalabra = 'Julio'; break;
      case '08': mesPalabra = 'Agosto'; break;
      case '09': mesPalabra = 'Septiembre'; break;
      case '10': mesPalabra = 'Octubre'; break;
      case '11': mesPalabra = 'Noviembre'; break;
      case '12': mesPalabra = 'Diciembre'; break;
    }

    output = `${dia} de ${mesPalabra} de ${ano}`
  }
  
  return output
}
const formatDate = (sqlDate, reverse = true) => { // Recibe datetime SQL sin formatear. Retorna arreglo ano-dia-mes (adaptado para datepickers)
  
    let output = ''
    let date = new Date(sqlDate)

    // let dia = date.getDate() +1 /* en desa */
    let dia = date.getDate() /* en produccion */
    let mes = date.getMonth() +1
    let ano = date.getFullYear()

    if(date.toISOString() !== '1900-01-01T00:00:00.000Z'){
      if(mes < 10){
        mes = `0${mes}`
      }
      if(dia < 10){
        dia = `0${dia}`
      }
      if(reverse){
        output = `${dia}-${mes}-${ano}`
      }else{
        output = `${ano}-${mes}-${dia}`
      }
    }
  
  return output
}

// const formatDate = (sqlDate) => { // Recibe datetime SQL sin formatear. Retorna arreglo con Fecha y Hora, ej: [ '01:25:36', '14-11-2021' ]
//   let date = format(new Date(sqlDate), 'yyyy-MM-dd')
  
//   const output = date
//   return output
// }

const formatTime = (sqlTime) => { // Recibe time SQL y retorma objeto, ej: { hora: '19', minuto: '30', segundo: '00' }
    let timeISO = sqlTime.toISOString()
    let time = timeISO.substr(timeISO.indexOf('T')+1, 8)
  // console.log(time)  
    let [hora, minuto, segundo] = time.split(':')

    const output = { hora, minuto, segundo }
    return output
}

const formatTimePalabra = (sqlTime, withFormatWord = true) => { // Recibe time SQL y retorma string palabra, ej: 19:30hrs
    let timeISO = sqlTime.toISOString()
    let time = timeISO.substr(timeISO.indexOf('T')+1, 8)
    let output = ''

    if(time !== '00:00:00'){
      let [hora, minuto, segundo] = time.split(':')

      output = withFormatWord 
      ? `${ hora }:${ minuto }hrs` 
      : `${ hora }:${ minuto }`
    }

    return output
}

const nombreEspecialistasByToLink = (toLink) => {
    let nombre = ''
    switch (toLink) {
      case 'fonoaudiologia':
        nombre = 'Fonoaudiólogos'
        break
      case 'neurologia':
        nombre = 'Neurólogos'
        break
      case 'neurologia-adulto':
        nombre = 'Neurólogos de Adultos'
        break
      case 'neurologia-infantil':
        nombre = 'Neurólogos Infanto-Juveniles'
        break
      case 'nutricion':
        nombre = 'Nutricionistas'
        break
      case 'psicologia-adulto':
        nombre = 'Psicólogos de Adultos'
        break
      case 'psicologia-infantil':
        nombre = 'Psicólogos Infanto-Juveniles'
        break
      case 'psicopedagogia':
        nombre = 'Psicopedagogos'
        break
      case 'psiquiatria':
        nombre = 'Psiquiatras'
        break
      case 'psiquiatria-adulto':
        nombre = 'Psiquiatras de Adultos'
        break
      case 'psiquiatria-infantil':
        nombre = 'Psisquiatras Infanto-Juveniles'
        break
      case 'terapia-ocupacional':
        nombre = 'Terapeutas Ocupacionales'
        break
    }
    return nombre
  }

  const sanitizeHtmlText = (text) => {
    const clean = sanitizeHtml(text, {
      allowedTags: [
        "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
        "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
        "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
        "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
        "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
        "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
        "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
      ],
      disallowedTagsMode: 'discard',
      allowedAttributes: false,
      selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
      allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
      allowedSchemesByTag: {},
      allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
      allowProtocolRelative: true,
      enforceHtmlBoundary: false
    })
    return clean
  }
  

module.exports = {
    calcularEdad,
    capitalizeStr,
    formatDateTime,
    formatTime,
    formatDatePalabra,
    formatTimePalabra,
    nombreEspecialistasByToLink,
    sanitizeHtmlText,
    formatDate
}