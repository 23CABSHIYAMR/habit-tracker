import "./App.css";
import About from "./Screen/About/About";
import Projects from "./Screen/Projects/Projects";
import Resume from "./Screen/Resume/Resume";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="projects" element={<Projects />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
