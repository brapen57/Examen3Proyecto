import mongoose from "mongoose";

const ApoderadoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
});

export default mongoose.model("Apoderado", ApoderadoSchema);
