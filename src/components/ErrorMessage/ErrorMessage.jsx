import "./ErrorMessage.css";

function OfflineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 20h.01M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M2 9a15 15 0 0 1 20 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.16A2 2 0 0 0 3.83 21h16.34a2 2 0 0 0 1.72-3.01L13.71 3.86a2 2 0 0 0-3.42 0z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorMessage({ error, onRetry }) {
  const isOffline = error?.status === 0;

  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon">
        {isOffline ? <OfflineIcon /> : <WarningIcon />}
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
