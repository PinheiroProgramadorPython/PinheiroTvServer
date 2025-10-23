import express from "express";
import canalSchema from "../models/canal.js";


const router = express.Router();

router.get("/canais", async (req, resp) => {
    try {
        let canais = await canalSchema.find();
        resp.status(200).json(canais);
    } catch (error) {
        resp.status(404).json({ message: "Erro Interno do Servidor" });
    }
});


export default router;
