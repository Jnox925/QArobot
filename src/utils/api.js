const INATURALIST_BASE_URL = "https://api.inaturalist.org/v1";
const OPENTDB_BASE_URL = "https://opentdb.com";

// Categoría 17 de Open Trivia DB = "Science & Nature".
const OPENTDB_SCIENCE_CATEGORY = 17;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(url) {
  let response;

  try {
    response = await fetch(url);
  } catch (networkError) {
    throw new ApiError(
      "No se pudo conectar con el servicio. Revisa tu conexión.",
      0,
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `El servicio respondió con un error (${response.status}).`,
      response.status,
    );
  }

  return response.json();
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function fetchNatureObservations(perPage = 8) {
  const url =
    `${INATURALIST_BASE_URL}/observations?photos=true&quality_grade=research` +
    `&iconic_taxa=Animalia&locale=es&per_page=${perPage}&order=desc&order_by=created_at`;
  const data = await request(url);

  return data.results
    .filter((obs) => obs.photos && obs.photos.length > 0)
    .map((obs) => {
      const commonName = obs.taxon?.preferred_common_name;
      const scientificName = obs.taxon?.name || "especie sin identificar";
      const title = commonName
        ? `${commonName} (${scientificName})`
        : scientificName;

      return {
        id: `nature-${obs.id}`,
        type: "nature",
        title,
        description: obs.place_guess
          ? `Observado en ${obs.place_guess}. Identificación verificada por la comunidad de iNaturalist.`
          : "Identificación verificada por la comunidad de iNaturalist.",

        image: obs.photos[0].url.replace("square", "medium"),
        date: obs.observed_on || obs.created_at,
        link: obs.uri,
        featured: obs.quality_grade === "research",
      };
    });
}

export async function fetchScienceQuiz(amount = 8, difficulty = "easy") {
  const url =
    `${OPENTDB_BASE_URL}/api.php?amount=${amount}` +
    `&category=${OPENTDB_SCIENCE_CATEGORY}&difficulty=${difficulty}` +
    `&type=multiple&encode=url3986`;
  const data = await request(url);

  if (data.response_code !== 0) {
    throw new ApiError(
      "No hay suficientes preguntas para ese filtro. Intenta con otra dificultad.",
      200,
    );
  }

  return data.results.map((item, index) => {
    const question = decodeURIComponent(item.question);
    const correctAnswer = decodeURIComponent(item.correct_answer);
    const incorrectAnswers = item.incorrect_answers.map((a) =>
      decodeURIComponent(a),
    );

    return {
      id: `quiz-${index}-${question.slice(0, 12)}`,
      type: "quiz",
      category: decodeURIComponent(item.category),
      difficulty: item.difficulty,
      question,
      options: shuffle([correctAnswer, ...incorrectAnswers]),
      correctAnswer,
    };
  });
}

/**
 * Punto único de entrada que usa la página Projects: combina las dos
 * fuentes y aplica el filtro por tipo + búsqueda por texto.
 *
 * Usamos Promise.allSettled (no Promise.all) a propósito: si una sola fuente
 * falla, igual mostramos los datos de la otra en vez de bloquear toda la
 * página. Solo lanzamos error si TODAS las fuentes solicitadas fallan.
 *
 * @param {{ type: 'all'|'nature'|'quiz', q: string }} filters
 */
export async function fetchProjects(filters = { type: "all", q: "" }) {
  const requests = [];

  if (filters.type === "all" || filters.type === "nature") {
    requests.push(fetchNatureObservations());
  }
  if (filters.type === "all" || filters.type === "quiz") {
    requests.push(fetchScienceQuiz());
  }

  const settled = await Promise.allSettled(requests);

  const fulfilled = settled.filter((result) => result.status === "fulfilled");
  const rejected = settled.filter((result) => result.status === "rejected");

  if (fulfilled.length === 0 && rejected.length > 0) {
    throw rejected[0].reason;
  }

  let items = fulfilled.flatMap((result) => result.value);

  if (filters.q && filters.q.trim() !== "") {
    const q = filters.q.trim().toLowerCase();
    items = items.filter(
      (item) =>
        item.type !== "nature" ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    );
  }

  return items;
}

export { ApiError };
