import React, { useState, useEffect, useCallback, useRef } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Calendar, Github, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

// Integrated project data 
const MOCK_PROJECTS = [
    {
        id: 1,
        name: "TaleTailor",
        description: "AI-powered storytelling platform with real-time collaboration and neural narrative generation.",
        media_type: "image",
        images: [{ image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200" }],
        tech_stack: "Python, Django, React, WebSockets",
        github_link: "https://github.com/sayyedrabeeh/taletailor",
        live_link: "#",
        created_at: "2025-09-15",
        project_type: "fullstack"
    },
    {
        id: 2,
        name: "Privacy deblur",
        description: "Lightweight, real-time image deblurring system optimized for local webcam feeds using PyTorch.",
        media_type: "image",
        images: [{ image: "https://images.unsplash.com/photo-1527430253228-59368865da2d?auto=format&fit=crop&w=1200" }],
        tech_stack: "Python, PyTorch, OpenCV, CUDA",
        github_link: "#",
        live_link: "#",
        created_at: "2025-10-20",
        project_type: "ai"
    }
];

export default function Project_Component({ Project_type }) {
    const [project, setProject] = useState([]);
    const [currentImgIdx, setCurrentImgIdx] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        const filtered = Project_type 
            ? MOCK_PROJECTS.filter(p => p.project_type === Project_type)
            : MOCK_PROJECTS;

        setTimeout(() => {
            setProject(filtered);
            const idx = {};
            filtered.forEach((p) => { idx[p.id] = 0 });
            setCurrentImgIdx(idx);
            setLoading(false);
        }, 600);
    }, [Project_type]);

    useEffect(() => { fetchProjects(); }, [Project_type, fetchProjects]);

    const nextImg = (id, total) => setCurrentImgIdx((prev) => ({ ...prev, [id]: (prev[id] + 1) % total }));
    const prevImg = (id, total) => setCurrentImgIdx((prev) => ({ ...prev, [id]: (prev[id] - 1 + total) % total }));

    return (
        <div className="min-h-screen bg-transparent font-sans pb-20 md:pb-32">
            {/* --- RESPONSIVE HEADER --- */}
            <header className="sticky top-0 z-50 py-6 md:py-8 backdrop-blur-xl bg-black/40 border-b border-white/[0.05]">
                <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center">
                    <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-[8px] md:text-[10px] font-black tracking-[0.5em] md:tracking-[0.8em] text-[var(--accent)] uppercase mb-2"
                    >
                        Terminal Output
                    </motion.span>
                    <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase text-center leading-tight">
                        {Project_type || "System"} <span className="opacity-40">Artifacts</span>
                    </h1>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-20 md:space-y-32">
                <AnimatePresence mode="wait">
                    {project.map((p, idx) => {
                        const imgIdx = currentImgIdx[p.id] ?? 0;
                        const manyImage = p.media_type === 'image' && p.images?.length > 1;

                        return (
                            <motion.article 
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* THEMED GLOW BACKGROUND */}
                                <div className="absolute -inset-4 md:-inset-10 bg-[var(--accent)] opacity-0 group-hover:opacity-[0.04] blur-[60px] md:blur-[120px] transition-opacity duration-1000 rounded-[2rem] md:rounded-[5rem]" />

                                {/* MAIN CARD CONTENT - RESPONSIVE GRID */}
                                <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-3xl shadow-2xl transition-all duration-500 group-hover:border-[var(--accent)]/30">
                                    
                                    {/* Top/Left: Visual Media */}
                                    <div className="h-64 sm:h-80 md:h-[450px] lg:col-span-7 relative overflow-hidden bg-black/60 group/media border-b lg:border-b-0 lg:border-r border-white/[0.05]">
                                        <img 
                                            src={p.images[imgIdx].image} 
                                            className="w-full h-full object-cover opacity-80 group-hover/media:opacity-100 group-hover/media:scale-105 transition-all duration-[1500ms]" 
                                            alt={p.name} 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        
                                        {manyImage && (
                                            <div className="absolute inset-x-2 md:inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
                                                <button onClick={() => prevImg(p.id, p.images.length)} className="p-2 md:p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"><ChevronLeft size={18}/></button>
                                                <button onClick={() => nextImg(p.id, p.images.length)} className="p-2 md:p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"><ChevronRight size={18}/></button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom/Right: Data & Content */}
                                    <div className="lg:col-span-5 p-6 sm:p-8 md:p-12 flex flex-col justify-between space-y-6 md:space-y-8">
                                        <div className="space-y-5 md:space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-white text-base md:text-xl shadow-2xl"
                                                     style={{ background: 'var(--accent)', boxShadow: '0 0 30px var(--accent)44' }}>
                                                    {p.name.charAt(0)}
                                                </div>
                                            </div>

                                            <div className="space-y-1 md:space-y-2">
                                                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-[var(--accent)] transition-colors tracking-tighter">
                                                    {p.name}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><Calendar size={10} className="text-[var(--accent)]"/> {moment(p.created_at).format("YYYY")}</span>
                                                    <span className="flex items-center gap-1.5"><Code2 size={10} className="text-[var(--accent)]"/> {p.project_type}</span>
                                                </div>
                                            </div>

                                            <p className="text-gray-400 text-xs md:text-base leading-relaxed font-medium line-clamp-4 md:line-clamp-none">
                                                {p.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2">
                                                {p.tech_stack.split(',').map((t, i) => (
                                                    <span key={i} className="px-2 md:px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-md md:rounded-lg text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-tighter hover:text-white hover:border-[var(--accent)]/50 transition-all">
                                                        {t.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 md:gap-3 pt-2">
                                            <a href={p.live_link} target="_blank" rel="noreferrer" 
                                               className="relative group/btn w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-white text-[8px] md:text-[10px] uppercase tracking-[0.2em] transition-all overflow-hidden flex items-center justify-center gap-2 md:gap-3"
                                               style={{ background: 'var(--accent)', boxShadow: '0 10px 40px -10px var(--accent)' }}>
                                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                                <ExternalLink size={14}/> Initiate Session
                                            </a>

                                            <a href={p.github_link} target="_blank" rel="noreferrer" 
                                               className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-gray-300 text-[8px] md:text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-[var(--accent)]/50 transition-all duration-300">
                                                <Github size={16} className="transition-transform group-hover:rotate-12" />
                                                Source Code
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </main>
        </div>
    );
}