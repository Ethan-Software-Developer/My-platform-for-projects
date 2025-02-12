import { useState, useEffect } from "react";
import { 
  Search, 
  Sun, 
  Moon, 
  Mail, 
  Globe, 
  Smartphone, 
  Wrench, 
  LayoutGrid, 
  Github, 
  Code, 
  Monitor, 
  Database, 
  Server,
  Coffee,
  ExternalLink
} from "lucide-react";
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
  `
};

// Set up meta tags update function
const updateMetaTags = () => {
  document.title = "CodeVault | Portfolio & Projects by Ethan Sevenster";

  const metaTags = {
    description: "Explore a collection of web applications, mobile apps, and developer tools created by Ethan Sevenster.",
    keywords: "web development, software engineering, portfolio, projects, react, javascript, python",
    author: "Ethan Sevenster",
    "og:title": "CodeVault | Portfolio & Projects",
    "og:description": "Explore my collection of web applications, mobile apps, and developer tools.",
    "og:type": "website",
    "twitter:card": "summary_large_image",
    "twitter:title": "CodeVault | Portfolio & Projects",
    viewport: "width=device-width, initial-scale=1.0"
  };

  Object.entries(metaTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`) ||
               document.querySelector(`meta[property="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.content = content;
  });
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
    icon: <Monitor className="h-4 w-4" />,
    color: "from-violet-500 to-pink-500"
  },
  {
    id: "mobile-app",
    label: "Mobile Apps",
    icon: <Smartphone className="h-4 w-4" />,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "backend",
    label: "Backend Services",
    icon: <Server className="h-4 w-4" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "database",
    label: "Database Projects",
    icon: <Database className="h-4 w-4" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "tool",
    label: "Developer Tools",
    icon: <Wrench className="h-4 w-4" />,
    color: "from-amber-500 to-orange-500"
  }
];

// Enhanced technologies with more options
const technologies = [
  { name: "all", icon: <Code className="h-3 w-3" />, color: "bg-gradient-to-r from-red-500 to-blue-500", label: "All Tech" },
  { name: "html", icon: "🌐", color: "orange", label: "HTML5" },
  { name: "css", icon: "🎨", color: "blue", label: "CSS3" },
  { name: "javascript", icon: "📜", color: "yellow", label: "JavaScript" },
  { name: "typescript", icon: "📘", color: "blue", label: "TypeScript" },
  { name: "react", icon: "⚛️", color: "cyan", label: "React" },
  { name: "vue", icon: "💚", color: "green", label: "Vue.js" },
  { name: "angular", icon: "🅰️", color: "red", label: "Angular" },
  { name: "node", icon: "🟢", color: "green", label: "Node.js" },
  { name: "python", icon: "🐍", color: "yellow", label: "Python" },
  { name: "django", icon: "🎯", color: "green", label: "Django" },
  { name: "php", icon: "🐘", color: "purple", label: "PHP" },
  { name: "java", icon: "☕", color: "brown", label: "Java" },
  { name: "spring", icon: "🍃", color: "green", label: "Spring" },
  { name: "go", icon: "🔵", color: "blue", label: "Go" }
];
// Enhanced projects data with diverse examples
const projects = [
 
  {
    id: 2,
    title: "Database Management Tool",
    description: "Advanced database management interface with real-time monitoring, query optimization, and automated backup scheduling.",
    type: "database",
    technologies: ["typescript", "node", "postgresql", "redis"],
    image: "/images/db-tool.jpg",
    keywords: ["database", "management", "monitoring", "backup"],
    tags: ["Enterprise", "Database", "DevOps"],
    category: "Database Tools",
    githubUrl: "https://github.com/username/db-tool",
    demoUrl: "https://demo.db-tool.com",
    lastUpdated: "2024-03-10",
    status: "beta",
    downloads: "15k+"
  },
  {
    id: 3,
    title: "Login and Registration Form",
    description: "A scalable login and registration system with a modern UI, smooth transitions, and interactive effects using HTML, CSS, and JavaScript",
    type: "web-app",
    technologies: ["html", "javascript", "css"],
    image: "https://raw.githubusercontent.com/Ethan-Software-Developer/Login-form-no-pic/refs/heads/master/Login-page1.png",
    keywords: ["login", "form", "register", "dashboard"],
    tags: ["form", "Login", "register"],
    category: "Web Applications",
    githubUrl: "https://github.com/Ethan-Software-Developer/Login-form-no-pic",
    demoUrl: "https://login-form-no-pic.vercel.app/",
    lastUpdated: "2024-03-08",
    status: "production",
    users: "50k+"
  },
  {
    id: 6,
    title: "Login and Registration Form",
    description: "A scalable login and registration system with a modern UI, smooth transitions, and interactive effects using HTML, CSS, and JavaScript",
    type: "web-app",
    technologies: ["html", "javascript", "css"],
    image: "https://raw.githubusercontent.com/Ethan-Software-Developer/Login-man-stars/refs/heads/master/picfor%20github.png",
    keywords: ["login", "form", "register", "dashboard"],
    tags: ["form", "Login", "register"],
    category: "Web Applications",
    githubUrl: "https://github.com/Ethan-Software-Developer/Login-man-stars",
    demoUrl: "https://login-man-stars.vercel.app/",
    lastUpdated: "2024-03-08",
    status: "production",
    users: "50k+"
  },

    {
    id: 7,
    title: "Login and Registration Form",
    description: "A scalable login and registration system with a modern UI, smooth transitions, and interactive effects using HTML, CSS, and JavaScript",
    type: "web-app",
    technologies: ["html", "javascript", "css"],
    image:"https://raw.githubusercontent.com/Ethan-Software-Developer/Login-spinning-purple/refs/heads/master/picfor%20github.png",
    keywords: ["login", "form", "register", "dashboard"],
    tags: ["form", "Login", "register"],
    category: "Web Applications",
    githubUrl: "https://github.com/Ethan-Software-Developer/Login-spinning-purple/tree/master",
    demoUrl: "https://login-spinning-purple.vercel.app/",
    lastUpdated: "2024-03-08",
    status: "production",
    users: "50k+"
  },
  {
    id: 8,
    title: "Login and Registration Form",
    description: "A scalable login and registration system with a modern UI, smooth transitions, and interactive effects using HTML, CSS, and JavaScript",
    type: "web-app",
    technologies: ["html", "javascript", "css"],
    image:
    "https://raw.githubusercontent.com/Ethan-Software-Developer/Login-star-s/refs/heads/master/picfor%20github.png",
    keywords: ["login", "form", "register", "dashboard"],
    tags: ["form", "Login", "register"],
    category: "Web Applications",
    githubUrl: "https://github.com/Ethan-Software-Developer/Login-star-s/tree/master",
    demoUrl: "https://login-star-s.vercel.app/#",
    lastUpdated: "2024-03-08",
    status: "production",
    users: "50k+"
  },
  {
    id: 1,
    title: "Login and Registration Form",
    description: "A scalable login and registration system with a modern UI, smooth transitions, and interactive effects using HTML, CSS, and JavaScript",
    type: "web-app",
    technologies: ["html", "javascript", "css"],
    image:
    "https://raw.githubusercontent.com/Ethan-Software-Developer/Login-deer-page/refs/heads/master/picfor%20github.png",
    keywords: ["login", "form", "register", "dashboard"],
    tags: ["form", "Login", "register"],
    category: "Web Applications",
    githubUrl: "https://github.com/Ethan-Software-Developer/Login-deer-page/tree/master",
    demoUrl: "https://login-deer-page-fejnmllhd-ethan-software-developers-projects.vercel.app/",
    lastUpdated: "2024-03-08",
    status: "production",
    users: "50k+"
  },
  {
    id: 4,
    title: "API Gateway Service",
    description: "High-performance API gateway with rate limiting, caching, and authentication middleware support.",
    type: "backend",
    technologies: ["go", "redis", "postgresql"],
    image: "/images/api-gateway.jpg",
    keywords: ["api", "gateway", "microservices", "performance"],
    tags: ["Backend", "Microservices", "Enterprise"],
    category: "Backend Services",
    githubUrl: "https://github.com/username/api-gateway",
    lastUpdated: "2024-03-05",
    status: "production",
    highlight: true
  },
  {
    id: 5,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform fitness tracking app with workout planning, progress monitoring, and social features.",
    type: "mobile-app",
    technologies: ["react", "typescript", "node", "mongodb"],
    image: "/images/fitness-app.jpg",
    keywords: ["fitness", "mobile", "tracking", "social"],
    tags: ["Mobile", "Healthcare", "Social"],
    category: "Mobile Applications",
    githubUrl: "https://github.com/username/fitness-app",
    demoUrl: "https://demo.fitness-app.com",
    lastUpdated: "2024-03-01",
    status: "production",
    users: "25k+"
  }
];

const Index = () => {
  // Core state management
  const [isDark, setIsDark] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showVault, setShowVault] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("latest");
  
  const projectsPerPage = 6;

  // Enhanced search functionality
  const searchProjects = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ');
    
    return projects.filter(project => {
      const searchableContent = [
        project.title,
        project.description,
        ...(project.technologies || []),
        ...(project.keywords || []),
        ...(project.tags || []),
        project.category,
        project.type,
        project.status
      ].map(item => item?.toLowerCase());

      return searchTerms.every(term =>
        searchableContent.some(content => content?.includes(term))
      );
    });
  };

  // Enhanced filter and sort function
  const filterAndSortProjects = () => {
    let filtered = projects.filter(project => {
      const typeMatch = selectedType === 'all' || project.type === selectedType;
      const techMatch = selectedTech === 'all' || 
        project.technologies.some(tech => tech.toLowerCase() === selectedTech.toLowerCase());
      const searchMatch = !searchQuery.trim() || searchProjects(searchQuery).includes(project);

      return typeMatch && techMatch && searchMatch;
    });

    // Apply sorting
    switch (sortOption) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
        filtered.sort((a, b) => {
          const aMetric = Number(a.downloads?.replace('k+', '000') || a.users?.replace('k+', '000') || '0');
          const bMetric = Number(b.downloads?.replace('k+', '000') || b.users?.replace('k+', '000') || '0');
          return bMetric - aMetric;
        });
        break;
    }

    return filtered;
  };
  // Continue from previous Index component...

  // Effect hooks for initialization and updates
  useEffect(() => {
    const filtered = filterAndSortProjects();
    setFilteredProjects(filtered);
  }, [selectedType, selectedTech, searchQuery, sortOption]);

  useEffect(() => {
    updateMetaTags();
    setFilteredProjects(projects);
    setIsLoaded(true);
    
    // Check system theme preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Setup theme listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Pagination calculations
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  if (!showVault) {
    return <Welcome onComplete={() => setShowVault(true)} isDark={isDark} toggleTheme={toggleTheme} />;
  }

  return (
    <div className={cn(
      "min-h-screen flex transition-all duration-500",
      isDark ? "bg-gray-950" : "bg-gray-50"
    )}>
      {/* Add global styles */}
      <style>{styles.keyframes}</style>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary Gradient */}
        <div className={cn(
          "absolute inset-0 animate-gradient-shift",
          isDark 
            ? "bg-gradient-to-br from-gray-900 via-gray-900/50 to-blue-900/20" 
            : "bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20"
        )} />

        {/* Aurora Effects */}
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

        {/* Particle Effects - Dark Mode Only */}
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
      {/* Enhanced Sidebar - Fixed Layout */}
<aside className={cn(
  "fixed left-0 top-0 h-full w-72 flex flex-col transition-all duration-500",
  isDark 
    ? "bg-gray-900/40 border-gray-800/30" 
    : "bg-white/40 border-gray-200/30",
  "border-r  shadow-2xl z-50",
  isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
)}>
  {/* Main Scrollable Content */}
  <div className="flex-1 overflow-y-auto">
    <div className="p-6">
      {/* Brand */}
      <div className="flex items-center gap-4 mb-6 hover:transform hover:scale-105 transition-all duration-300">
        {/* Brand content remains the same */}
      </div>

      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute top-6 right-6 rounded-lg transition-all duration-300",
          isDark 
            ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50" 
            : "bg-white/50 hover:bg-gray-50/50 border-gray-200/50",
          "shadow-lg hover:shadow-xl"
        )}
        onClick={toggleTheme}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>

      {/* Project Categories */}
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
                  : `hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1 hover:shadow-md`
              )}
              onClick={() => setSelectedType(type.id)}
            >
              {type.icon}
              <span>{type.label}</span>
              <span className="ml-auto text-xs opacity-60">
                {filteredProjects.filter(p => p.type === type.id).length}
              </span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Technologies Filter */}
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
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
              )}
            >
              <span>{tech.icon}</span>
              <span className="capitalize">{tech.label || tech.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-8">
        <h2 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-4 tracking-wider font-semibold">
          Sort Projects
        </h2>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={cn(
            "w-full p-2 rounded-lg border transition-all duration-300",
            isDark 
              ? "bg-gray-800 border-gray-700 text-gray-200" 
              : "bg-white border-gray-200 text-gray-800"
          )}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  </div>

  {/* Contact Links - Fixed at Bottom */}
  <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20 space-y-2 flex-shrink-0">
    <Button 
      variant="ghost" 
      className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg group transition-all duration-300" 
      asChild
    >
      <a href="mailto:contact@ethansev.dev" className="flex items-center">
        <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
        <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Me</span>
      </a>
    </Button>
    <Button 
      variant="ghost" 
      className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg group transition-all duration-300" 
      asChild
    >
      <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="flex items-center">
        <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
        <span className="group-hover:translate-x-1 transition-transform duration-300">View GitHub</span>
      </a>
    </Button>
  </div>
</aside>

      {/* Main Content */}
      <main className={cn(
        "ml-72 flex-1 min-h-screen transition-all duration-500",
        isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      )}>
        {/* Search Bar */}
        <div className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          isDark 
            ? "bg-gray-900/40 border-gray-800/30" 
            : "bg-white/40 border-gray-200/30",
          "border-b  shadow-lg"
        )}>
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                placeholder="Search projects by name, technology, or keywords..."
                className={cn(
                  "w-full pl-10 transition-all duration-300",
                  isDark 
                    ? "bg-gray-900/50 border-gray-800 focus:bg-gray-800/50" 
                    : "bg-white/50 border-gray-200 focus:bg-gray-50/50",
                  "rounded-lg focus:ring-2 focus:ring-blue-500 "
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          {filteredProjects.length === 0 ? (
            <div className={cn(
              "text-center py-12 rounded-lg border-2 border-dashed",
              isDark ? "border-gray-800" : "border-gray-200"
            )}>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project, idx) => (
                  <article 
                    key={project.id} 
                    className={cn(
                      "group rounded-xl overflow-hidden transition-all duration-500",
                      isDark 
                        ? "bg-gray-900/40 hover:bg-gray-800/40" 
                        : "bg-white/40 hover:bg-white/60",
                      "border border-transparent",
                      isDark 
                        ? "hover:border-gray-700/50" 
                        : "hover:border-gray-200/50",
                      "transform hover:scale-[1.02] hover:shadow-2xl ",
                      isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                    )}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    {/* Project Image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Project Actions Overlay */}
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
                            <Button size="sm" className="bg-white/90 hover:bg-white text-gray-900">
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
                      <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {project.title}
                      </h2>
                      <p className={cn(
                        "mb-4 line-clamp-2",
                        isDark ? "text-gray-300" : "text-gray-600"
                      )}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={cn(
                              "px-2 py-1 rounded-lg text-xs font-medium",
                              isDark 
                                ? "bg-blue-900/30 text-blue-300" 
                                : "bg-blue-100 text-blue-800"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={cn(
                              "px-2 py-1 rounded-lg text-xs font-medium",
                              isDark 
                                ? "bg-gray-800 text-gray-300" 
                                : "bg-gray-100 text-gray-600"
                            )}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Project Metrics */}
                      {(project.downloads || project.users) && (
                        <div className="mt-4 pt-4 border-t border-gray-200/20 dark:border-gray-700/20">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {project.downloads && `${project.downloads} downloads`}
                            {project.downloads && project.users && " • "}
                            {project.users && `${project.users} users`}
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={cn(
                      "transition-all duration-300",
                      isDark 
                        ? "hover:bg-gray-800" 
                        : "hover:bg-gray-100"
                    )}
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <Button
                      key={idx}
                      variant={currentPage === idx + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(idx + 1)}
                      className={cn(
                        "transition-all duration-300",
                        currentPage === idx + 1
                          ? "bg-blue-500 hover:bg-blue-600"
                          : isDark 
                            ? "hover:bg-gray-800" 
                            : "hover:bg-gray-100"
                      )}
                    >
                      {idx + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={cn(
                      "transition-all duration-300",
                      isDark 
                        ? "hover:bg-gray-800" 
                        : "hover:bg-gray-100"
                    )}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;