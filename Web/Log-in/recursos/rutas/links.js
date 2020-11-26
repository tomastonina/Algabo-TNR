const express = require('express');
const router = express.Router();

//Referencia a la conexion a la BD
const conexion = require('../database');

router.get('/add', (req, res) =>{
    res.render('links/add'); // ERROR ACA
});

router.post('./add', (req, res) =>{
    res.send('recibido');
});

module.exports = router;