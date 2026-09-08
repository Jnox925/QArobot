import "./ProjectCard.css";

const TYPE_LABEL = {
  nature: "Naturaleza",
};

function ProjectCard({ project }) {
  const { title, description, image, date, link, type, featured } = project;

  const cardClassName = featured
    ? "project-card project-card--featured"
    : "project-card";

  return (
    <article className={cardClassName}>
      {image && (
        <img
          className="project-card__image"
          src={image}
          alt={title}
          loading="lazy"
        />
      )}

      <div className="project-card__content">
        <span
          className={`project-card__category project-card__category--${type}`}
        >
          {TYPE_LABEL[type] || "Ciencia"}
        </span>

        <h3 className="project-card__title">{title}</h3>

        <p className="project-card__description">
          {description.length > 160
            ? `${description.slice(0, 160)}…`
            : description}
        </p>

        <div className="project-card__footer">
          <time className="project-card__date">
            {new Date(date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>

          <a
            className="project-card__button"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver más
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
