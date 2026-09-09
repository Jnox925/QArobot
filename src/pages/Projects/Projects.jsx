import { useState, useEffect } from "react";
import { useProjects } from "../../hooks/useProjects";
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

const PAGE_SIZE = 3;

function Projects() {
  const { type, setType, projects, loading, error, search, reload } =
    useProjects();

  const [queryInput, setQueryInput] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [projects]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    search(queryInput);
  }

  function handleShowMore() {
    setVisibleCount((count) => count + PAGE_SIZE);
  }

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

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
          value={queryInput}
          onChange={(event) => setQueryInput(event.target.value)}
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

      {!loading && error && <ErrorMessage error={error} onRetry={reload} />}

      {!loading && !error && projects.length === 0 && (
        <p className="projects__empty">
          No encontramos actividades con esos filtros.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="projects__grid">
            {visibleProjects.map((project) =>
              project.type === "quiz" ? (
                <QuizCard key={project.id} quiz={project} />
              ) : (
                <ProjectCard key={project.id} project={project} />
              ),
            )}
          </div>

          {hasMore && (
            <button
              className="projects__show-more"
              type="button"
              onClick={handleShowMore}
            >
              Mostrar más
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default Projects;
