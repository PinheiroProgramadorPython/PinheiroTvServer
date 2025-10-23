import mongoose from "mongoose";


const canalSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    url: { type: String, required: true }
}, { versionKey: false })

export default mongoose.model("Canal", canalSchema, "canais");
