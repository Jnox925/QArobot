import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  return (
    <section className="main-page">
      <h1 className="main-page__title">Aprende jugando</h1>
      <p className="main-page__lead">
        Una plataforma para descubrir la naturaleza y aprender ciencia
        jugando: observaciones reales de animales de todo el mundo y un quiz
        interactivo para poner a prueba lo aprendido.
      </p>
      <Link className="main-page__cta" to="/projects">
        Ver actividades
      </Link>
    </section>
  );
}

export default Main;
