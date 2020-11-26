const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./clave');

const conexion = mysql.createPool(database);

conexion.getConnection((error, connection) => {
    if (error){
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexion con la base de datos fue cerrada');
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene demasiadas conexiones');
        }
        if(error.code === 'ECONNREFUSED'){
            console.error('La conexion con la base de datos fue rechazada');
        }
    }

    if (connection) connection.release();
    console.log('La base de datos esta conectada');
    return;
});

conexion.query = promisify(conexion.query)

module.exports = conexion;