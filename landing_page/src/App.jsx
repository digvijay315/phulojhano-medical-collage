import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Administration from "./pages/Administration";
import Contact from "./pages/Contact";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import Recruitment from "./pages/Recruitment";
import Stipends from "./pages/Stipends";
import Students from "./pages/Students";
import Tenders from "./pages/Tenders";
import Chatbot from "./components/Chatbot";
import WelcomePopup from "./components/WelcomePopup";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/stipends" element={<Stipends />} />
            <Route path="/students" element={<Students />} />
            <Route path="/tender" element={<Tenders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <WelcomePopup />
      </div>
    </BrowserRouter>
  );
}