import "./ErrorMessage.css";

function ErrorMessage({ error, onRetry }) {
  const isOffline = error?.status === 0;

  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon" aria-hidden="true">
        {isOffline ? "📡" : "⚠️"}
      </span>

      <h3 className="error-message__title">
        No pudimos cargar las actividades
      </h3>

      <p className="error-message__text">
        {error?.message ||
          "Ocurrió un problema inesperado. Intenta de nuevo en un momento."}
      </p>

      <button className="error-message__button" type="button" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}

export default ErrorMessage;
