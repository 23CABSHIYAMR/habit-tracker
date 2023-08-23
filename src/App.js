import "./App.css";
import About from "./Screen/About/About";
import Resume from "./Screen/Resume/Resume";
import Layout from "./components/Layout/Layout";
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
        </Routes>
      </Router>
    </>
  );
}
export default App;
