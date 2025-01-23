const Apoderado = require("./apoderado");

exports.createApoderado = async (req, res) => {
    try {
        const apoderado = new Apoderado(req.body);
        await apoderado.save();
        res.status(201).send(apoderado);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getApoderados = async (req, res) => {
    try {
        const apoderados = await Apoderado.find();
        res.send(apoderados);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateApoderado = async (req, res) => {
    try {
        const apoderado = await Apoderado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(apoderado);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteApoderado = async (req, res) => {
    try {
        await Apoderado.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};