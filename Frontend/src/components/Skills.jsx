import { FaPython, FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaGitAlt, FaFigma, FaJava, FaNodeJs} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { PiFileCppFill } from "react-icons/pi";
import { SiDjango, SiTailwindcss, SiPostgresql, SiOpencv, SiFramer, SiMongodb, SiMysql} from "react-icons/si";
import Matter from "matter-js";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const skillsIcons = [
  { icon: FaPython, name: "Python", color: "#3776AB" },
  { icon: FaReact, name: "React", color: "#61DBFB" },
  { icon: SiTailwindcss, name: "TailwindCSS", color: "#38BDF8" },
  { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
  { icon: FaCss3Alt, name: "CSS3", color: "#1572B6" },
  { icon: FaBootstrap, name: "Bootstrap", color: "#7952B3" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
  { icon: FaGitAlt, name: "Git", color: "#F05032" },
  { icon: FaFigma, name: "Figma", color: "#F24E1E" },
  { icon: FaJava, name: "Java", color: "#007396" },
  { icon: FaNodeJs, name: "Node.js", color: "#339933" },
  { icon: IoLogoJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: PiFileCppFill, name: "C++", color: "#00599C" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1" },

];

export default function SkillsSection() {
  const containerRef = useRef(null);
  const [bodies, setBodies] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, World, Bodies, Mouse, MouseConstraint, Runner, Events } = Matter;
    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 0;

    // Responsive Canvas Detection
    const isMobile = window.innerWidth < 768;
    const width = isMobile ? 320 : 400; // Smaller box for mobile
    const height = isMobile ? 320 : 400;

    const iconBodies = skillsIcons.map((skill, i) => {
      // Adjust grid spawn for responsive box
      const cols = isMobile ? 3 : 4;
      const x = (isMobile ? 50 : 70) + (i % cols) * (isMobile ? 75 : 85);
      const y = (isMobile ? 50 : 70) + Math.floor(i / cols) * (isMobile ? 80 : 100);

      const body = Bodies.circle(x, y, isMobile ? 24 : 32, {
        restitution: 0.9,
        friction: 0.01,
        frictionAir: 0.02,
        density: 0.001,
      });

      body.skill = skill;
      World.add(world, body);
      return body;
    });

    setBodies(iconBodies);

    const wallOptions = { isStatic: true };
    World.add(world, [
      Bodies.rectangle(width / 2, -20, width + 50, 40, wallOptions),
      Bodies.rectangle(width / 2, height + 20, width + 50, 40, wallOptions),
      Bodies.rectangle(-20, height / 2, 40, height + 50, wallOptions),
      Bodies.rectangle(width + 20, height / 2, 40, height + 50, wallOptions),
    ]);

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const update = () => {
      iconBodies.forEach((body) => {
        const el = document.getElementById(`skill-node-${body.id}`);
        if (el) {
          const offset = isMobile ? 24 : 32;
          el.style.transform = `translate(${body.position.x - offset}px, ${body.position.y - offset}px) rotate(${body.angle}rad)`;
        }
      });
      requestAnimationFrame(update);
    };
    update();

    return () => {
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section id="skills" className="w-full text-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-24">
        
        {/* Left Side: Info & Interactive Box */}
        <div className="w-full lg:flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I specialize in building responsive, modern, and scalable applications using a stack that bridges front-end creativity with back-end stability.
            </p>
          </div>

          {/* Interactive Playground Container */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div
                ref={containerRef}
                className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 touch-none"
                style={{
                  background: "linear-gradient(145deg, #0D1117 0%, #1B2430 50%, #222B45 100%)",
                }}
              >
                {/* Background Grid for the Box */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
                </div>

                {bodies.map((body) => {
                  const Icon = body.skill.icon;
                  return (
                    <div
                      key={body.id}
                      id={`skill-node-${body.id}`}
                      className="absolute w-12 h-12 md:w-16 md:h-16 flex justify-center items-center pointer-events-none"
                    >
                      <div
                        className="w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${body.skill.color}20, ${body.skill.color}10)`,
                          border: `2px solid ${body.skill.color}40`,
                        }}
                      >
                        <Icon size={window.innerWidth < 768 ? 24 : 36} style={{ color: body.skill.color }} />
                      </div>
                    </div>
                  );
                })}

                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Drag & Throw</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Skills Grid */}
        <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 lg:pt-24">
          {skillsIcons.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-4 md:p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-3"
                style={{
                  background: `${skill.color}15`,
                  border: `1px solid ${skill.color}30`,
                }}
              >
                <skill.icon size={24} className="md:w-7 md:h-7" style={{ color: skill.color }} />
              </div>
              <span className="text-gray-300 text-xs md:text-sm font-medium text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}