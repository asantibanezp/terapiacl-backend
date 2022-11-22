const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery");
var TYPES = require("tedious").TYPES;
const { formatTime, formatDateTime, formatDatePalabra, formatTimePalabra, sanitizeHtmlText, formatDate, cldUpload, cldDestroy } = require("../helpers")
const { compareAsc, format, parseISO } = require('date-fns')
const { es, sq } = require('date-fns/locale')
// For each param do: db.buildParams(params, "name", TYPES.type, variable)

const getCharlas = async (req, res = response) => {

    const {
        rango_etario,
        temas,
        desde,
        limite,
        bytitle,
        fromAdmin
    } = req.body

    // console.log(req.body)
    // DEFINE STRINGS PARA ARMAR QUERY

    let and_rango_etario = ''
    let join_rango_etario = ''
    let and_temas = ''
    let join_temas = ''
    let and_bytitle = ''

    if(bytitle.length > 0){
        bytitle.map((titulo, i) => {
            if(i === 0){
            and_bytitle += ` and c.Titulo like '%${ titulo }%'`
            }else{
                and_bytitle += ` or c.Titulo like '%${ titulo }%'`
            }
        })
    }

    if(rango_etario != null){
        and_rango_etario = `and cred.CodRangoEtario =  ${ rango_etario } `
        join_rango_etario = 'inner join CharlasRangoEtarioDetalle cred on (c.CodCharla = cred.CodCharla) '
    }
    if(temas != null && temas.length > 0){
        and_temas = `and ctd.CodTema in(${ temas.join(',') })`
        join_temas = 'inner join CharlasTemasDetalle ctd on(c.CodCharla = ctd.CodCharla) '
    }

    const orderBy = fromAdmin
    ? `ORDER BY General_CTE.FechaHoraCreacion desc `
    : `ORDER BY 
	case when General_CTE.Fecha is null then 1 else 0 end, --Ordena ascendenemente dejando el NULL al último
	General_CTE.Fecha asc `

    // ARMA QUERY Y VA SIN PARAMETROS
    var params = [];
    var sql = `
    ;WITH General_CTE AS(
    select distinct c.CodCharla, c.Titulo, c.Introduccion, c.Imagen, c.Relator, c.Lugar, 
    case
    when c.Fecha < GETDATE() 
    then null
    else c.Fecha
    end as Fecha,
    c.FechaHoraCreacion,
    c.Hora, c.ToLink, c.ImagenMiniatura from Charlas c
    `
    +join_rango_etario
    +join_temas
    +'where Activo = 1'
    +and_rango_etario
    +and_temas
    +and_bytitle
    +`),
    Contador_CTE AS(
    select distinct count(*) as contador_general from Charlas c
    `
    +join_rango_etario
    +join_temas
    +'where Activo = 1'
    +and_rango_etario
    +and_temas
    +and_bytitle
    +`)
    SELECT *
    FROM General_CTE, Contador_CTE `
    +orderBy
    +`OFFSET @desde ROWS
    FETCH NEXT @limite ROWS ONLY`;

    buildParams(params, "desde", TYPES.Int, desde);
    buildParams(params, "limite", TYPES.Int, limite);

    // console.log(sql)
    arrCharlas = await simpleQuery(sql, params)

    // ORDENA SALIDA
    const charlas = []
    arrCharlas.map((item, i) => {
        const { Fecha, Hora, ...rest } = item
        if(Fecha === null){
            rest.Tiempo = null
            rest.Fecha = null
        }else{
            rest.Tiempo = formatTime(Hora)
            let FechaSplit = fromAdmin
            ? formatDate(Fecha).split('-')
            : formatDatePalabra(Fecha).split('de')
            rest.Dia = FechaSplit[0]
            rest.Mes = FechaSplit[1]
            rest.Ano = FechaSplit[2]
        }
        charlas.push(rest)
    })

    delete arrCharlas
   
    res.json({
        result: charlas,
        total: charlas.length > 0 ? charlas[0].contador_general : null,
    })

}

const getCharla = async (req, res = response) => {

    const { toLink, id, fromAdmin }  = req.body

    let select = fromAdmin
    ? `select c.CodCharla, c.Titulo, c.Imagen, c.Introduccion, c.Dirigido, c.Relator, c.Duracion, c.Orden, c.InMenu, c.ToLink, c.Modalidad, c.Lugar, c.Valor, c.Fecha, c.Hora, c.ImagenMiniatura, cmt.Content as MetaTitle `
    : `select c.Titulo, c.Imagen, c.Introduccion, c.Dirigido, c.Relator, c.Modalidad, c.Duracion, c.Lugar, c.Valor, c.Fecha, c.Hora, cmt.Content as MetaTitle ` 
    
    let where = fromAdmin
    ? `where c.CodCharla = ${ id }  `
    : `where c.ToLink = '${ toLink }' `

    const charla = await simpleQuery(select + `from Charlas c left join CharlasMetaTitle cmt on (cmt.CodCharla = c.CodCharla) ` + where + ' and c.Activo = 1')
   
    charla[0].Fecha = fromAdmin ? formatDate(charla[0].Fecha, false) : formatDatePalabra(charla[0].Fecha)
    charla[0].Hora = fromAdmin ? formatTimePalabra(charla[0].Hora, false) : formatTimePalabra(charla[0].Hora)

    if(fromAdmin){
        charla[0].RangosEtarios = await simpleQuery(`select re.CodRangoEdad, re.NombreRangoEdad from RangoEdades_BDSIAT re
        inner join CharlasRangoEtarioDetalle cred on(cred.CodRangoEtario = re.CodRangoEdad)
        inner join Charlas c on (c.CodCharla = cred.CodCharla) ` + where)
        charla[0].MetaTags = await simpleQuery(`select cmt.Name, cmt.Content from CharlasMetaTag cmt
        inner join Charlas c on(c.CodCharla = cmt.CodCharla)` + where)
        charla[0].InMenu = Number(charla[0].InMenu)
    }

    res.json({
        result: charla
    })
}

const getCharlasTemas = async (req, res = response) => {

    const { id, toLink, fromAdmin } = req.body

    let temas = []
    const arrTemasTodos =  await simpleQuery(`select ct.CodTema, ct.Descripcion, null as checked from CharlasTemas ct`);

    if(id || toLink){

        let temasAsociados = []

        if(id){
            temasAsociados = await simpleQuery(`select ct.CodTema, ct.Descripcion from CharlasTemas ct
            inner join CharlasTemasDetalle ctd on(ctd.CodTema = ct.CodTema)
            inner join Charlas c on(c.CodCharla = ctd.CodCharla) where c.CodCharla = ${ id }`);
        }else if(toLink){
            temasAsociados = await simpleQuery(`select ct.CodTema, ct.Descripcion from CharlasTemas ct
            inner join CharlasTemasDetalle ctd on(ctd.CodTema = ct.CodTema)
            inner join Charlas c on(c.CodCharla = ctd.CodCharla) where c.ToLink = '${ toLink }'`);
        }

        if(fromAdmin){
            arrTemasTodos.map((item) => {
                item.checked = false
                if(temasAsociados.find(tema => tema.CodTema === item.CodTema)){
                     item.checked = true
                }
                temas.push(item)
            })
        }else{
            temas = temasAsociados
        }

    }else{
        temas = arrTemasTodos
    }

    res.json({
        temas
    })

}


const getCharlasObjetivos = async (req, res = response) => {

    const { id, toLink, fromAdmin } = req.body

    let objetivos = []
    const arrObjetivosTodos =  await simpleQuery(`select ct.CodObjetivo, ct.Descripcion, null as checked from CharlasObjetivos ct`);

    if(id || toLink){

        let objetivosAsociados = []

        if(id){
            objetivosAsociados = await simpleQuery(`select ct.CodObjetivo, ct.Descripcion, null as checked from CharlasObjetivos ct
            inner join CharlasObjetivosDetalle ctd on(ctd.CodObjetivo = ct.CodObjetivo)
            inner join Charlas c on(c.CodCharla = ctd.CodCharla) where c.CodCharla = ${ id }`);
        }else if(toLink){
            objetivosAsociados = await simpleQuery(`select ct.CodObjetivo, ct.Descripcion, null as checked from CharlasObjetivos ct
            inner join CharlasObjetivosDetalle ctd on(ctd.CodObjetivo = ct.CodObjetivo)
            inner join Charlas c on(c.CodCharla = ctd.CodCharla) where c.ToLink = '${ toLink }'`);
        }

        if(fromAdmin){
            arrObjetivosTodos.map((item) => {
                item.checked = false
                if(objetivosAsociados.find(objetivo => objetivo.CodObjetivo === item.CodObjetivo)){
                     item.checked = true
                }
                objetivos.push(item)
            })
        }else{
            objetivos = objetivosAsociados
        }

    }else{
        objetivos = arrObjetivosTodos
    }

    res.json({
        objetivos
    })

}

const getCharlasMenu = async (req, res = response) => {

    const params = []
    let sql = "select Titulo, ToLink from Charlas where Activo = 1 and InMenu = 1"

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const createCharla = async (req, res = response) => {

    const {
        InMenu,
        MetaTitle,
        UsuarioCreacion,
        MetaTags,
        ToLink,
        Objetivos,
        Temas,
        ...rest
      } = req.body

    const Titulo = sanitizeHtmlText(rest.Titulo)
    const Introduccion = sanitizeHtmlText(rest.Introduccion)
    const Dirigido = sanitizeHtmlText(rest.Dirigido)
    const Relator = sanitizeHtmlText(rest.Relator)
    const Duracion = sanitizeHtmlText(rest.Duracion)
    const Orden = sanitizeHtmlText(rest.Orden)
    const Modalidad = sanitizeHtmlText(rest.Modalidad)
    const Lugar = sanitizeHtmlText(rest.Lugar)
    const Valor = sanitizeHtmlText(rest.Valor)
    const Fecha = sanitizeHtmlText(rest.Fecha)
    const Hora = sanitizeHtmlText(rest.Hora)
    
    
    let imgUpload = ''
    const nombreImagenes =  Titulo.toLowerCase().split(' ').join('-')
    
    /* Images upload */
    if(req.files){
        const { Imagen, ImagenMiniatura } = req.files
        if(Imagen){
            imgUpload = await cldUpload('terapiacl/charlas-y-talleres/charlas-imagenes-principales', nombreImagenes, Imagen.tempFilePath)
        }
        if(ImagenMiniatura){
            imgUpload = await cldUpload('terapiacl/charlas-y-talleres/charlas-imagenes-miniaturas', nombreImagenes, ImagenMiniatura.tempFilePath)
        }
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ imgUpload.version }`) /* actualiza version de cloudinary */
    }

    qry = `insert into Charlas values('${ Titulo }', '${ nombreImagenes }', '${ Introduccion }', '${ Dirigido }', '${ Relator }', '${ Duracion }', '', '${ Orden }', ${ InMenu }, 1, '${ ToLink }', '${ Modalidad }', '${ Lugar }','${ Valor }', '${ Fecha }', '${ Hora }', GETDATE(), '', '${ nombreImagenes }', ${ UsuarioCreacion }, '')`
    // console.log(qry)
    await simpleQuery(qry)
    
    maxCodCharla = await simpleQuery('select MAX(CodCharla) as CodCharla from Charlas') 
    const charla = await simpleQuery(`select c.CodCharla, c.Titulo, c.Relator, c.Fecha, c.Hora, c.Lugar from Charlas c where CodCharla = ${ maxCodCharla[0].CodCharla }`)

    const FechaSplit = formatDate(charla[0].Fecha).split('-')
    charla[0].Dia = FechaSplit[0]
    charla[0].Mes = FechaSplit[1]
    charla[0].Ano = FechaSplit[2]

    // console.log(charla)

    /* MetaTitle */
    if(MetaTitle){
        await simpleQuery(`insert into CharlasMetaTitle values(${ maxCodCharla[0].CodCharla },' ${ MetaTitle }', 1)`)
    }
    /* MetaTags */
    if(MetaTags !== 0){
        const parsedMetaTags = JSON.parse(MetaTags)
        if(parsedMetaTags.length > 0){
            for(let i = 0; i < parsedMetaTags.length; i++){
                await simpleQuery(`insert into CharlasMetaTag values (${ maxCodCharla[0].CodCharla }, '${ parsedMetaTags[i].Name }', '${ parsedMetaTags[i].Content }', 1)`)
            }
        }
    }
    /* Objetivos */
    const parsedObjetivos = JSON.parse(Objetivos)
    for(i = 0; i < parsedObjetivos.length; i++){
        if(parsedObjetivos[i].checked === true){
            await simpleQuery(`insert into CharlasObjetivosDetalle values (${ maxCodCharla[0].CodCharla }, ${ parsedObjetivos[i].CodObjetivo })`)
        }
    }
    /* Temas */
    const parsedTemas = JSON.parse(Temas)
    for(i = 0; i < parsedTemas.length; i++){
        if(parsedTemas[i].checked === true){
            await simpleQuery(`insert into CharlasTemasDetalle values (${ maxCodCharla[0].CodCharla }, ${ parsedTemas[i].CodTema })`)
        }
    }

    res.json({
        msg: 'creado!!',
        charla
    })
}

const updateCharla = async (req, res = response) => {

    const {
        CodCharla,
        InMenu,
        MetaTitle,
        UsuarioModificacion,
        MetaTags,
        ToLink,
        Objetivos,
        Temas,
        ...rest
      } = req.body

    const Titulo = sanitizeHtmlText(rest.Titulo)
    const Introduccion = sanitizeHtmlText(rest.Introduccion)
    const Dirigido = sanitizeHtmlText(rest.Dirigido)
    const Relator = sanitizeHtmlText(rest.Relator)
    const Duracion = sanitizeHtmlText(rest.Duracion)
    const Orden = sanitizeHtmlText(rest.Orden)
    const Modalidad = sanitizeHtmlText(rest.Modalidad)
    const Lugar = sanitizeHtmlText(rest.Lugar)
    const Valor = sanitizeHtmlText(rest.Valor)
    const Fecha = sanitizeHtmlText(rest.Fecha)
    const Hora = sanitizeHtmlText(rest.Hora)

    let imgUpdateStr = ''
    let imgUpload = ''
    const nombreImagenes =  Titulo.toLowerCase().split(' ').join('-')

    /* Images upload */
    if(req.files){
        /* Busca imagenes actuales */
        let [charla] = await simpleQuery(`select Imagen as CurrentImagen, ImagenMiniatura as CurrentImagenMiniatura from Charlas where CodCharla = ${ CodCharla } `)
        const { CurrentImagen, CurrentImagenMobile } = charla
        /* Recoge imagenes subidas */
        const { Imagen, ImagenMiniatura } = req.files

        if(Imagen){
            await cldDestroy('terapiacl/charlas-y-talleres/charlas-imagenes-principales', CurrentImagen)
            imgUpload = await cldUpload('terapiacl/charlas-y-talleres/charlas-imagenes-principales', nombreImagenes, Imagen.tempFilePath)
            imgUpdateStr += `, Imagen = '${ nombreImagenes }'`
        }
        if(ImagenMiniatura){
            await cldDestroy('terapiacl/charlas-y-talleres/charlas-imagenes-miniaturas', CurrentImagenMobile)
            imgUpload = await cldUpload('terapiacl/charlas-y-talleres/charlas-imagenes-miniaturas', nombreImagenes, ImagenMiniatura.tempFilePath)
            imgUpdateStr += `, ImagenMiniatura = '${ nombreImagenes }'`
        }
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ imgUpload.version }`) /* actualiza version de cloudinary */
    }

    let sql = `update Charlas set
    Titulo = '${ Titulo }',
    Introduccion = '${ Introduccion }',
    Dirigido = '${ Dirigido }',
    Relator = '${ Relator }',
    Duracion = '${ Duracion }',
    Orden = ${ Orden },
    InMenu = ${ Number(InMenu) },
    ToLink = '${ ToLink }',
    Modalidad = '${ Modalidad }',
    Lugar = '${ Lugar }',
    Valor = '${ Valor }',
    Fecha = '${ Fecha }',
    Hora = '${ Hora }',
    UsuarioModificacion = ${ UsuarioModificacion }, 
    FechaHoraModificacion = getdate()`
    +imgUpdateStr /*Agrega imagen*/
    +`where CodCharla = ${ CodCharla }`

    await simpleQuery(sql)
    const charla = await simpleQuery(`select c.CodCharla, c.Titulo, c.Relator, c.Fecha, c.Hora, c.Lugar from Charlas c where CodCharla = ${ CodCharla }`)

    const FechaSplit = formatDate(charla[0].Fecha).split('-')
    charla[0].Dia = FechaSplit[0]
    charla[0].Mes = FechaSplit[1]
    charla[0].Ano = FechaSplit[2]

    /* MetaTitle */
    if(MetaTitle){
        await simpleQuery(`delete CharlasMetaTitle where CodCharla = ${ CodCharla }`)
        await simpleQuery(`insert into CharlasMetaTitle values(${ CodCharla }, '${ MetaTitle }', 1)`)
    }
    /* MetaTags */
    if(MetaTags !== 0){
        await simpleQuery(`delete CharlasMetaTag where CodCharla = ${ CodCharla }`)
        const parsedMetaTags = JSON.parse(MetaTags)
        if(parsedMetaTags.length > 0){
            for(let i = 0; i < parsedMetaTags.length; i++){
                await simpleQuery(`insert into CharlasMetaTag values (${ CodCharla }, '${ parsedMetaTags[i].Name }', '${ parsedMetaTags[i].Content }', 1)`)
            }
        }
    }
    /* Objetivos */
    await simpleQuery(`delete CharlasObjetivosDetalle where CodCharla = ${ CodCharla }`)
    const parsedObjetivos = JSON.parse(Objetivos)
    for(i = 0; i < parsedObjetivos.length; i++){
        if(parsedObjetivos[i].checked === true){
            await simpleQuery(`insert into CharlasObjetivosDetalle values (${ CodCharla }, ${ parsedObjetivos[i].CodObjetivo })`)
        }
    }
    /* Temas */
    await simpleQuery(`delete CharlasTemasDetalle where CodCharla = ${ CodCharla }`)
    const parsedTemas = JSON.parse(Temas)
    for(i = 0; i < parsedTemas.length; i++){
        if(parsedTemas[i].checked === true){
            await simpleQuery(`insert into CharlasTemasDetalle values (${ CodCharla }, ${ parsedTemas[i].CodTema })`)
        }
    }

    res.status(200).json({
        msg:'update!!',
        charla,
    })

}

const deleteCharla = async (req, res = response) => {

    const { CodCharla } = req.params


    let [charla] = await simpleQuery(`select Imagen, ImagenMiniatura from Charlas where CodCharla = ${ CodCharla } `)
    const nombreImagen = charla.Imagen
    const nombreImagenMiniatura = charla.ImagenMiniatura

    await cldDestroy('terapiacl/charlas-y-talleres/charlas-imagenes-principales', nombreImagen)
    await cldDestroy('terapiacl/charlas-y-talleres/charlas-imagenes-principales', nombreImagenMiniatura)

    await simpleQuery(`delete CharlasMetaTitle where CodCharla = ${ CodCharla }`)
    await simpleQuery(`delete CharlasMetaTag where  CodCharla = ${ CodCharla }`)
    await simpleQuery(`delete CharlasObjetivosDetalle where CodCharla = ${ CodCharla }`)
    await simpleQuery(`delete CharlasTemasDetalle where CodCharla = ${ CodCharla }`)
    await simpleQuery(`update Charlas set Activo = 0, Imagen = '', ImagenMiniatura = '' where CodCharla = ${ CodCharla }`)

    res.status(200).json({
        msg: 'delete !!',
        CodCharla
    })
}



module.exports = {
    getCharlas,
    getCharlasMenu,
    getCharla,
    getCharlasTemas,
    createCharla,
    updateCharla,
    deleteCharla,
    getCharlasObjetivos
}