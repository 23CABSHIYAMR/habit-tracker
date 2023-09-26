import "./App.css";
import About from "./Screen/About/About";
import Contact from "./Screen/Contact/Contact";
import Projects from "./Screen/Projects/Projects";
import Resume from "./Screen/Resume/Resume";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
