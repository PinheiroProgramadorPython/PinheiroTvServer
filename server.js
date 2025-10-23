import express from "express";
import cors from "cors";
import routerPlaylist from "./routes/playlist.js";
import "./mongoDB/mongoDB.js";
import atualizarCanais from "./utils/atualizarCanais.js";



const app = express();


app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type"]
}));

app.use(routerPlaylist);
app.use(express.json());


atualizarCanais();

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Api Rodando com Sucesso! Na porta: ${port}`) });
