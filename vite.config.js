import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// "base: /" porque la app va a vivir en la raíz del dominio
// (https://bdnox.strangled.net/), no en un subpath como en GitHub Pages.
// Si en el futuro volvés a desplegar en GitHub Pages, cambialo de nuevo a
// "/QArobot/" (o el nombre real del repo).
export default defineConfig({
  plugins: [react()],
  base: "/",
});
