var express = require('express');

var app = express();

app.get('/inicio', function(peticion, respuesta){
    respuesta.send('Ruta INICIO')
});

app.listen(3000, function(peticion, respuesta) {
    console.log('Hola mundo');
});