import express from "express";
import Apoderado from "./apoderado.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const apoderados = await Apoderado.find();
        res.json(apoderados);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener apoderados" });
    }
});

router.post("/", async (req, res) => {
    try {
        const apoderado = new Apoderado(req.body);
        await apoderado.save();
        res.json(apoderado);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar apoderado" });
    }
});

export default router;