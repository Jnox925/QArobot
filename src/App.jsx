import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="app-nav">
        <Link to="/">Inicio</Link>
        <Link to="/projects">Actividades</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
