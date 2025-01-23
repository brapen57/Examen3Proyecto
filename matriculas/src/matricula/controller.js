const Matricula = require("./matricula");

exports.createMatricula = async (req, res) => {
    try {
        const matricula = new Matricula(req.body);
        await matricula.save();
        res.status(201).send(matricula);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getMatriculas = async (req, res) => {
    try {
        const matriculas = await Matricula.find()
            .populate("estudianteId")
            .populate("apoderadoId");
        res.send(matriculas);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateMatricula = async (req, res) => {
    try {
        const matricula = await Matricula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(matricula);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteMatricula = async (req, res) => {
    try {
        await Matricula.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};