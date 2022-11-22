const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const history = require('connect-history-api-fallback');
// i18n
const { I18n } = require('i18n')
const { dirname } = require('path')
const path = require('path')
// fin i18n

// ***** new ****
var spdy = require('spdy');
var compression = require('compression')
const fs = require('fs');
const http = require('http');
// const https = require('https');
// ***** new ****

// i18n
const appDir = dirname(require.main.filename);
const i18n = new I18n()
i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(appDir, '/locales'),
    register: global,
    objectNotation: true,
})
// fin i18n

class Server {

    constructor() {
        this.app = express();

        this.httpPort = process.env.HTTP_PORT;
        this.httpsPort = process.env.HTTPS_PORT;

            
            
        // Rutas
        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            buscar:     '/api/buscar',
            uploads:    '/api/uploads',
            noticias:   '/api/noticias',
            charlas:   '/api/charlas',
            sucursales:   '/api/sucursales',
            especialidades:     '/api/especialidades',
            testimonios:    '/api/testimonios',
            sliders_principal:   '/api/sliders-principal',
            sliders_bienvenidos:    '/api/sliders-bienvenidos',
            sliders_empresas:    '/api/sliders-empresas',
            servicios: '/api/servicios',
            problemas: '/api/problemas',
            problemas_tipos: '/api/problemas-tipos',
            comunas: '/api/comunas',
            ciudades: '/api/ciudades',
            paises: '/api/paises',
            previsiones: '/api/previsiones',
            aranceles: '/api/aranceles',
            packs: '/api/packs',
            formularios: '/api/formularios',
            terapeutas: '/api/terapeutas',
            rangos_etarios: '/api/rangos-etarios',
            mensaje_sitio: '/api/mensaje-sitio',
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares 
        this.middlewares(); 

        // Rutas de mi aplicación
        this.routes(); 
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // redirect 301 solicitados por fabiola
        this.app.use(function redirects(req, res, next) {
            if (req.url === '/psicologos.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/psicologia-adulto');
            if (req.url === '/psiquiatria.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/psiquiatria-adulto');
            if (req.url === '/fonoaudiologia.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/fonoaudiologia');
            if (req.url === '/nutricion-stgo.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/nutricion');
            if (req.url === '/psicopedagogia.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/psicopedagogia.php');
            if (req.url === '/terapia-ocupacional.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/terapia-ocupacional');
            if (req.url === '/neurologia.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/neurologia-adulto');
            if (req.url === '/psicologia/psicologos_infantiles.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/psicologia-infantil');
            if (req.url === '/psicologia/psiquiatria_infantil.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/psiquiatria-infantil');
            if (req.url === '/psicologia/neurologia_infantil.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/neurologia-infantil');
            if (req.url === '/psicologia/terapia_familiar.php') return res.redirect(301, 'https://www.terapia.cl/servicios/terapia-familiar');
            if (req.url === '/psicologia/terapia_parejas.php') return res.redirect(301, 'https://www.terapia.cl/servicios/terapia-sexual');
            if (req.url === '/psicologia/deficit_atencional.php') return res.redirect(301, 'https://www.terapia.cl/problemas/deficit-de-atencion-con-hiperactividad');
            if (req.url === '/psicologia-stgo.php') return res.redirect(301, 'https://www.terapia.cl/noticias-psicologia/noticia/294');
            if (req.url === '/neurologia-vina.php') return res.redirect(301, 'https://www.terapia.cl/noticias-psicologia/noticia/295');
            if (req.url === '/psiquiatria-vina.php') return res.redirect(301, 'https://www.terapia.cl/noticias-psicologia/noticia/296');
            if (req.url === '/centro-salud-mental.php') return res.redirect(301, 'https://www.terapia.cl/centro-de-salud-mental');
            if (req.url === '/terapia_parejas.php') return res.redirect(301, 'https://www.terapia.cl/servicios/terapia-de-pareja');
            if (req.url === '/psiquiatria-stgo.php') return res.redirect(301, 'https://www.terapia.cl/especialidades/psiquiatria-adulto');
            /* Redirecciones a SEO Landing Pages */
            if (req.url === '/psicologia-vina.php') return res.redirect(301, 'https://www.terapia.cl/psicologia-vina-del-mar');
            if (req.url === '/tol.php') return res.redirect(301, 'https://www.terapia.cl/tol');
            if (req.url === '/psicologia/banmedica.php') return res.redirect(301, 'https://www.terapia.cl/banmedica');
            if (req.url === '/psicologia/trastornos_sexuales.php') return res.redirect(301, 'https://www.terapia.cl/trastornos-sexuales');
            /* Fin Redirecciones a SEO Landing Pages*/
            return next();
        });

        // CORS
        this.app.use(cors({
            origin: 'https://terapia.cl',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }));

        // Lectura y parseo del body
        this.app.use(express.json());

        // Fileupload - carga archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        // compress all responses
        this.app.use(compression())

        // Middleware para Vue.js router modo history
        this.app.use(history());

        // Define directorio publico
        this.app.use(express.static('public'));
        this.app.use(i18n.init)
    }

    // Define la ruta de acuerdo al path y los manda a routes. Routes las deriva al controlador respectivo
    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.noticias, require('../routes/noticias'));
        this.app.use(this.paths.charlas, require('../routes/charlas'));
        this.app.use(this.paths.sucursales, require('../routes/sucursales'));
        this.app.use(this.paths.especialidades, require('../routes/especialidades'));
        this.app.use(this.paths.testimonios, require('../routes/testimonios'));
        this.app.use(this.paths.sliders_principal, require('../routes/sliders-principal'));
        this.app.use(this.paths.sliders_bienvenidos, require('../routes/sliders-bienvenidos'));
        this.app.use(this.paths.sliders_empresas, require('../routes/sliders-empresas'));
        this.app.use(this.paths.servicios, require('../routes/servicios'));
        this.app.use(this.paths.problemas, require('../routes/problemas'));
        this.app.use(this.paths.problemas_tipos, require('../routes/problemas-tipos'));
        this.app.use(this.paths.comunas, require('../routes/comunas'));
        this.app.use(this.paths.ciudades, require('../routes/ciudades'));
        this.app.use(this.paths.paises, require('../routes/paises'));
        this.app.use(this.paths.previsiones, require('../routes/previsiones'));
        this.app.use(this.paths.aranceles, require('../routes/aranceles'));
        this.app.use(this.paths.packs, require('../routes/packs'));
        this.app.use(this.paths.formularios, require('../routes/formularios'));
        this.app.use(this.paths.terapeutas, require('../routes/terapeutas'));
        this.app.use(this.paths.rangos_etarios, require('../routes/rangos-etarios'));
        this.app.use(this.paths.mensaje_sitio, require('../routes/mensaje-sitio'));
    }


    listen() {
      
        var options = {
            // cert: fs.readFileSync(__dirname+'/ssl_originals/terapia.cl.cert'),
            // ca: fs.readFileSync(__dirname+'/ssl_originals/intermediate.cert'),
            // key: fs.readFileSync(__dirname+'/ssl_originals/terapia.cl.key'),
            // cert: fs.readFileSync(__dirname+'/ssl/verdadancestral_com.crt'),
            // ca: fs.readFileSync(__dirname+'/ssl/ca-bundle.crt'),
            // key: fs.readFileSync(__dirname+'/ssl/verdadancestral_com.key'),
            cert: fs.readFileSync(__dirname+'/ssl/terapia.cl-2023-03-27.crt'),
            ca: fs.readFileSync(__dirname+'/ssl/terapia.cl-2023-03-27.ca.crt'),
            key: fs.readFileSync(__dirname+'/ssl/terapia.cl-2023-03-27.key'),
            spdy: {
                protocols: ['h2','spdy/3.1', 'spdy/3', 'spdy/2','http/1.1', 'http/1.0'],
                plain: false, 
                connection: {
                  windowSize: 1024 * 1024, // Server's window size
                  // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
                  autoSpdy31: false
                },
            }
        };

    
        // Levantamos servidor redireccionador pto 80
        http.createServer(function (req, res) {
            res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
            res.end();
        }).listen(this.httpPort, () =>{
            console.log(`Servidor redireccionador ${this.httpPort} corriendo`)
        });
		
        var server = spdy.createServer(options, this.app);
          
        server.listen(this.httpsPort);
    }

}


module.exports = Server;
