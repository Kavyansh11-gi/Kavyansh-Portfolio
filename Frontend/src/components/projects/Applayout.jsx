import React, { useState } from "react";
import { 
  Home, Globe, Layers, Zap, FileCode2, Terminal, Brain, 
  Puzzle, BookOpen, Github, Linkedin, Menu, X, ArrowLeft, TrendingUp 
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Static counts - update these manually based on your portfolio content
  const counts = {
    total: 12,
    fullstack: 2,
    django: 2,
    react: 3,
    opencv: 1,
    ai: 1,
    html: 1,
    miniprojects: 2,
    learning: 5
  };

  const categories = [
    { id: "", name: "Home", icon: Home, color: "bg-blue-500" },
    { id: "fullstack", name: "Full Stack Apps", icon: Globe, color: "bg-purple-500" },
    { id: "django", name: "Django Backend", icon: Layers, color: "bg-emerald-600" },
    { id: "react", name: "React Frontend", icon: Zap, color: "bg-cyan-500" },
    { id: "opencv", name: "Computer Vision", icon: Terminal, color: "bg-indigo-500" },
    { id: "ai", name: "AI & Assistants", icon: Brain, color: "bg-pink-500" },
    { id: "html", name: "HTML Projects", icon: FileCode2, color: "bg-orange-500" },
    { id: "miniprojects", name: "Mini Projects", icon: Puzzle, color: "bg-yellow-600" },
    { id: "learnings", name: "Learning & Docs", icon: BookOpen, color: "bg-sky-500" },
  ];

  return (
    <div className="flex w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white ">
      <aside
        className={`fixed top-0 left-0 ${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-gray-900/70 backdrop-blur-md border-r border-gray-800 transition-all duration-300 overflow-hidden flex flex-col h-screen z-50`}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-4 mb-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
              SR
            </div>
            <div>
              <h2 className="font-bold text-lg">Sayyed Rabeeh</h2>
              <p className="text-gray-400 text-sm">Portfolio Explorer</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a href="https://github.com/sayyedrabeeh" target="_blank" rel="noreferrer" className="p-2.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
              <Github size={18} />
            </a>
            <a href="https://leetcode.com/u/sayyed-rabeeh/" target="_blank" rel="noreferrer" className="p-2.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
              <SiLeetcode size={18} />
            </a>
            <a href="https://www.linkedin.com/in/sayyed-rabeeh/" target="_blank" rel="noreferrer" className="p-2.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-none">
          {categories.map(({ id, name, icon: Icon, color }) => {
            const active = location.pathname === `/projects/${id}` || (id === "" && location.pathname === "/projects");
            return (
              <button
                key={id}
                onClick={() => navigate(`/projects/${id}`)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  active ? "bg-gradient-to-r from-blue-900/80 to-purple-600/80" : "hover:bg-gray-800"
                }`}
              >
                <div className={`p-2 rounded-lg ${active ? "bg-white/20" : `${color} bg-opacity-60`}`}>
                  <Icon size={20} />
                </div>
                <span className="font-medium text-sm">{name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-800 transition-all">
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-700 transition-all">
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 px-3 py-1.5 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-white transition-all">
              <Home size={16} /> Home
            </button>
          </div>
          <h1 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Project Gallery
          </h1>
        </header>

        <section className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Outlet context={{ isSidebarOpen }} />
          </div>

          {/* Stats Sidebar - Internal Only */}
          <aside className="hidden xl:block w-80 bg-gray-900/50 border-l border-gray-800 p-6 space-y-6 overflow-y-auto">
            <div className="bg-gray-800/40 rounded-2xl p-5 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-400" /> Project Distribution
              </h3>
              <div className="space-y-2">
                {Object.entries(counts).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center p-2 rounded-lg bg-gray-900/40 border border-gray-700/50">
                    <span className="text-xs uppercase tracking-wider text-gray-400">{key}</span>
                    <span className="font-bold text-blue-400">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-2xl p-5 border border-gray-700">
              <h3 className="text-lg font-bold mb-3">Developer Toolkit</h3>
              <div className="space-y-2">
                <button onClick={() => window.open("https://github.com/sayyedrabeeh", "_blank")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all text-sm">
                  <Github size={16} /> GitHub Profile
                </button>
                <button onClick={() => window.open("https://www.linkedin.com/in/sayyed-rabeeh/", "_blank")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all text-sm">
                  <Linkedin size={16} className="text-blue-400" /> LinkedIn
                </button>
                <button onClick={() => window.open("https://leetcode.com/u/sayyed-rabeeh/", "_blank")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all text-sm">
                  <Zap size={16} className="text-yellow-400" /> LeetCode
                </button>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}