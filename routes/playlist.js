import express from "express";
import canalSchema from "../models/canal.js";


const router = express.Router();

router.get("/canais", async (req, resp) => {
    try {
        resp.writeHead(200, { "Content-Type": "application/json" });
        let canais = canalSchema.find().cursor();
        let first = true;
        resp.write("[");
        for await (let canal of canais) {
            if (!first) { resp.write(",") }
            first = false;
            canal = JSON.stringify(canal);
            resp.write(canal);
        }

        resp.write("]");
        resp.end();

    } catch (error) {
        resp.status(404).json({ message: "Erro Interno do Servidor" });
    }
});


export default router;
