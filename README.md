# QArobot

Plataforma educativa de ciencia natural para niños: observaciones reales de
animales (**iNaturalist**) y un quiz interactivo de ciencia (**Open Trivia
Database**).

**🔗 Demo publicada:** https://bdnox.strangled.net/projects

## Repositorio GitHub

QArobot-frontend https://github.com/Jnox925/QArobot/tree/main

## Nombre de aplicación

QArobot

## Tecnologías aplicadas

React
JavaScript
HTML5
CSS3
BEM
React
Router
Fetch
API
Git
GitHub

## Estructura

```
QArobot-frontend/
├── deploy/
│   └── nginx.conf.example   ← server block de referencia para la VM
├── public/
├── src/
│   ├── components/
│   │   ├── Header/          ← marca + <Navigation />, se renderiza en todas las páginas
│   │   ├── Navigation/      ← menú de navegación (Inicio / Actividades / Acerca de)
│   │   ├── About/           ← presentación: información sobre el autor (¡edítala!)
│   │   ├── Footer/          ← pie de página, presentacional
│   │   ├── ProjectCard/     ← tarjeta reutilizable para observaciones (type: 'nature')
│   │   ├── QuizCard/        ← tarjeta interactiva para preguntas de trivia (type: 'quiz')
│   │   ├── Preloader/       ← animación de carga
│   │   └── ErrorMessage/    ← estado de error + botón "Reintentar" (iconos SVG)
│   ├── hooks/
│   │   └── useProjects.js  ← toda la lógica de datos de la página Projects
│   ├── pages/
│   │   ├── Main/            ← página principal: descripción del proyecto
│   │   └── Projects/        ← página con los datos de la API (búsqueda + filtro + paginado)
│   ├── utils/
│   │   ├── api.js          ← fetch a iNaturalist y Open Trivia DB
│   │   └── constants.js    ← URLs base y demás constantes de configuración
│   ├── fonts/               ← Space Grotesk e Inter en .woff2, cargadas localmente
│   ├── App.jsx              ← raíz: monta Header, <main>, Routes y Footer
│   ├── App.css
│   ├── main.jsx
│   └── index.css            ← tokens de diseño + @font-face
├── index.html
├── package.json
└── vite.config.js
```

### Mapa de componentes mínimos

| Componente requerido | Dónde está                                                                       |
| -------------------- | -------------------------------------------------------------------------------- |
| `App`                | `src/App.jsx`                                                                    |
| `Main`               | `src/pages/Main/Main.jsx`                                                        |
| `Header`             | `src/components/Header/Header.jsx`                                               |
| `Navigation`         | `src/components/Navigation/Navigation.jsx`                                       |
| `About`              | `src/components/About/About.jsx` (datos de ejemplo — reemplázalos por los tuyos) |
| `Footer`             | `src/components/Footer/Footer.jsx`                                               |
| `Preloader`          | `src/components/Preloader/Preloader.jsx`                                         |

## Cómo correrlo en local

```bash
npm install
npm run dev
```

## Por qué este cambio de fuentes de datos

El proyecto pasó por dos APIs antes de llegar a esta combinación:

1. **ImpactMojo** (versión original de la propuesta).
2. **NASA + SpaceX** — pero la SpaceX API dejó de responder de forma
   confiable (su repositorio fue archivado el 6 de junio de 2026), así que
   se reemplazó por **Launch Library 2**.
3. **iNaturalist + Open Trivia DB** (versión actual) — NASA y Launch
   Library 2 seguían siendo técnicamente correctas, pero su contenido
   (misiones espaciales, cohetes) es más avanzado de lo que le interesa a
   un niño. iNaturalist da fotos reales de animales con nombres simples, y
   Open Trivia DB agrega una actividad _interactiva_ (un quiz), no solo
   contenido de lectura — mejor encaje para un público infantil orientado a
   educación.

## Notas importantes

- **Ninguna de las dos APIs requiere key.**
- **iNaturalist** (`api.inaturalist.org/v1`): filtra por
  `quality_grade=research` (identificación verificada por la comunidad) e
  `iconic_taxa=Animalia` (animales, más atractivo para niños que hongos o
  plantas). Pide no más de ~1 solicitud por segundo y ~10.000 al día — de
  sobra para este proyecto.
- **Open Trivia DB** (`opentdb.com`): usamos la categoría 17
  ("Science & Nature") y `difficulty=easy`. Tiene un límite de 1 solicitud
  cada 5 segundos por IP — si pruebas la búsqueda muy seguido puede
  devolver un error temporal, normal en esta API.
- `fetchProjects()` (en `api.js`) usa `Promise.allSettled` (no
  `Promise.all`): si una sola fuente falla, la otra igual se muestra. Solo
  se lanza el error de `<ErrorMessage />` si absolutamente ambas fuentes
  fallan. `request()` está escrito como cadena `.then()/.catch()`.
- **Dos formas de datos, no una sola.** `type: 'nature'` y `type: 'quiz'`
  tienen formas distintas porque son experiencias distintas: una es
  contenido para leer (`<ProjectCard />`), la otra es una actividad
  interactiva con estado propio (`<QuizCard />`, que recuerda qué opción
  eligió el niño y si acertó). `Projects.jsx` decide qué componente
  renderizar mirando `project.type`.
- **`useProjects` (en `src/hooks/`)** concentra el `type`, la búsqueda
  confirmada, y el ciclo `loading/error/projects`. `Projects.jsx` solo se
  encarga de la UI: el formulario, las tarjetas y la paginación
  ("Mostrar más", de a 3 en 3, con `visibleCount` reiniciándose cada vez
  que cambian los resultados).
- La búsqueda por texto solo aplica a las tarjetas de naturaleza — las
  preguntas del quiz no se filtran por texto, porque cambiaría el conjunto
  de opciones ya mezcladas aleatoriamente. Además, escribir en el input no
  dispara un fetch por cada tecla: solo se busca al enviar el formulario.
- **Tipografías**: Space Grotesk (encabezados) e Inter (cuerpo) se cargan
  desde `src/fonts/*.woff2` vía `@font-face` en `index.css` — no dependen
  de ningún CDN externo.
- Todas las clases siguen BEM (`bloque__elemento--modificador`), como pide
  la consigna.
