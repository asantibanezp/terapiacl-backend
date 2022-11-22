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
            sliders:    '/api/sliders',
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

    // Los middlewares son funciones que se ejecutan antes de llamar a un control, o seguir con la ejecucion de las peticiones
    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Fileupload - carga archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

       // Redirige trafico de puerto 80 a 443
        // this.app.use((req, res, next) => {
        //     console.log(req.protocol);
        //     if(req.protocol === 'http'){
        //         console.log('asas')
        //          res.redirect(301, `https://${req.headers.host}${req.url}`);
        //     }
        //     next();
        // });

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
        this.app.use(this.paths.sliders, require('../routes/sliders'));
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
    }

    listen() {
      
        var options = {
            cert: fs.readFileSync(__dirname+'/ssl_originals/terapia.cl.cert'),
            ca: fs.readFileSync(__dirname+'/ssl_originals/intermediate.cert'),
            key: fs.readFileSync(__dirname+'/ssl_originals/terapia.cl.key'),
            // cert: fs.readFileSync(__dirname+'/ssl/verdadancestral_com.crt'),
            // ca: fs.readFileSync(__dirname+'/ssl/ca-bundle.crt'),
            // key: fs.readFileSync(__dirname+'/ssl/verdadancestral_com.key'),
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
