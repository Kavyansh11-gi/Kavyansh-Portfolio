import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HeroSection({ dragAreaRef }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    constraintsRef.current = document.body;
  }, []);

  const handleMouseMove = (e) => {
    // Only apply 3D effect on larger screens for better performance
    if (window.innerWidth < 768) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  const handleResumeClick = () => {
    const link = document.createElement("a");
    link.href = "/kavyanshResume.pdf";  
    link.download = "kavyanshResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <section
      id="Home"
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center 
                 text-center md:text-left px-6 md:px-20 py-20 md:py-0 relative z-10 overflow-hidden"
    >
      {/* Content Side */}
      <div className="w-full md:w-1/2 text-white space-y-4 md:space-y-6 relative mt-10 md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Hey, I'm <span className="text-blue-400">Kavyansh Nigam</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0"
        >
          A <span className="text-blue-300 font-medium">Full Stack Developer</span> passionate
          about building interactive and meaningful websites using{" "}
          <span className="text-blue-300 font-medium">React</span>.
        </motion.p>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
        >
          <button
            type="button"
            onClick={handleResumeClick}
            className="px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-xl
                       hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-lg md:text-xl"
          >
            Resume
          </button>
  
          <a
            href="https://github.com/Kavyansh11-gi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border border-blue-400/30 rounded-xl
                       hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 text-lg md:text-xl"
          >
            Github
          </a>
        </motion.div>
      </div>

      {/* Image/Drag Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <motion.div
          drag
          dragConstraints={dragAreaRef}
          dragElastic={0.5}
          className="relative perspective-1000 z-50 touch-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-64 h-64 md:w-96 md:h-96 transition-transform duration-200 ease-out preserve-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl translate-z-[-50px]" />

            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-blue-400/20 shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
              <img
                src="/images/profile.jpg"
                alt="Kavyansh Nigam"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-gray-500 text-xs md:text-sm font-medium select-none italic"
        >
          Drag the photo or move your mouse over it
        </motion.p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .translate-z-[-50px] { transform: translateZ(-50px); }
      `}</style>
    </section>
  );
}

export default HeroSection;