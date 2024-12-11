import { precacheAndRoute } from "workbox-precaching";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Precaching de recursos
precacheAndRoute(self.__WB_MANIFEST);

// Manejador para activar la instalación de la PWA
self.addEventListener("fetch", (event) => {
  // Puedes manejar peticiones específicas aquí si es necesario
});