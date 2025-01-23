const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    curso: { type: String, required: true },
    estadoMatricula: { type: String, default: "pendiente" },
    apoderado: { type: mongoose.Schema.Types.ObjectId, ref: "Apoderado", default: null },
    matricula: { type: mongoose.Schema.Types.ObjectId, ref: "Matricula", default: null },
});

module.exports = mongoose.model("Estudiante", estudianteSchema);