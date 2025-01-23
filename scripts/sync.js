const schedule = require("node-schedule");
const admin = require("firebase-admin");
const mongoose = require("mongoose");

const serviceAccount = require("../firestore-to-mongodb/firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

const MONGO_URI = "mongodb+srv://ev3_express:brapen572032@cluster-express.qsa0d.mongodb.net/institucion?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {})
  .then(() => console.log("Conexión exitosa con MongoDB"))
  .catch((error) => console.error("Error al conectar con MongoDB:", error));

const EstudianteSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  curso: String,
  estadoMatricula: String,
});

const Estudiante = mongoose.model("Estudiante", EstudianteSchema);

const syncFirestoreToMongoDB = async () => {
  try {
    console.log("Iniciando sincronización...");
    const snapshot = await firestore.collection("estudiantes").get();

    if (snapshot.empty) {
      console.log("No hay datos en Firestore.");
      return;
    }

    const estudiantes = snapshot.docs.map((doc) => doc.data());

    for (const estudiante of estudiantes) {
      await Estudiante.findOneAndUpdate(
        { nombre: estudiante.nombre, curso: estudiante.curso },
        estudiante,
        { upsert: true }
      );
    }

    console.log("Sincronización completada con éxito.");
  } catch (error) {
    console.error("Error durante la sincronización:", error);
  }
};

// Programa el cron-job para cada 1 hora
schedule.scheduleJob("0 * * * *", () => {
  console.log("Ejecutando sincronización programada...");
  syncFirestoreToMongoDB();
});