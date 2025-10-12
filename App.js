const express = require('express');
const Routerusuario = require('./src/routers/UsuariosR.js');
const routernota = require('./src/routers/NotasR.js');
const dotenv = require('dotenv');

dotenv.config();

const App= express()
const PORT= process.env.PORT||8080

App.use(express.json());
App.use("/usarios",Routerusuario);
App.use("/nota",routernota);

App.get("/", (req,res) => {
    res.send("Servidor funcionando")
});

App.listen(PORT, ()=>{
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
    
});