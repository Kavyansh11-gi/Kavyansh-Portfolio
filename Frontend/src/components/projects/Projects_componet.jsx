import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  ExternalLink, 
  ChevronLeft, ChevronRight, Calendar, Github
} from "lucide-react";
import moment from "moment";

// Replace this array with your actual project data
const MOCK_PROJECTS = [
    {
        id: 1,
        name: "Sample Project",
        description: "This is a local static project description showcase.",
        media_type: "image",
        images: [{ image: "https://via.placeholder.com/800x400" }],
        tech_stack: "React, Tailwind, Lucide",
        github_link: "https://github.com",
        live_link: "https://google.com",
        created_at: new Date().toISOString(),
        project_type: "react"
    }
];

export default function Project_Component({ Project_type }) {
    const [project, setProject] = useState([]);
    const [currentImgIdx, setCurrentImgIdx] = useState({});
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const observerTarget = useRef(null);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        
        // Filter local data based on type
        const filtered = Project_type 
            ? MOCK_PROJECTS.filter(p => p.project_type === Project_type)
            : MOCK_PROJECTS;

        setTimeout(() => {
            setProject(filtered);
            const idx = {};
            filtered.forEach((p) => { idx[p.id] = 0 });
            setCurrentImgIdx(idx);
            setLoading(false);
            setInitialLoad(false);
        }, 500);
    }, [Project_type]);

    useEffect(() => {
        fetchProjects();
    }, [Project_type, fetchProjects]);

    const nextImag = (id, total) => {
        setCurrentImgIdx((prev) => ({ ...prev, [id]: (prev[id] + 1) % total }));
    };
    
    const prevImag = (id, total) => {
        setCurrentImgIdx((prev) => ({ ...prev, [id]: (prev[id] - 1 + total) % total }));
    };

    const fmtDate = (d) => {
        return moment(d).format("MMMM YYYY");
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
                <div className="max-w-2xl mx-auto flex flex-col items-center justify-center px-4 py-3">
                    <h1 className="text-[26px] font-extrabold text-white tracking-tight uppercase">
                        {Project_type || "ALL PROJECTS"}
                    </h1>
                    <p className="text-sm text-gray-400">Project Showcase</p>
                    <div className="mt-2 h-1 w-14 rounded-full bg-indigo-500"></div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-8 pb-20">
                {loading && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <div className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
                    </div>
                )}

                {project.length === 0 && !loading ? (
                    <p className="text-center text-gray-400 py-12">No Projects found in this category.</p>
                ) : (
                    project.map((p) => {
                        const imgIdx = currentImgIdx[p.id] ?? 0;
                        const manyImage = p.media_type === 'image' && p.images?.length > 1;

                        return (
                            <article key={p.id} className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 transition-all hover:border-gray-600">
                                <div className="flex items-center justify-between p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white shadow-inner">
                                            {p.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{p.name}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                <span>{fmtDate(p.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Media Section */}
                                {p.media_type === 'image' && p.images?.length > 0 && (
                                    <div className="relative bg-black group">
                                        <img src={p.images[imgIdx].image} alt={p.name} className="w-full max-h-96 object-contain mx-auto" />
                                        {manyImage && (
                                            <>
                                                <button onClick={() => prevImag(p.id, p.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 p-2 rounded-full text-white transition-colors opacity-0 group-hover:opacity-100"><ChevronLeft className="w-5 h-5" /></button>
                                                <button onClick={() => nextImag(p.id, p.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 p-2 rounded-full text-white transition-colors opacity-0 group-hover:opacity-100"><ChevronRight className="w-5 h-5" /></button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Content Section */}
                                <div className="p-6 space-y-4">
                                    <p className="text-gray-300 text-sm leading-relaxed">{p.description}</p>
                                    
                                    {p.tech_stack && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {p.tech_stack.split(',').map((t, i) => (
                                                <span key={i} className="px-2.5 py-1 bg-gray-900/50 border border-gray-700 rounded-md text-[11px] font-medium text-indigo-300 uppercase tracking-wider">
                                                    {t.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 pt-4">
                                        {p.live_link && (
                                            <a href={p.live_link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold text-white transition-all shadow-lg shadow-indigo-900/20">
                                                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                                            </a>
                                        )}
                                        {p.github_link && (
                                            <a href={p.github_link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-bold text-white transition-all">
                                                <Github className="w-3.5 h-3.5" /> Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })
                )}
                
                <div ref={observerTarget} className="mt-10 py-10 flex items-center justify-center border-t border-gray-800">
                    {!initialLoad && <span className="text-gray-500 text-xs tracking-widest uppercase">End of Portfolio</span>}
                </div>
            </main>
        </div>
    );
}