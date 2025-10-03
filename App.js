import express from "express"
import Routerusuario from "./src/routers/UsuariosR.js"
import routernota from "./src/routers/NotasR.js"

const App= express()
const PORT= 8080

App.use(express.json());
App.use("/usarios",Routerusuario);
App.use("/nota",routernota);

App.get("/", (req,res) => {
    res.send("Servidor funcionando")
});

App.listen(PORT, ()=>{
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
    
});