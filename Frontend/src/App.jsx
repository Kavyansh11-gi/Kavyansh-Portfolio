import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

// Project Page Imports
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
  
  // 1. Theme Logic
  const [theme, setTheme] = useState("emerald"); 

  const themeStyles = {
    emerald: {
      bg: "#020617",
      accent: "#10b981",
      glow: "rgba(16, 185, 129, 0.15)",
      gradient: "radial-gradient(circle at 50% 50%, #061512 0%, #020617 100%)"
    },
    electric: {
      bg: "#020817",
      accent: "#3b82f6",
      glow: "rgba(59, 130, 246, 0.15)",
      gradient: "radial-gradient(circle at 50% 50%, #081a33 0%, #020817 100%)"
    },
    sapphire: {
      bg: "#050010",
      accent: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.15)",
      gradient: "radial-gradient(circle at 50% 50%, #1a0b3b 0%, #050010 100%)"
    }
  };

  const current = themeStyles[theme];

  // 2. CRITICAL FIX: Sync CSS Variables with DOM
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', current.accent);
    document.documentElement.style.setProperty('--glow', current.glow);
    // Force body background update for smooth transitions
    document.body.style.backgroundColor = current.bg;
  }, [theme, current]);

  const toggleTheme = () => {
    const themes = ["emerald", "electric", "sapphire"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{ 
          background: "#0f172a", 
          color: current.accent, 
          border: `1px solid ${current.accent}44` 
        }}
      />

      {/* 3. Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="fixed bottom-10 right-10 z-[100] group flex items-center gap-3 p-2 pr-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <div 
          className="w-12 h-12 rounded-xl transition-all duration-500 flex items-center justify-center shadow-lg relative overflow-hidden" 
          style={{ backgroundColor: current.accent }}
        >
           <div className="w-4 h-4 bg-white/30 rounded-full animate-ping absolute" />
           <div className="w-2 h-2 bg-white rounded-full z-10" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Mode</span>
          <span className="text-sm font-bold capitalize text-white" style={{ color: current.accent }}>
            {theme}
          </span>
        </div>
      </button>

      <Routes>
        <Route
          path="/"
          element={
            <div ref={dragAreaRef} className="min-h-screen text-slate-100 relative transition-colors duration-1000" style={{ backgroundColor: current.bg }}>
              <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 transition-opacity duration-1000" style={{ background: current.gradient }} />
                <div className="absolute inset-0 opacity-[0.04] transition-all duration-1000" 
                  style={{ 
                    backgroundImage: `linear-gradient(${current.accent} 1px, transparent 1px), linear-gradient(90deg, ${current.accent} 1px, transparent 1px)`, 
                    backgroundSize: '45px 45px' 
                  }} 
                />
                <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full transition-all duration-1000" style={{ backgroundColor: current.glow, filter: 'blur(130px)' }} />
                <div className="absolute bottom-[-5%] right-[-5%] w-[55%] h-[55%] rounded-full transition-all duration-1000" style={{ backgroundColor: current.glow, filter: 'blur(160px)' }} />
              </div>

              <div className="relative z-10">
                <Navbar theme={theme} />
                <HeroSection dragAreaRef={dragAreaRef} theme={theme} />
                <About theme={theme} />
                <Skills theme={theme} />
                <Projects theme={theme} />
                <Journey theme={theme} />
                <ExternalLinks theme={theme} />
                <ContactSection theme={theme} />
              </div>
            </div>
          }
        />

        {/* 4. SYNCED PROJECT ROUTES */}
        <Route path="/projects" element={<AppLayout theme={theme} />}>
          <Route index element={<HomeProjects theme={theme} />} />
          <Route path="fullstack" element={<Fullstack theme={theme} />} />
          <Route path="django" element={<Django theme={theme} />} />
          <Route path="react" element={<ReactProjects theme={theme} />} />
          <Route path="opencv" element={<Opencv theme={theme} />} />
          <Route path="ai" element={<AI theme={theme} />} />
          <Route path="html" element={<HTML1 theme={theme} />} />
          <Route path="learnings" element={<Learning theme={theme} />} />
          <Route path="miniprojects" element={<Miniprojects theme={theme} />} />
        </Route>
      </Routes>

      <style>
        {`
          :root {
            --accent: #10b981; /* Fallback */
          }
          body { margin: 0; padding: 0; overflow-x: hidden; font-family: 'Inter', sans-serif; transition: background-color 1s ease; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; border: 2px solid #000; }
          section { width: 100%; max-width: 100vw; overflow: hidden; }
        `}
      </style>
    </>
  );
}

export default App;