import {Router} from "express";
import db from "../Conection/DB.js";

const router = Router()

router.get("/", (req,res)=>{
    db.query("SELECT * FROM nota;", (err,result)=>{
        if (err) {
            res.status(500).json(err)
        }
        res.json(result)
    });
});

router.post("/", (req,res)=>{
    const {Contenido,idUsuarios} = req.body
    if (!Contenido,!idUsuarios) {
        res.status(400).json({error:"Agregue contenido"})
    }
    db.query("INSERT INTO nota (Contenido,Fecha,idUsuarios) VALUES (?,NOW(),?);",
        [Contenido,idUsuarios],
        (err,result)=>{
            if (err) {
                return res.status(500).json(err)
            }
            res.status(201).json({id: result.insertId, Contenido,idUsuarios})
        });
});

router.put("/:idNota", (req,res)=>{
    const {IdNota} =req.body
    db.query("UPDATE nota SET Contenido = ? WHERE idNota = ?", 
        [IdNota],
        (err,result)=>{
            if (err) {
                return res.status(500).json(err)
            }
            if (result.length === 0) {
                return res.status(404).json({error:"Nota no encontrada"})
            }
            res.status(200).json({id: result.IdNota})
    });
});

router.delete("/:idNota", (req,res)=>{
    const {idNota} = req.params
    db.query("DELETE FROM nota WHERE idNota = ?",
        [idNota],
        (err,result)=>{
            if (err) {
            return res.status(500).json(err)
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({error:"la nota ya fue eliminada o no existe"})
            }
            return res.status(200).json({msg:"Nota eliminado"})
        });
});

export default router;