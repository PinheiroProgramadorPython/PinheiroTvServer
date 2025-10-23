import linkPlaylist from "../config/config.js";
import canalSchema from "../models/canal.js";

let lista = [];

let canais = [];

let download = async () => {
    let req = await fetch(linkPlaylist);
    let resp = await req.text();
    lista = resp.split("\n");
    lista.forEach((linha, i) => {
        if (linha.includes("http://")) {
            lista[i] = linha.replace(".ts", ".m3u8").trim();
        } else {
            lista[i] = linha.replace("#EXTINF:-1,", "").trim();
        }
    });

    lista.forEach((linha, i) => {
        if (linha.includes("http://")) {
            let nome = lista[i - 1];
            let url = lista[i];
            canais.push({ nome: nome, url: url })
        }
    });

    await canalSchema.deleteMany({});
    await canalSchema.insertMany(canais);

    console.log(`✅ ${canais.length} canais atualizados!`);

    return canais;
};

export default async function atualizarCanais() {
    return await download();
}
