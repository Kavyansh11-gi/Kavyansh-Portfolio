import React, { useState, useEffect } from "react";
import { ExternalLink, Github, Terminal, Cpu, Zap, Activity, Layers, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data remains synced with your existing projects
const MOCK_PROJECTS = [
    {
        id: 1,
        name: "TaleTailor",
        description: "AI-powered storytelling platform with neural narrative generation. Optimized for high-performance web interactions and real-time collaboration.",
        images: [{ image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200" }],
        tech_stack: "Python, Django, React, WebSockets",
        github_link: "https://github.com/Kavyansh11-gi",
        live_link: "#",
        project_type: "fullstack",
        metrics: { latency: "0.03ms", uptime: "99.9%" }
    },
    {
        id: 2,
        name: "Privacy Deblur",
        description: "Real-time image deblurring system for local webcam feeds using PyTorch and OpenCV. Optimized for privacy and local GPU execution.",
        images: [{ image: "https://images.unsplash.com/photo-1527430253228-59368865da2d?auto=format&fit=crop&w=1200" }],
        tech_stack: "Python, PyTorch, OpenCV, CUDA",
        github_link: "https://github.com/Kavyansh11-gi",
        live_link: "#",
        project_type: "ai",
        metrics: { accuracy: "94.2%", speed: "60 FPS" }
    }
];

export default function Project_Component({ Project_type }) {
    const [project, setProject] = useState([]);

    useEffect(() => {
        const filtered = Project_type 
            ? MOCK_PROJECTS.filter(p => p.project_type === Project_type)
            : MOCK_PROJECTS;
        setProject(filtered);
    }, [Project_type]);

    return (
        <div className="min-h-screen bg-transparent font-sans pb-32 relative z-10 selection:bg-[var(--accent)] selection:text-black">
            {/* Header: Terminal Style */}
            <header className="sticky top-0 z-[50] py-4 px-6 backdrop-blur-3xl bg-black/80 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Terminal size={18} className="text-[var(--accent)]" />
                        <h1 className="text-xl font-black text-white tracking-widest uppercase">
                            System <span className="text-[var(--accent)]">/</span> Artifacts
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                        <span className="flex items-center gap-2"><Activity size={12} className="text-[var(--accent)] animate-pulse"/> {project.length} Nodes Active</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 gap-24">
                    <AnimatePresence mode="wait">
                        {project.map((p) => (
                            <motion.article 
                                key={p.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* Advanced Multi-Layered Card */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-5 blur-2xl group-hover:opacity-15 transition-opacity duration-1000 rounded-[3rem]" />
                                
                                <div className="relative bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 group-hover:border-[var(--accent)]/30">
                                    
                                    {/* 1. Header Area: Module Metadata */}
                                    <div className="p-6 md:px-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                                                {p.project_type === 'ai' ? <Cpu size={18} className="text-[var(--accent)]" /> : <Layers size={18} className="text-[var(--accent)]" />}
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Module_ID: 0{p.id}</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-white/10" />
                                            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row">
                                        {/* 2. Visual Area: High-Contrast Media */}
                                        <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto relative overflow-hidden bg-black/20">
                                            <img 
                                                src={p.images[0].image} 
                                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-80" 
                                                alt={p.name} 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                            
                                            {/* Badge: Project Category */}
                                            <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full">
                                                <span className="text-[9px] font-black text-white uppercase tracking-widest">{p.project_type}</span>
                                            </div>
                                        </div>

                                        {/* 3. Content Area: Logic & Tech */}
                                        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-8">
                                            <div className="space-y-4">
                                                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--accent)] transition-colors">
                                                    {p.name}<span className="text-[var(--accent)]">.</span>
                                                </h3>
                                                <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">
                                                    {p.description}
                                                </p>
                                            </div>

                                            {/* Advanced Tech Matrix */}
                                            <div className="grid grid-cols-2 gap-3">
                                                {p.tech_stack.split(',').map((t, i) => (
                                                    <div key={i} className="flex items-center gap-2.5 p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[var(--accent)]/20 transition-all">
                                                        <Code2 size={12} className="text-[var(--accent)]" />
                                                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tight">{t.trim()}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Interface */}
                                            <div className="flex items-center gap-4 pt-4">
                                                <a href={p.live_link} className="flex-1 py-4 bg-[var(--accent)] text-black rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_var(--accent)] hover:brightness-110 active:scale-95 transition-all">
                                                    <Zap size={14} /> Execute Deployment
                                                </a>
                                                <a href={p.github_link} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 hover:text-[var(--accent)] transition-all">
                                                    <Github size={20} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}