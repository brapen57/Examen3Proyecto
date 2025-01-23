export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://peliculas-8ed9a.web.app///api" // Tu URL de producción
    : "http://localhost:3000/api"; // URL local para el entorno de desarrollo