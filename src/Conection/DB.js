const Mysql = require("mysql2");

const db = Mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Denigvm10",
    database: "notas",
    timezone: "-03:00"
});

db.connect((err) =>{
    if (err) {
        console.log("Error al conectar", err);
        return;
    }
    console.log("base conectada");
    
});

module.exports = db;