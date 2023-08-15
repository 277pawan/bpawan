import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import Footer from './Component/Footer/Footer';
import Header from './Component/Header/Header';
import Navbar from './Component/Navbar/Navbar';
import Projects from './Component/Projects/Projects';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<>
            <Header />
            <About />
            <Projects />
            <Contact />
            <Footer />
          </>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
