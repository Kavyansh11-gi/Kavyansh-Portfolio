import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { X, Sparkles, Trophy } from 'lucide-react';

const STATIC_MILESTONES = [
  { id: 1, year: "2023", title: "Started B.Tech CSE", description: "Began my Computer Science Engineering journey at Bennett University." },
  { id: 2, year: "2024", title: "Full Stack Mastery", description: "Deep-dived into Python/Django and React. Built over 30 projects." },
  { id: 3, year: "2025", title: "Computer Vision Research", description: "Developed real-time deblurring and gesture recognition systems." }
];

const CurvedJourneyTimeline = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [bikePos, setBikePos] = useState({ x: 500, y: 150 });
  const [bikeAngle, setBikeAngle] = useState(0);

  // Increased spacing for better scroll readability
  const MILESTONE_SPACING = 500; 
  const TOTAL_PATH_HEIGHT = STATIC_MILESTONES.length * MILESTONE_SPACING + 200;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20
  });

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    return smoothProgress.onChange((v) => {
      if (!pathRef.current || pathLength === 0) return;
      const currentLen = v * pathLength;
      try {
        const point = pathRef.current.getPointAtLength(currentLen);
        const nextPoint = pathRef.current.getPointAtLength(Math.min(currentLen + 5, pathLength));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
        setBikePos({ x: point.x, y: point.y });
        setBikeAngle(angle);
      } catch (e) {}
    });
  }, [smoothProgress, pathLength]);

  const generateDynamicPath = () => {
    const startY = 150;
    let path = [`M 500 ${startY}`];
    for (let i = 0; i < STATIC_MILESTONES.length - 1; i++) {
      const y1 = startY + i * MILESTONE_SPACING;
      const y2 = startY + (i + 1) * MILESTONE_SPACING;
      const midY = (y1 + y2) / 2;
      if (i % 2 === 0) path.push(`C 850 ${y1 + 150}, 850 ${midY}, 500 ${y2}`);
      else path.push(`C 150 ${y1 + 150}, 150 ${midY}, 500 ${y2}`);
    }
    return path.join(' ');
  };

  return (
    <div ref={containerRef} className="min-h-screen text-white relative bg-gray-950 pb-[20vh] overflow-x-hidden">
      <div className="relative z-10 px-4 md:px-8 py-20">
        
        {/* Header Scaling */}
        <div className="text-center mb-24 md:mb-32">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            My Journey
          </h1>
          <p className="text-gray-500 mt-4 tracking-widest uppercase text-[10px] md:text-sm">
            Scroll to trace my professional path
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto" style={{ height: `${TOTAL_PATH_HEIGHT}px` }}>
          
          {/* SVG Background Path: Hidden on very small screens or scaled */}
          <svg 
            viewBox={`0 0 1000 ${TOTAL_PATH_HEIGHT}`} 
            className="w-full h-full absolute inset-0 pointer-events-none overflow-visible opacity-40 md:opacity-100"
          >
            <path ref={pathRef} d={generateDynamicPath()} stroke="#1e293b" strokeWidth="6" fill="none" />
            <motion.path d={generateDynamicPath()} stroke="#06b6d4" strokeWidth="8" fill="none" style={{ pathLength: smoothProgress }} />
            
            <g transform={`translate(${bikePos.x}, ${bikePos.y}) rotate(${bikeAngle})`}>
                <circle r="20" fill="#06b6d4" opacity="0.2" />
                <rect x="-15" y="-6" width="30" height="12" rx="6" fill="#06b6d4" />
                <circle cx="15" cy="0" r="4" fill="white" />
            </g>
          </svg>

          {STATIC_MILESTONES.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const yPos = 150 + index * MILESTONE_SPACING;
            
            return (
              <motion.div 
                key={milestone.id}
                className="absolute left-0 right-0 flex justify-center md:block"
                style={{ top: `${yPos}px`, zIndex: 20 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  onClick={() => setExpandedCard(index)}
                  className={`
                    relative group p-6 md:p-8 rounded-[2rem] border border-gray-800 bg-gray-900/90 backdrop-blur-xl 
                    hover:border-cyan-500/50 transition-all duration-500 cursor-pointer shadow-2xl
                    w-[90%] md:w-[380px]
                    ${isLeft ? 'md:ml-auto md:mr-[55%] md:text-right' : 'md:mr-auto md:ml-[55%] md:text-left'}
                    mx-auto md:mx-0 text-center
                  `}
                >
                  {/* Responsive Year Badge */}
                  <div className={`
                    absolute -top-4 left-1/2 -translate-x-1/2 md:translate-x-0 
                    ${isLeft ? 'md:left-auto md:right-8' : 'md:left-8'} 
                    px-4 py-1 bg-gray-800 rounded-full border border-gray-700 text-cyan-400 font-bold text-xs
                  `}>
                    {milestone.year}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 mt-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-400 mt-3 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {milestone.description}
                  </p>
                  
                  <div className={`mt-6 flex items-center gap-2 text-[10px] font-bold text-cyan-500 ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                    <Trophy size={14} /> DETAILS
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {expandedCard !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80" onClick={() => setExpandedCard(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-gray-900 border border-gray-800 p-8 md:p-10 rounded-[2.5rem] max-w-2xl w-full shadow-2xl">
              <button onClick={() => setExpandedCard(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={28}/></button>
              <h2 className="text-3xl md:text-4xl font-black text-cyan-400">{STATIC_MILESTONES[expandedCard].title}</h2>
              <p className="text-gray-400 mt-6 text-sm md:text-lg leading-relaxed">{STATIC_MILESTONES[expandedCard].description}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Journey() {
  return <div className="min-h-screen"><CurvedJourneyTimeline /></div>;
}