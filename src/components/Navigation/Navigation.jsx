import { NavLink } from "react-router-dom";
import "./Navigation.css";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/projects", label: "Actividades" },
  { to: "/about", label: "Acerca de" },
];

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {LINKS.map((link) => (
          <li className="navigation__item" key={link.to}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "navigation__link navigation__link--active"
                  : "navigation__link"
              }
              to={link.to}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
