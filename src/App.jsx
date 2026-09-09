import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Main from "./pages/Main/Main";
import Projects from "./pages/Projects/Projects";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </HashRouter>
  );
}

export default App;
