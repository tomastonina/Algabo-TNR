const mysql = require("mysql");

module.exports = () => {
    return mysql.createConnection({
        host:"localhost",
        database:"algabo_tnr",
        user:"root",
        password:""
    });
}