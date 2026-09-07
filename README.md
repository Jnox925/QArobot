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
│   │   ├── ProjectCard/     ← tarjeta reutilizable para observaciones (type: 'nature')
│   │   ├── QuizCard/        ← tarjeta interactiva para preguntas de trivia (type: 'quiz')
│   │   ├── Preloader/       ← animación de carga
│   │   └── ErrorMessage/    ← estado de error + botón "Reintentar"
│   ├── pages/
│   │   ├── Home/            ← página 1: descripción del proyecto
│   │     ├── Home.css
│   │     ├── Home.jsx
│   │   └── Projects/        ← página 2: datos de la API (búsqueda + filtro)
│   │     ├── Projects.css
│   │     ├── Projects.jsx
│   ├── utils/
│   │   └── api.js           ← todos los fetch a iNaturalist y Open Trivia DB
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css            ← tokens de diseño (color, tipografía)
├── index.html
├── package.json
└── vite.config.js
```

## Notas importantes

- **Ninguna de las dos APIs requiere key.**
- **iNaturalist** (`api.inaturalist.org/v1`): filtra por
  `quality_grade=research` (identificación verificada por la comunidad) e
  `iconic_taxa=Animalia` (animales, más atractivo para niños que hongos o
  plantas). Pide no más de ~1 solicitud por segundo y ~10.000 al día.
- **Open Trivia DB** (`opentdb.com`): usamos la categoría 17
  ("Science & Nature") y `difficulty=easy`. Tiene un límite de 1 solicitud
  cada 5 segundos por IP.
- `fetchProjects()` usa `Promise.allSettled` (no `Promise.all`): si una sola
  fuente falla, la otra igual se muestra. Solo se lanza el error de
  `<ErrorMessage />` si absolutamente ambas fuentes fallan.
- **Dos formas de datos, no una sola.** `type: 'nature'` y
  `type: 'quiz'` tienen formas distintas porque son experiencias distintas:
  una es contenido para leer (`<ProjectCard />`), la otra es una actividad
  interactiva con estado propio (`<QuizCard />`, que recuerda qué opción
  eligió el niño y si acertó). `Projects.jsx` decide qué componente renderizar
  mirando `project.type`.
- La búsqueda por texto (`q`) solo aplica a las tarjetas de naturaleza — las
  preguntas del quiz no se filtran por texto, porque cambiaría el conjunto de
  opciones ya mezcladas aleatoriamente.
- Todas las clases siguen BEM (`bloque__elemento--modificador`), como parte
  del proceso de desarollo aprendido en el curso.
