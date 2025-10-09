import {Router} from "express";
import db from "../Conection/DB.js";

const router = Router()

router.get("/", (req,res)=>{
    db.query("SELECT * FROM usarios;", (err,result)=>{
        if (err) {
            res.status(500).json(err)
        }
        res.json(result)
    });
});

router.post("/", (req,res)=>{
    const {Gmail,Contraseña,Nombre}= req.body
    if (!Gmail || !Contraseña || !Nombre) {
        res.status(400).json({error:"falta informacion"})
    }
    db.query("INSERT INTO usarios (Gmail,Contraseña,Nombre) VALUES (?,?,?)",
        [Gmail,Contraseña,Nombre],
        (err,result)=>{
            if (err) {
                return res.status(500).json(err)
            }
            res.status(201).json({id: result.insertId, Gmail,Contraseña,Nombre})
        });
});

router.put("/:idUsarios", (req,res)=>{
    const {Gmail,Contraseña,Nombre} = req.body
    const {idUsarios} = req.params
    db.query("UPDATE usarios SET Gmail = ?, Contraseña =?, Nombre = ? WHERE idUsarios = ?",
        [Gmail,Contraseña,Nombre,idUsarios],(err,result)=>{
            if (err) {
                return res.status(500).json(err)
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({msg:"Usuario no enconrado"})
            }
            return res.status(200).json({msg:"Usuario actualizado"})
        });
});


router.delete("/:idUsarios", (req,res)=>{
    const {idUsarios} = req.params
    db.query("DELETE FROM usarios WHERE idUsarios = ?",
        [idUsarios],
        (err,result)=>{
            if (err) {
            return res.status(500).json(err)
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({error:"Usuario no existe"})
            }
            return res.status(200).json({msg:"Usuario eliminado"})
        });
});


export default router;