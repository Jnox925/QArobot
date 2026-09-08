import "./About.css";

const AUTHOR_NAME = "Juan Carlos Agudelo Triana";
const AUTHOR_BIO =
  "Estudiante de desarrollo web, construyendo este proyecto para practicar React, " +
  "consumo de APIs y diseño de componentes reutilizables.";
const AUTHOR_LINKS = [
  { label: "GitHub", href: "https://github.com/Jnox925" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan-carlos-agudelo-triana-115051198/",
  },
];

function About() {
  return (
    <section className="about">
      <h2 className="about__title">Acerca de</h2>

      <p className="about__name">{AUTHOR_NAME}</p>

      <p className="about__bio">{AUTHOR_BIO}</p>

      <ul className="about__links">
        {AUTHOR_LINKS.map((link) => (
          <li className="about__link-item" key={link.href}>
            <a
              className="about__link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default About;
