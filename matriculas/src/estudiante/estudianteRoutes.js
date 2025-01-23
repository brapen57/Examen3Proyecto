const express = require("express");
const router = express.Router();
const estudianteController = require("./controller");

router.post("/", estudianteController.createEstudiante);
router.get("/", estudianteController.getEstudiantes);
router.put("/:id", estudianteController.updateEstudiante);
router.delete("/:id", estudianteController.deleteEstudiante);

module.exports = router;