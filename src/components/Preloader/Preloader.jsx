import "./Preloader.css";

function Preloader({ label = "Cargando actividades…" }) {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <svg className="preloader__icon" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          className="preloader__track"
          cx="24"
          cy="24"
          r="19"
          fill="none"
          strokeWidth="4"
        />
        <circle
          className="preloader__arc"
          cx="24"
          cy="24"
          r="19"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <p className="preloader__text">{label}</p>
    </div>
  );
}

export default Preloader;
