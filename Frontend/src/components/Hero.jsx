import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function HeroSection({ theme }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // --- TYPING ANIMATION LOGIC ---
  const roles = ["Full Stack Developer", "Computer Vision Enthusiast", "HPC Learner", "CSE Student"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = roles[roleIndex];
    const baseSpeed = isDeleting ? 30 : 100; 
    const nextTick = isDeleting && displayText === "" ? 400 : baseSpeed;

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, nextTick);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // --- UNIFIED INTERACTION LOGIC (MOUSE + TOUCH) ---
  const handleInteraction = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    
    // Parallax Logic
    const xPos = (clientX - rect.left) / rect.width - 0.5;
    const yPos = (clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: xPos, y: yPos });

    // 3D Tilt Logic
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (clientY - rect.top - centerY) / 15;
    const rotateY = (centerX - (clientX - rect.left)) / 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseMove = (e) => handleInteraction(e.clientX, e.clientY, e.currentTarget);
  
  const handleTouchMove = (e) => {
    // Prevent scrolling while interacting with the photo
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY, e.currentTarget);
  };

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

  const handleReset = () => {
    setRotation({ x: 0, y: 0 });
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="Home"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleReset}
      onTouchEnd={handleReset}
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center 
                 text-center md:text-left px-6 md:px-20 py-20 md:py-0 relative z-10 overflow-hidden transition-colors duration-1000"
    >
      {/* Dynamic Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        animate={{ x: mousePos.x * 25, y: mousePos.y * 25 }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        style={{ 
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`, 
          backgroundSize: '45px 45px' 
        }} 
      />

      {/* Content Side */}
      <div className="w-full md:w-1/2 text-white space-y-6 relative z-10 mt-12 md:mt-0 flex flex-col items-center md:items-start">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
            Hey, I'm <br />
            <span style={{ color: 'var(--accent)' }}>Kavyansh Nigam</span>
          </h1>
        </motion.div>

        <div className="h-10 md:h-12 flex items-center">
          <p className="text-xl md:text-3xl font-bold tracking-tight text-white/90">
            I am a <span className="border-r-4 border-[var(--accent)] pr-2 transition-colors duration-1000" style={{ color: 'var(--accent)' }}>
              {displayText}
            </span>
          </p>
        </div>

        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl font-medium">
          A 3rd-year CSE student at Bennett University, specialized in Computer Vision and high-performance Web Systems.
        </p>
 
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
          type="button"
          onClick={handleResumeClick}
          className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm font-black uppercase tracking-widest shadow-xl" style={{ borderLeft: '4px solid var(--accent)' }}>
            Resume
          </button>
          <a href="https://github.com/Kavyansh11-gi" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm font-black uppercase tracking-widest shadow-xl">
            Github
          </a>
        </div>
      </div>

      {/* Image Side - Touch Enabled */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative min-h-[400px] z-10">
        <motion.div 
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-[120px] opacity-20 transition-all duration-1000"
          animate={{ x: mousePos.x * -50, y: mousePos.y * -50 }}
          style={{ backgroundColor: 'var(--accent)' }}
        />

        <div className="relative perspective-1000 touch-none">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-300 ease-out preserve-3d"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
              <img src="/images/profile.jpg" alt="Kavyansh Nigam" className="w-full h-full object-cover pointer-events-none scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <p className="mt-8 text-white text-[10px] font-black uppercase tracking-[0.5em] select-none italic opacity-30">
          Interact to Tilt
        </p>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .tracking-tighter { letter-spacing: -0.05em; }
      `}</style>
    </section>
  );
}

export default HeroSection;