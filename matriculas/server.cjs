const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Verificar la URI de conexión
console.log("MONGODB_URI:", process.env.MONGODB_URI);

// Configuración de conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa con MongoDB");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err.message);
    process.exit(1);
  }
};

// Conectar a la base de datos
connectDB();

// Middleware para procesar JSON
app.use(express.json());

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("API de Matriculas funcionando correctamente.");
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});