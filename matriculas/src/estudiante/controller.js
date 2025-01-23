const Estudiante = require("./estudiante");

exports.createEstudiante = async (req, res) => {
    try {
        const estudiante = new Estudiante(req.body);
        await estudiante.save();
        res.status(201).send(estudiante);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.send(estudiantes);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(estudiante);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteEstudiante = async (req, res) => {
    try {
        await Estudiante.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};