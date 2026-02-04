import { motion } from "framer-motion";
// Ensure this path matches your project structure
import profileImg from "../assets/avtar.png"; 

function About() {
    return (
        <section id="About" className="relative w-full py-20 md:py-32 px-6 md:px-24 text-white overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-20 md:top-40 left-0 md:left-10 w-48 md:w-96 h-48 md:h-96 bg-blue-500/10 md:bg-blue-500/20 blur-[80px] md:blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 md:w-[28rem] h-64 md:h-[28rem] bg-purple-600/10 blur-[100px] md:blur-[180px] rounded-full pointer-events-none"></div>
            
            <motion.h2 className="text-4xl md:text-6xl font-bold text-center mb-12 md:mb-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-wide"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1 }}
            >
                Who Am I
            </motion.h2>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">
                <motion.div className="flex-1 text-base md:text-xl leading-relaxed text-gray-300 space-y-4 md:space-y-6 text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.2 }}
                >
                    <p>I'm <span className="text-blue-400 font-semibold">sayyed rabeeh</span> a <span className="text-purple-400 font-semibold">Full Stack Developer</span> passionate about merging design, logic, and creativity.</p>
                    <p>Coming from a <span className="text-blue-400">Humanities</span> background, I bring perspective and empathy into my code.</p>
                    <p>I build with <span className="text-blue-400">Python (Django)</span> and <span className="text-purple-400">React.js</span>.</p>
                </motion.div>
                  
                {/* ANIMATION SIDE - CIRCULAR BORDER REMOVED FROM IMAGE */}
                <motion.div className="flex-1 flex justify-center items-center relative py-10 md:py-0"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.2 }}
                >
                    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
                        {/* The Morphing Background remains */}
                        <motion.div
                            animate={{
                                borderRadius: [
                                    "40% 60% 70% 30% / 40% 50% 60% 50%",
                                    "60% 40% 30% 70% / 50% 60% 50% 40%",
                                    "40% 60% 70% 30% / 40% 50% 60% 50%"
                                ],
                                rotate: [0, 90, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.2)]"
                        />

                        {/* THE IMAGE: No rounding or morphing applied */}
                        <img 
                            src={profileImg} 
                            alt="Kavyansh Nigam" 
                            className="relative z-10 max-w-[90%] max-h-[90%] object-contain drop-shadow-2xl"
                        />
                        
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-10 md:inset-16 bg-blue-400/30 rounded-full blur-3xl"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-full h-full border border-dashed border-white/5 rounded-full animate-spin-slow"></div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .animate-spin-slow { animation: spin 30s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </section>
    );
}

export default About;