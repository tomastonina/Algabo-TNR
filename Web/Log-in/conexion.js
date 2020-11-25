var mysql = require('mysql');

var conexion = mysql.createConnection({
    host:'localhost',
    database:'algabo_tnr',
    user:'root',
    password:''
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conexion Exitosa");
    }
})

conexion.query('SELECT * from personal', function(error, resultados, campos){
    if(error)
    throw(error);
    resultados.forEach(resultados => {
        console.log(resultados);
    });
})
conexion.end();