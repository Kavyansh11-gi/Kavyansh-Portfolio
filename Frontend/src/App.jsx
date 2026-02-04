import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/HeroProject";
import Journey from './components/Journey';
import ContactSection from "./components/Contact";
import AppLayout from "./components/projects/Applayout";
import ExternalLinks from "./components/ExternalLinks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeProjects from "./components/projects/HomeProjects";
import Fullstack from "./components/projects/Fullstack";
import Django from "./components/projects/Django";
import ReactProjects from "./components/projects/React";
import Opencv from "./components/projects/opencv";
import AI from "./components/projects/AI";
import Learning from "./components/projects/Learning";
import Miniprojects from "./components/projects/MiniProjects";
import HTML1 from "./components/projects/htlm.jsx";

function App() {
  const dragAreaRef = useRef(null);

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{ background: "#1e293b", color: "#fff" }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <div ref={dragAreaRef} className="min-h-screen text-white animate-gradient overflow-hidden">
              <Navbar />
              <HeroSection dragAreaRef={dragAreaRef} />
              <About />
              <Skills />
              <Projects />
              <Journey />
              <ExternalLinks />
              <ContactSection />
            </div>
          }
        />

        {/* Static Project Routes - Publicly Accessible */}
        <Route path="/projects" element={<AppLayout />}>
          <Route index element={<HomeProjects />} />
          <Route path="fullstack" element={<Fullstack />} />
          <Route path="django" element={<Django />} />
          <Route path="react" element={<ReactProjects />} />
          <Route path="opencv" element={<Opencv />} />
          <Route path="ai" element={<AI />} />
          <Route path="html" element={<HTML1 />} />
          <Route path="learnings" element={<Learning />} />
          <Route path="miniprojects" element={<Miniprojects />} />
        </Route>
      </Routes>

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background: linear-gradient(270deg, #000000, #0a0a0a, #1b0f3b, #12001f);
            background-size: 600% 600%;
            animation: gradient 20s ease infinite;
          }
          
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}

export default App;