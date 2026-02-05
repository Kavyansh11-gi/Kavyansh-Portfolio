import React, { useState } from "react";
import { 
  Home, Globe, Layers, Zap, FileCode2, Terminal, Brain, 
  Puzzle, BookOpen, Github, Linkedin, Menu, X, ArrowLeft, TrendingUp 
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";

export default function AppLayout({ theme }) { // Received theme prop from App.jsx
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Theme Configuration Mapping
  const themeStyles = {
    emerald: {
      bg: "from-[#020617] via-[#061512] to-[#020617]",
      sidebar: "bg-[#061512]/70",
      accent: "#10b981",
      accentBg: "from-emerald-900/80 to-teal-600/80",
      text: "text-emerald-400"
    },
    electric: {
      bg: "from-[#020817] via-[#081a33] to-[#020817]",
      sidebar: "bg-[#081a33]/70",
      accent: "#3b82f6",
      accentBg: "from-blue-900/80 to-cyan-600/80",
      text: "text-blue-400"
    },
    sapphire: {
      bg: "from-[#050010] via-[#1a0b3b] to-[#050010]",
      sidebar: "bg-[#1a0b3b]/70",
      accent: "#8b5cf6",
      accentBg: "from-purple-900/80 to-indigo-600/80",
      text: "text-purple-400"
    }
  };

  const current = themeStyles[theme] || themeStyles.emerald;

  const counts = {
    total: 12,
    fullstack: 2,
    react: 3,
    ai: 1,
    html: 1,
    miniprojects: 2,
    learning: 5
  };

  const categories = [
    { id: "", name: "Home", icon: Home, color: "bg-gray-500" },
    { id: "fullstack", name: "Full Stack Apps", icon: Globe, color: "bg-gray-500" },
    { id: "react", name: "React Frontend", icon: Zap, color: "bg-gray-500" },
    { id: "ai", name: "AI & Assistants", icon: Brain, color: "bg-gray-500" },
    { id: "html", name: "HTML Projects", icon: FileCode2, color: "bg-gray-500" },
    { id: "miniprojects", name: "Mini Projects", icon: Puzzle, color: "bg-gray-500" },
    { id: "learnings", name: "Learning & Docs", icon: BookOpen, color: "bg-gray-500" },
  ];

  return (
    <div className={`flex w-full min-h-screen bg-gradient-to-br ${current.bg} text-white transition-colors duration-1000`}>
      {/* Dynamic Background Grid (Matches Portfolio) */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(${current.accent} 1px, transparent 1px), linear-gradient(90deg, ${current.accent} 1px, transparent 1px)`, 
          backgroundSize: '45px 45px' 
        }} 
      />

      <aside
        className={`fixed top-0 left-0 ${
          isSidebarOpen ? "w-64" : "w-0"
        } ${current.sidebar} backdrop-blur-xl border-r border-white/10 transition-all duration-300 overflow-hidden flex flex-col h-screen z-50`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4 mb-1">
            <div 
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-1000 bg-gradient-to-tr ${current.accentBg} shadow-lg`}
              style={{ boxShadow: `0 0 20px ${current.accent}33` }}
            >
              KN
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Kavyansh Nigam</h2>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">CSE Explorer</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a href="https://github.com/kavyansh11-gi" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/5">
              <Github size={18} />
            </a>
            <a href="https://leetcode.com/kavyanshnm19/" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/5">
              <SiLeetcode size={18} />
            </a>
            <a href="https://www.linkedin.com/in/kavyansh-nigam-2bb233278/" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/5">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-none relative z-10">
          {categories.map(({ id, name, icon: Icon }) => {
            const active = location.pathname === `/projects/${id}` || (id === "" && location.pathname === "/projects");
            return (
              <button
                key={id}
                onClick={() => navigate(`/projects/${id}`)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all duration-300 ${
                  active ? `bg-gradient-to-r ${current.accentBg} shadow-lg shadow-black/20` : "hover:bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <div className={`p-2 rounded-lg ${active ? "bg-white/20" : "bg-white/5"}`}>
                  <Icon size={18} style={{ color: active ? 'white' : current.accent }} />
                </div>
                <span className="font-semibold text-sm tracking-wide">{name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className={`flex-1 flex flex-col transition-all duration-300 relative z-10 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl hover:bg-white/10 transition-all">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-200 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all border border-white/5">
              <ArrowLeft size={14} /> Back
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-2 px-4 py-2 text-gray-400 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 hover:text-white transition-all">
              <Home size={14} /> Home
            </button>
          </div>
          <h1 className={`hidden sm:block text-lg font-black uppercase tracking-[0.2em] transition-colors duration-1000`} style={{ color: current.accent }}>
            Gallery Dashboard
          </h1>
        </header>

        <section className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <Outlet context={{ isSidebarOpen, theme }} />
          </div>

          <aside className="hidden xl:block w-80 bg-black/20 backdrop-blur-md border-l border-white/10 p-8 space-y-8 overflow-y-auto">
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp size={16} style={{ color: current.accent }} /> Distribution
              </h3>
              <div className="space-y-3">
                {Object.entries(counts).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] uppercase font-bold tracking-tighter text-gray-500">{key}</span>
                    <span className="font-black text-xs" style={{ color: current.accent }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Toolkit</h3>
              <div className="space-y-2">
                <button onClick={() => window.open("https://github.com/kavyansh11-gi", "_blank")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all text-xs font-bold">
                  <Github size={14} /> GitHub
                </button>
                <button onClick={() => window.open("https://www.linkedin.com/in/kavyansh-nigam-2bb233278/", "_blank")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all text-xs font-bold">
                  <Linkedin size={14} style={{ color: current.accent }} /> LinkedIn
                </button>
              </div>
            </div>
          </aside>
        </section>
      </main>
      
      <style>{`
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${current.accent}44; border-radius: 10px; }
      `}</style>
    </div>
  );
}