import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Expertise from "./pages/Expertise";
import Contact from "./pages/Contact";
import BookConsultation from "./pages/BookConsultation";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookConsultation />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
