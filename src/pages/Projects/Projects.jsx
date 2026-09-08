import { useEffect, useState, useCallback } from "react";
import { fetchProjects } from "../../utils/api";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import QuizCard from "../../components/QuizCard/QuizCard";
import Preloader from "../../components/Preloader/Preloader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Projects.css";

const FILTERS = [
  { value: "all", label: "Todos" },
  { value: "nature", label: "Naturaleza" },
  { value: "quiz", label: "Quiz de ciencia" },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProjects({ type, q: query });
      setProjects(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [type, query]);

  useEffect(() => {
    loadProjects();
  }, [type]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    loadProjects();
  }

  return (
    <section className="projects">
      <header className="projects__header">
        <h2 className="projects__title">Explora y aprende</h2>
        <p className="projects__subtitle">
          Animales reales de iNaturalist y un quiz de ciencia para poner a
          prueba lo aprendido.
        </p>
      </header>

      <form className="projects__controls" onSubmit={handleSearchSubmit}>
        <input
          className="projects__search"
          type="search"
          placeholder="Buscar un animal…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          className="projects__filter"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          {FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>

        <button className="projects__search-button" type="submit">
          Buscar
        </button>
      </form>

      {loading && <Preloader label="Preparando actividades…" />}

      {!loading && error && (
        <ErrorMessage error={error} onRetry={loadProjects} />
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="projects__empty">
          No encontramos actividades con esos filtros.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="projects__grid">
          {projects.map((project) =>
            project.type === "quiz" ? (
              <QuizCard key={project.id} quiz={project} />
            ) : (
              <ProjectCard key={project.id} project={project} />
            ),
          )}
        </div>
      )}
    </section>
  );
}

export default Projects;
