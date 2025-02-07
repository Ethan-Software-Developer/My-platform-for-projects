import { useState, useEffect } from "react";
import { Search, Sun, Moon, Mail, Download, Globe, Laptop, Smartphone, Wrench, LayoutGrid, MessageSquare, Github, ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Welcome from "@/components/Welcome";

// Enhanced animation styles
const styles = {
  keyframes: `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    @keyframes aurora {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(10px, 10px) scale(1.1); }
      50% { transform: translate(0, 20px) scale(1); }
      75% { transform: translate(-10px, 10px) scale(0.9); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      background-size: 1000px 100%;
      animation: shimmer 20s linear infinite;
    }
    .animate-aurora {
      animation: aurora 15s ease infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-pulse-glow {
      animation: pulseGlow 4s ease-in-out infinite;
    }
    .animate-gradient-shift {
      animation: gradientShift 8s ease infinite;
      background-size: 200% 200%;
    }
  `
};

// Project types with enhanced icons
const projectTypes = [
  {
    id: "all",
    label: "All Projects",
    icon: <LayoutGrid className="h-4 w-4" />,
    color: "from-red-500 to-indigo-500"
  },
  {
    id: "web-app",
    label: "Web Applications",
    icon: <Laptop className="h-4 w-4" />,
    color: "to-violet-500 to-pink-500"
  },
  {
    id: "mobile-app",
    label: "Mobile Apps",
    icon: <Smartphone className="h-4 w-4" />,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "tool",
    label: "Developer Tools",
    icon: <Wrench className="h-4 w-4" />,
    color: "from-amber-500 to-orange-500"
  }
];

// Enhanced technologies with icons and colors
const technologies = [
  {name: "all", icon: <Code className="h-3 w-3 " />, color: "bg-gradient-to-r from-red-500 to-blue-500"},
  { name: "react", icon: "⚛️", color: "cyan" },
  { name: "node.js", icon: "🟢", color: "green" },
  { name: "typescript", icon: "📘", color: "blue" },
  { name: "python", icon: "🐍", color: "yellow" },
  { name: "react-native", icon: "📱", color: "purple" }
];

// Enhanced projects data
const projects = [
  {
    id: 1,
    title: "E-Commerce Analytics Hub",
    description: "Real-time analytics dashboard with AI-powered insights and predictive modeling for e-commerce platforms.",
    type: "web-app",
    technologies: ["react", "node.js", "typescript"],
    image: "https://via.placeholder.com/600x400",
    keywords: ["dashboard", "analytics", "e-commerce", "real-time", "AI"],
    tags: ["Featured", "Enterprise", "AI-Powered"],
    category: "Web Applications",
    githubUrl: "https://github.com/username/project",
    demoUrl: "https://demo.project.com",
    lastUpdated: "2024-03-15",
    status: "production",
    highlight: true
  },
  {
    id: 2,
    title: "DevFlow CLI Suite",
    description: "Advanced command-line toolkit for streamlining development workflows with intelligent automation.",
    type: "tool",
    technologies: ["python", "click", "sqlite"],
    image: "https://via.placeholder.com/600x400",
    keywords: ["cli", "productivity", "automation"],
    tags: ["DevTools", "Productivity", "Open Source"],
    category: "Developer Tools",
    githubUrl: "https://github.com/username/cli-tool",
    lastUpdated: "2024-03-10",
    status: "beta",
    downloads: "10k+"
  },
  {
    id: 3,
    title: "WeatherSense Pro",
    description: "Cross-platform weather application with ML-based forecasting and environmental insights.",
    type: "mobile-app",
    technologies: ["react-native", "expo", "api"],
    image: "https://via.placeholder.com/600x400",
    keywords: ["mobile", "weather", "ML", "cross-platform"],
    tags: ["Mobile", "AI/ML", "Cross-Platform"],
    category: "Mobile Applications",
    githubUrl: "https://github.com/username/weather-app",
    demoUrl: "https://weather.app",
    lastUpdated: "2024-03-01",
    status: "production",
    users: "50k+"
  }
];

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showVault, setShowVault] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Enhanced search function with filters
  const searchProjects = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ');
    
    return projects.filter(project => {
      const searchableContent = [
        project.title,
        project.description,
        ...project.technologies,
        ...project.keywords,
        ...project.tags,
        project.category,
        project.type,
        project.status
      ].map(item => item?.toLowerCase());

      return searchTerms.every(term =>
        searchableContent.some(content => content?.includes(term))
      );
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Enhanced search function with filters
  const filterProjects = () => {
    return projects.filter(project => {
      // Type filter
      const typeMatch = selectedType === 'all' || project.type === selectedType;
      
      // Technology filter
      const techMatch = selectedTech === 'all' || project.technologies.includes(selectedTech);
      
      // Search query filter
      const searchMatch = !searchQuery.trim() || searchProjects(searchQuery).includes(project);

      return typeMatch && techMatch && searchMatch;
    });
  };

  // Effect to update filtered projects when filters change
  useEffect(() => {
    const filtered = filterProjects();
    setFilteredProjects(filtered);
  }, [selectedType, selectedTech, searchQuery]);

  useEffect(() => {
    setFilteredProjects(projects);
    setIsLoaded(true);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  if (!showVault) {
    return <Welcome onComplete={() => setShowVault(true)} isDark={isDark} toggleTheme={toggleTheme} />;
  }

  return (
    <>
      <style>{styles.keyframes}</style>
      
      <div className={cn(
        "min-h-screen flex transition-all duration-500",
        isDark ? "bg-gray-950" : "bg-gray-50"
      )}>
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Primary Background */}
          <div className={cn(
            "absolute inset-0 animate-gradient-shift",
            isDark 
              ? "bg-gradient-to-br from-gray-900 via-gray-900/50 to-blue-900/20" 
              : "bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20"
          )} />

          {/* Accent Elements */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-aurora mix-blend-screen"
                style={{
                  width: `${40 + i * 20}vh`,
                  height: `${40 + i * 20}vh`,
                  background: isDark
                    ? `radial-gradient(circle, rgba(${56 + i * 30}, ${130 + i * 20}, ${246 - i * 30}, 0.15) 0%, transparent 70%)`
                    : `radial-gradient(circle, rgba(${59 + i * 20}, ${130 + i * 10}, ${246 - i * 20}, 0.1) 0%, transparent 70%)`,
                  top: `${20 + i * 30}%`,
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * -5}s`
                }}
              />
            ))}
          </div>

          {/* Interactive Particles */}
          {isDark && (
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-white mix-blend-screen animate-float"
                  style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 5}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Sidebar */}
        <aside className={cn(
          "fixed left-0 top-0 h-full w-72  transition-all duration-500",
          isDark 
            ? "bg-gray-900/40 border-gray-800/30" 
            : "bg-white/40 border-gray-200/30",
          "border-r shadow-2xl z-50",
          isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        )}>
          <div className="p-6">
           {/* Enhanced Brand */}
<div className="flex items-center gap-4 mb-6 hover:transform hover:scale-105 transition-all duration-300">
  <div className="relative w-12 h-12 group">
    {/* Main hexagon */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-red-500 rounded-xl rotate-6 opacity-70 animate-pulse group-hover:scale-110 transition-transform duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-red-600 rounded-xl -rotate-3 group-hover:rotate-6 transition-all duration-300"></div>
    
    {/* Custom logo shape */}
    <div className="relative bg-gradient-to-br from-blue-700 to-red-700 rounded-xl p-2.5 text-white flex items-center justify-center transform hover:scale-105 transition-all duration-300">
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-6 h-6"
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 3L4 9l8 6 8-6-8-6z" />
        <path d="M4 9v6l8 6 8-6V9" />
        <path d="M12 15l-4-3 4-3 4 3-4 3z" />
      </svg>
    </div>
  </div>
  <div className="group">
    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
      CodeVault
    </h1>
    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">by Ethan Sevenster</p>
  </div>
</div>

{/* Enhanced Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "absolute top-6 right-6 rounded-lg transition-all duration-300",
                isDark 
                  ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50" 
                  : "bg-white/50 hover:bg-gray-50/50 border-gray-200/50",
                " shadow-lg hover:shadow-xl"
              )}
              onClick={toggleTheme}
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Enhanced Project Types */}
            <nav className="mt-8 mb-8">
              <h2 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-4 tracking-wider font-semibold">
                Project Categories
              </h2>
              <div className="space-y-2">
                {projectTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 font-medium rounded-lg transition-all duration-300",
                      selectedType === type.id 
                        ? `bg-gradient-to-r ${type.color} text-white shadow-lg hover:shadow-xl` 
                        : `hover:bg-gray-100 dark:hover:bg-gray-800/50 
                           hover:translate-x-1 hover:shadow-md`
                    )}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </Button>
                ))}
              </div>
            </nav>

            {/* Enhanced Technologies Filter */}
            <div className="mb-8">
              <h2 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-4 tracking-wider font-semibold">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Button
                    key={tech.name}
                    variant={selectedTech === tech.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTech(tech.name)}
                    className={cn(
                      "rounded-lg transition-all duration-300 gap-1.5",
                      selectedTech === tech.name 
                        ? `bg-${tech.color}-500 hover:bg-${tech.color}-600 text-white` 
                        : `hover:bg-${tech.color}-50 dark:hover:bg-${tech.color}-900/20
                           hover:scale-105 hover:shadow-md`
                    )}
                  >
                    <span>{tech.icon}</span>
                    <span className="capitalize">{tech.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Links */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/20 dark:border-gray-700/20 space-y-2 ">
            <Button 
              variant="ghost" 
              className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg group transition-all duration-300" 
              asChild
            >
              <a href="mailto:your.email@example.com" className="flex items-center">
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Me</span>
              </a>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg group transition-all duration-300" 
              asChild
            >
              <a href="https://wa.me/0761235651" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">WhatsApp</span>
              </a>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn(
          "ml-72 flex-1 min-h-screen transition-all duration-500",
          isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
        )}>
          {/* Enhanced Search Bar */}
          <div className={cn(
            "sticky top-0 z-40  transition-all duration-500",
            isDark 
              ? "bg-gray-900/40 border-gray-800/30" 
              : "bg-white/40 border-gray-200/30",
            "border-b shadow-lg"
          )}>
            <div className="max-w-7xl mx-auto px-8 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search projects by name, technology, or keywords..."
                  className={cn(
                    "w-full md:w-96 pl-10 transition-all duration-300",
                    isDark 
                      ? "bg-gray-900 border-gray-800 focus:bg-gray-800" 
                      : "bg-white border-gray-200 focus:bg-gray-50",
                    "rounded-lg focus:ring-2 focus:ring-blue-500"
                  )}
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchQuery && (
                  <div className={cn(
                    "absolute top-full left-0 w-full mt-2 rounded-lg shadow-xl border  transition-all duration-300",
                    isDark 
                      ? "bg-gray-900/70 border-gray-800/30" 
                      : "bg-white/70 border-gray-200/30"
                  )}>
                    <div className="p-3 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Found {filteredProjects.length} results
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Projects Grid */}
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <article 
                  key={project.id} 
                  className={cn(
                    "group  rounded-xl overflow-hidden transition-all duration-500",
                    isDark 
                      ? "bg-gray-900/40 hover:bg-gray-800/40" 
                      : "bg-white/40 hover:bg-white/60",
                    "border border-transparent",
                    isDark 
                      ? "hover:border-gray-700/50" 
                      : "hover:border-gray-200/50",
                    "transform hover:scale-[1.02] hover:shadow-2xl",
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                  )}
                  style={{
                    transitionDelay: `${idx * 100}ms`
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image Container */}
                  <div className="aspect-video relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={cn(
                      "absolute inset-0 transition-opacity duration-300",
                      isDark 
                        ? "bg-gradient-to-br from-gray-800 to-gray-900" 
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    )} />
                    
                    {/* Project Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay with Actions */}
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center gap-4 bg-gradient-to-b from-transparent to-gray-900/90",
                      "opacity-0 group-hover:opacity-100 transition-all duration-300"
                    )}>
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
                        >
                          <Button 
                            size="sm" 
                            className="bg-white/90 hover:bg-white text-gray-900 shadow-lg hover:shadow-xl"
                          >
                            <Globe className="mr-2 h-4 w-4" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200"
                        >
                          <Button 
                            size="sm" 
                            className={cn(
                              "shadow-lg hover:shadow-xl transition-all duration-300",
                              isDark 
                                ? "bg-gray-900 hover:bg-gray-800 text-white" 
                                : "bg-white hover:bg-gray-50 text-gray-900"
                            )}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Source Code
                          </Button>
                        </a>
                      )}
                    </div>

                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute top-3 left-3">
                        <span className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium",
                          project.status === "production" 
                            ? "bg-green-500/20 text-green-300" 
                            : "bg-yellow-500/20 text-yellow-300"
                        )}>
                          {project.status === "production" ? "Production" : "Beta"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {project.title}
                      </h2>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(project.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={cn(
                      "mb-4 line-clamp-2 transition-colors duration-300",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300",
                            isDark 
                              ? "bg-blue-900/30 text-blue-300 hover:bg-blue-900/40" 
                              : "bg-blue-100/80 text-blue-800 hover:bg-blue-100"
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={cn(
                            "px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300",
                            isDark 
                              ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Project Stats */}
                    {(project.downloads || project.users) && (
                      <div className="mt-4 pt-4 border-t border-gray-200/20 dark:border-gray-700/20">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {project.downloads && `${project.downloads} downloads`}
                          {project.downloads && project.users && " • "}
                          {project.users && `${project.users} active users`}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;