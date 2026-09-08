import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        © {year} QArobot — datos de{" "}
        <a
          className="footer__link"
          href="https://www.inaturalist.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          iNaturalist
        </a>{" "}
        y{" "}
        <a
          className="footer__link"
          href="https://opentdb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Trivia Database
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
