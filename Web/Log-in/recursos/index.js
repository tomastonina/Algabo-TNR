// A la hora de ejecutar el programa con npm run "exe" (el nombre que yo le puse a un comando) lo que hace es buscar la carpeta recursos
// el primer archivo index.js que ve, en cambio si tiene otro nombre hay que especificarlo en el package.json
const express = require('express');
const morgan = require('morgan');
const expresshbs = require('express-handlebars');
const path = require('path');

//Inicializamos todo

const app = express();

//Configuraciones del servidor

app.set('port', 5000);
app.set('vistas', path.join(__dirname, 'vistas'));
app.engine('.hbs',expresshbs({
    defaultLayout: 'principal',
    layoutsDir: path.join(app.get('vistas'), 'plantillas'),
    partialsDir: path.join(app.get('vistas'), 'partials'),
    extname: '.hbs',
    helpers: require('./libreria/hanblebars')
}));
app.set('view engine', '.hbs');

//Peticiones al servidor

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables Globales

app.use((req, res, next) =>{
    next();
});

//Rutas

app.use(require ('./rutas/index-rutas'));
app.use(require ('./rutas/autenticacion'));
app.use('/links', require ('./rutas/links'));



//Archivos Publicos

app.use(express.static(path.join(__dirname, 'public')));

//Iniciar el Servidor

app.listen(app.get('port'), () => {
    console.log('El servidor se encuentra en el puerto', app.get('port'));
});

