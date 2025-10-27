import linkPlaylist from "../config/config.js";
import canalSchema from "../models/canal.js";
import fs from "fs/promises";
// import { Storage } from '@google-cloud/storage';
// import path from 'path';
// import { fileURLToPath } from 'url';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = new Storage({
//     projectId: 'linen-fuze-476114-a5',
//     keyFilename: path.join(__dirname, 'service-account.json'),
// });
// const bucketName = "linen-fuze-476114-a5_cloudbuild";



let lista = [];

let canais = [];

let download = async () => {
    try {
        // let qtCanais = await canalSchema.countDocuments();
        // if (qtCanais > 0) { return; }
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

        // const fileName = 'canais.json';
        // const file = storage.bucket(bucketName).file(fileName);

        // await file.save(JSON.stringify(canais), {
        //     contentType: 'application/json',
        //     resumable: false,
        // });

        // console.log(`✅ Arquivo ${fileName} salvo no bucket ${bucketName}!`);
        // const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        // console.log(`📥 Download disponível em: ${publicUrl}`);
        await fs.writeFile("canais.json", JSON.stringify(canais));
        return canais;

    } catch (error) {
        console.error(error);
    }

};

export default async function atualizarCanais() {
    return await download();
}
