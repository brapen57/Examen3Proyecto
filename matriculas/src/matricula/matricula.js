const mongoose = require("mongoose");

const matriculaSchema = new mongoose.Schema({
    estudianteId: { type: mongoose.Schema.Types.ObjectId, ref: "Estudiante", required: true },
    apoderadoId: { type: mongoose.Schema.Types.ObjectId, ref: "Apoderado", required: true },
    estado: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Matricula", matriculaSchema);
