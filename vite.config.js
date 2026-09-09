import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// "base" debe ser "/<nombre-del-repo>/" para que los assets (JS, CSS,
// fuentes) se resuelvan bien en GitHub Pages, donde la app no vive en la
// raíz del dominio sino en https://<usuario>.github.io/<repo>/.
// Si el repo en GitHub NO se llama exactamente "QArobot", cambia este valor
// para que coincida con el nombre real del repositorio.
export default defineConfig({
  plugins: [react()],
  base: "/QArobot/",
});
