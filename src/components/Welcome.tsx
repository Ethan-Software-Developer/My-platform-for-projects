import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import "./styles.css"
import { 
  MessageSquare, 
  Github, 
  Linkedin, 
  Mail, 
  Moon, 
  Sun,
  ArrowRight,
  Code,
  Brush,
  Globe,
  Sparkles,
  Layout,
  Cpu
} from "lucide-react";

interface WelcomeProps {
  onComplete: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Welcome = ({ onComplete, isDark, toggleTheme }: WelcomeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);
  const [isHoveredButton, setIsHoveredButton] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % skills.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const skills = [
    { icon: Code, label: "Full Stack Dev", color: "from-blue-500 to-cyan-500", desc: "Building robust applications" },
    { icon: Brush, label: "UI/UX Design", color: "from-purple-500 to-pink-500", desc: "Crafting experiences" },
    { icon: Globe, label: "Web3", color: "from-green-500 to-emerald-500", desc: "Exploring blockchain" },
    { icon: Cpu, label: "AI Integration", color: "from-orange-500 to-red-500", desc: "Implementing AI solutions" }
  ];

  const projects = [
    { icon: Layout, title: "Web Apps", gradient: "from-blue-500 to-purple-500", desc: "Modern web applications" },
    { icon: Sparkles, title: "AI Tools", gradient: "from-purple-500 to-pink-500", desc: "Smart solutions" },
    { icon: Globe, title: "dApps", gradient: "from-green-500 to-emerald-500", desc: "Decentralized apps" },
    { icon: Code, title: "APIs", gradient: "from-orange-500 to-red-500", desc: "Robust backends" }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-white'} transition-colors duration-500`}>
    {/* New Background Design */}
    <div className="absolute inset-0 h-full w-full overflow-hidden" style={{ zIndex: -1 }}>
 <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0c0d13] to-[#0d1d31]' : 'bg-gradient-to-t from-gray-100 to-gray-300'}`}>
   <div className="absolute top-0 left-0 w-full h-[120%] -rotate-45">
     {[...Array(25)].map((_, i) => {
       const starTailLength = Math.floor(Math.random() * 250 + 500) / 100;
       const topOffset = Math.floor(Math.random() * 10000) / 100;
       const fallDuration = Math.floor(Math.random() * 12000 + 12000) / 1000;
       const fallDelay = Math.floor(Math.random() * 20000) / 1000;
       
       return (
         <div
           key={i}
           className="absolute rounded-full"
           style={{
             top: `${topOffset}vh`,
             width: `${starTailLength}em`,
             height: '2px',
             background: isDark ? 'linear-gradient(45deg, rgba(255,255,255,0.4), transparent)' : 'linear-gradient(45deg, rgba(0,0,0,0.2), transparent)',
             filter: isDark ? 'drop-shadow(0 0 6px rgba(255,255,255,0.4))' : 'drop-shadow(0 0 6px rgba(0,0,0,0.2))',
             transform: 'translate3d(104em, 0, 0)',
             animation: `fall ${fallDuration}s ${fallDelay}s linear infinite,
                        tail-fade ${fallDuration}s ${fallDelay}s ease-out infinite`
           }}
         />
       );
     })}
   </div>
 </div>
</div>

      {/* Rest of the component remains the same */}
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`fixed top-4 right-4 z-50 rounded-full backdrop-blur-sm
          ${isDark 
            ? 'bg-gray-800/50 hover:bg-gray-700/50' 
            : 'bg-white/50 hover:bg-gray-100/50'
          } shadow-lg transition-all duration-300 hover:scale-105`}
        onClick={toggleTheme}
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>

      {/* Main Grid Layout */}
      <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-12">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-12">
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Digital
              <span className="block mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent
                animate-gradient-x">
                Craftsman
              </span>
            </h1>

            <div className="h-40 relative">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 w-full transform
                    ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <div className={`inline-flex flex-col space-y-2`}>
                    <div className={`inline-flex items-center space-x-3 bg-gradient-to-r ${skill.color} p-0.5 rounded-2xl
                      hover:shadow-lg transition-shadow duration-300`}>
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        <skill.icon className="h-6 w-6 text-current" />
                      </div>
                      <span className="pr-4 font-medium text-white">{skill.label}</span>
                    </div>
                    <p className={`ml-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {skill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={onComplete}
              onMouseEnter={() => setIsHoveredButton(true)}
              onMouseLeave={() => setIsHoveredButton(false)}
              className="group relative px-8 py-6 text-lg rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg transition-all duration-300 
                hover:shadow-xl hover:scale-105"
            >
              Explore Projects
              <ArrowRight className={`ml-2 h-5 w-5 transform transition-all duration-300
                ${isHoveredButton ? 'translate-x-1 scale-110' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Right Column Grid */}
        <div className={`hidden lg:grid grid-cols-2 gap-6 place-content-center transform transition-all duration-1000 
          ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
          {projects.map((project, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredTile(i)}
              onMouseLeave={() => setHoveredTile(null)}
              className={`group aspect-square rounded-2xl p-1 transition-all duration-300 
                ${hoveredTile === i ? 'scale-105' : 'scale-100'}`}
            >
              <div className={`relative w-full h-full rounded-xl backdrop-blur-sm
                ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} 
                overflow-hidden transition-all duration-300
                ${hoveredTile === i ? 'shadow-2xl' : 'shadow-lg'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <project.icon className={`h-8 w-8 transition-all duration-300
                    ${hoveredTile === i ? 'text-blue-500 scale-110' : isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {project.title}
                    </p>
                    <p className={`text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className={`flex items-center space-x-4 p-3 rounded-full backdrop-blur-sm
            ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} shadow-lg hover:shadow-xl transition-all duration-300`}>
            {[
              { icon: MessageSquare, href: "https://wa.me/0761235651", color: "hover:text-green-500", label: "WhatsApp" },
              { icon: Github, href: "https://github.com/yourusername", color: "hover:text-gray-600", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/yourusername", color: "hover:text-blue-500", label: "LinkedIn" },
              { icon: Mail, href: "mailto:your.email@example.com", color: "hover:text-red-500", label: "Email" }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={`p-2 rounded-full ${isDark ? 'text-gray-400' : 'text-gray-600'} 
                  ${item.color} transition-all duration-300 hover:scale-110`}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;