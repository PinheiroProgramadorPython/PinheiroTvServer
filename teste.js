import express from "express";
import linkPlaylist from "./config/config.js";


express.Router

let carregarCanais = async () => {
    let req = await fetch(linkPlaylist);
    while (true) {
        let resp = await req.text().slice(0, 1);
        console.log(resp)
    }

}

carregarCanais()
