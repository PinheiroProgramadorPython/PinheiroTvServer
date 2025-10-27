import express from "express";
import canalSchema from "../models/canal.js";


const router = express.Router();

router.get("/canais", async (req, resp) => {
    try {
        resp.writeHead(200, { "Content-Type": "application/json" });
        let canais = canalSchema.find().batchSize(1000).cursor();
        let first = true;

        for await (let canal of canais) {
            canal = JSON.stringify(canal + "\n");
            resp.write(canal);
        }

        resp.end();

    } catch (error) {
        resp.status(404).json({ message: "Erro Interno do Servidor" });
    }
});


export default router;
