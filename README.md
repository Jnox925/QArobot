# QArobot — scaffold

Plataforma educativa de ciencia natural para niños: observaciones reales de
animales (**iNaturalist**) y un quiz interactivo de ciencia (**Open Trivia
Database**).

## Estructura

```
QArobot-frontend/
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
│   │   └── ErrorMessage/    ← estado de error + botón "Reintentar"
│   ├── pages/
│   │   ├── Main/             ← página principal: descripción del proyecto
│   │   └── Projects/         ← página con los datos de la API (búsqueda + filtro)
│   ├── utils/
│   │   └── api.js           ← todos los fetch a iNaturalist y Open Trivia DB
│   ├── App.jsx               ← raíz: monta Header, Routes y Footer
│   ├── App.css
│   ├── main.jsx
│   └── index.css            ← tokens de diseño (color, tipografía)
├── index.html
├── package.json
└── vite.config.js
```

### Mapa de componentes mínimos

| Componente requerido | Dónde está |
|---|---|
| `App` | `src/App.jsx` |
| `Main` | `src/pages/Main/Main.jsx` |
| `Header` | `src/components/Header/Header.jsx` |
| `Navigation` | `src/components/Navigation/Navigation.jsx` |
| `About` | `src/components/About/About.jsx` — **reemplaza los datos de ejemplo por los tuyos** |
| `Footer` | `src/components/Footer/Footer.jsx` |
| `Preloader` | `src/components/Preloader/Preloader.jsx` |

## Cómo correrlo

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
   Open Trivia DB agrega una actividad *interactiva* (un quiz), no solo
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
- `fetchProjects()` usa `Promise.allSettled` (no `Promise.all`): si una sola
  fuente falla, la otra igual se muestra. Solo se lanza el error de
  `<ErrorMessage />` si absolutamente ambas fuentes fallan.
- **Dos formas de datos, no una sola.** A diferencia de la versión anterior
  (donde NASA/SpaceX compartían una única forma), aquí `type: 'nature'` y
  `type: 'quiz'` tienen formas distintas porque son experiencias distintas:
  una es contenido para leer (`<ProjectCard />`), la otra es una actividad
  interactiva con estado propio (`<QuizCard />`, que recuerda qué opción
  eligió el niño y si acertó). `Projects.jsx` decide qué componente renderizar
  mirando `project.type`.
- La búsqueda por texto (`q`) solo aplica a las tarjetas de naturaleza — las
  preguntas del quiz no se filtran por texto, porque cambiaría el conjunto de
  opciones ya mezcladas aleatoriamente.
- Todas las clases siguen BEM (`bloque__elemento--modificador`), como pide
  la consigna.
- **`About` trae datos de ejemplo** (`Tu Nombre`, enlaces a `github.com/tu-usuario`,
  etc.) — ábrelo y reemplázalos por tu información real antes de entregar.

## Siguientes pasos sugeridos

1. Ajustar `perPage` / `amount` en `api.js` según cuánto contenido quieras
   por página.
2. Agregar un contador de aciertos al quiz (por ejemplo, sumando los
   `QuizCard` respondidos correctamente en el estado de `Projects.jsx`).
3. Si quieres variar el tipo de animal, cambia `iconic_taxa` en
   `fetchNatureObservations` (por ejemplo `Insecta` para insectos, o quítalo
   para incluir también plantas y hongos).
