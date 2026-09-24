import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import BlogList from "./Component/Blog/BlogList";
import BlogArticle from "./Component/Blog/BlogArticle";
import HomePage from "./Component/Home/HomePage";
import ProjectPage from "./Component/Projects/ProjectPage";
import ScrollToTop from "./lib/ScrollToTop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/engineering" element={<BlogList />} />
          <Route path="/engineering/:slug" element={<BlogArticle />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
