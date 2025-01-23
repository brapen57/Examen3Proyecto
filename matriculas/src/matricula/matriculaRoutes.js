const express = require("express");
const router = express.Router();
const matriculaController = require("./controller");

router.post("/", matriculaController.createMatricula);
router.get("/", matriculaController.getMatriculas);
router.put("/:id", matriculaController.updateMatricula);
router.delete("/:id", matriculaController.deleteMatricula);

module.exports = router;