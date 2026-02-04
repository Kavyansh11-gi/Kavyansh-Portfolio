import { motion } from "framer-motion"  
import { Autoplay, EffectCoverflow } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const MOCK_PROJECTS = [
    {
        title: "TaleTailor",
        description: "AI-powered storytelling platform with real-time collaboration.",
        img: "/images/taletailor.png", 
        live: "https://your-live-link.com",
        github: "https://github.com/sayyedrabeeh/taletailor",
        tech: ["Python", "Django", "React", "WebSockets"]
    },
    {
        title: "ResuMatch",
        description: "AI tool to match resumes with job descriptions and suggest improvements.",
        img: "/images/resumatch.png",
        live: "https://your-live-link.com",
        github: "https://github.com/sayyedrabeeh/resume-ai-",
        tech: ["Django", "React", "Tailwind"]
    }
];

export default function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    const handleExploreAll = () => {
        navigate("/projects"); 
    };

    useEffect(() => {
        setProjects(MOCK_PROJECTS);
    }, []);

    return (
        <motion.section id="projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen text-white px-4 md:px-6 py-12 flex items-center justify-center relative overflow-hidden ">
            
            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                
                {/* Text Content: Centered on mobile, Left-aligned on Desktop */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left p-4 lg:p-16 space-y-6">
                    <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        My Projects
                    </motion.h1>
                    <motion.p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Explore some of my featured projects built with modern web technologies — each
                        showcasing creative UI, clean code, and robust performance.
                    </motion.p>
                    <div className="flex justify-center lg:justify-start">
                        <motion.button 
                            className="w-max px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl font-bold text-white shadow-2xl transition-all duration-300 text-xl md:text-2xl"
                            whileHover={{ scale: 1.05 }}
                            onClick={handleExploreAll}
                        >
                            Explore All 
                        </motion.button>
                    </div>
                </div>

                {/* Swiper Container: Full width on mobile, constrained on Desktop */}
                <motion.div className="w-full lg:w-[calc(100%-50%)] xl:w-[900px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="[perspective:2000px]" >
                        <Swiper
                            effect='coverflow'
                            grabCursor
                            centeredSlides
                            slidesPerView={'auto'}
                            loop={projects.length > 2}
                            speed={1300}
                            // Responsive spacing
                            spaceBetween={window.innerWidth < 768 ? -50 : -150}
                            coverflowEffect={{
                                rotate: 15,
                                stretch: 0,
                                depth: window.innerWidth < 768 ? 200 : 600,
                                modifier: 2.5,
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[EffectCoverflow, Autoplay]}
                            className='h-[450px] md:h-[500px] select-none'>
                            {projects.map((p, i) => (
                                <SwiperSlide key={i} className="!w-[280px] sm:!w-[350px] md:!w-[400px]">
                                    <motion.div className="group relative h-full cursor-pointer"
                                        whileHover={{ y: -15 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                    >
                                        <div className="relative h-full bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-xl overflow-hidden flex flex-col">
                                            <div className="h-2/3 md:h-3/4 overflow-hidden relative group">
                                                <img 
                                                    src={p.img} 
                                                    alt={p.title} 
                                                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" 
                                                />
                                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-semibold shadow-lg">
                                                       <FaExternalLinkAlt/>Link 
                                                    </a>
                                                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold shadow-lg">
                                                        <FaGithub/>Github 
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-4 md:p-6 bg-gradient-to-br from-black to-gray-900 flex flex-col justify-between">
                                                <h3 className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"> 
                                                    {p.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {p.tech?.slice(0,4).map((t, idx) => (
                                                        <span key={idx} className="text-[10px] md:text-xs font-medium text-gray-200 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                                                            {t.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>  
                            ))}
                        </Swiper>
                    </div>
                </motion.div> 
            </div>    
        </motion.section>
    )
}