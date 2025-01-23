const express = require("express");
const router = express.Router();
const usuarioController = require("./controller");

router.post("/", usuarioController.createUsuario);
router.get("/", usuarioController.getUsuarios);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

module.exports = router;