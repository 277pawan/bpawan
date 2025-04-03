import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Component/About/About";
import Contact from "./Component/Contact/Contact";
import SnowflakeCursor from "./lib/SnowFlake.jsx";
import Header from "./Component/Header/Header";
import Navbar from "./Component/Navbar/Navbar";
import Projects from "./Component/Projects/Projects";
import Experience from "./Component/Experience/Experience";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <About />
                <Experience />
                <Projects />
                <Contact />
                <SnowflakeCursor />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
