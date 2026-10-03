import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import BlogList from "./Component/Blog/BlogList";
import BlogArticle from "./Component/Blog/BlogArticle";
import HomePage from "./Component/Home/HomePage";
import ProjectPage from "./Component/Projects/ProjectPage";
import ScrollToTop from "./lib/ScrollToTop";
import { getArticleBySlug } from "./content/blog/loadArticles";

function StripIndexHtml() {
  const { pathname } = useLocation();
  const next = pathname.replace(/\/index\.html$/, "") || "/";
  return <Navigate to={next} replace />;
}

function ShortArticle() {
  const { slug } = useParams();
  if (getArticleBySlug(slug)) {
    return <Navigate to={`/engineering/${slug}`} replace />;
  }
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<StripIndexHtml />} />
          <Route path="/engineering" element={<BlogList />} />
          <Route path="/engineering/index.html" element={<StripIndexHtml />} />
          <Route path="/engineering/:slug/index.html" element={<StripIndexHtml />} />
          <Route path="/engineering/:slug" element={<BlogArticle />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/:slug/index.html" element={<StripIndexHtml />} />
          <Route path="/:slug" element={<ShortArticle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
