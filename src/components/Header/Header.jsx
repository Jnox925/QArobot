import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link className="header__brand" to="/">
        QArobot
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
