import { ExternalLink, Github, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchFromApi } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { PortfolioSkeleton } from "@/components/ui/shimmer";

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: string;
  color: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
}

// Fallback data in case API is not available
const fallbackProjects: IProject[] = [
  {
    _id: '1',
    title: "E-Commerce Platform",
    description: "A full-featured online marketplace with payment integration, inventory management, and admin dashboard.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "Web Application",
    color: "from-red-500 to-red-600",
    featured: true
  },
  {
    _id: '2',
    title: "Healthcare Management System",
    description: "Comprehensive patient management system for healthcare providers with appointment scheduling and EMR.",
    imageUrl  : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
    category: "Healthcare",
    color: "from-blue-500 to-blue-600"
  },
  {
    _id: '3',
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication and real-time transaction monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "Redux", "Biometrics"],
    category: "Mobile App",
    color: "from-emerald-500 to-emerald-600"
  }
];

// Define the API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Always treat as production environment
  const isProduction = true;
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetchFromApi<ApiResponse<IProject[]>>('/projects');
        
        if (response?.success && response.data) {
          // If we have data from the API, use it
          const projectsData = Array.isArray(response.data) 
            ? response.data 
            : [];
          
          if (projectsData.length > 0) {
            setProjects(projectsData);
          } else {
          // If no projects in the database, use fallback only in development
          if (!isProduction) {
            setProjects(fallbackProjects);
            setError('No projects found in the database.');
            toast({
              title: "No projects found",
              description: "Using sample project data. Please add projects through the admin panel.",
              variant: "destructive"
            });
          } else {
            // In production, show empty state instead of fallback
            setProjects([]);
          }
        } 
        } else {
        // If API call fails, use fallback data only in development
        const errorMsg = response?.error || 'Failed to fetch projects';
        console.error('API Error:', errorMsg);
        
        if (!isProduction) {
          setProjects(fallbackProjects);
          setError('Failed to load projects from server.');
          toast({
            title: "Error loading projects",
            description: "Using sample project data. Please check your connection and try again.",
            variant: "destructive"
          });
        } else {
          // In production, show empty state
          setProjects([]);
          setError('Unable to load projects at this time.');
        }
      } 
      } catch (err) {
      console.error('Fetch Error:', err);
      
      if (!isProduction) {
        setError('Error connecting to the server. Using fallback data.');
        setProjects(fallbackProjects);
      } else {
        setError('Unable to connect to the server.');
        setProjects([]);
      }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  // Handle error state - only show error message in development
  if (error && !isProduction && projects.length === 0) {
    return (
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700">{error} Using fallback project data.</p>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of our recent work and projects we've completed for our clients.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', ...new Set(fallbackProjects.map(p => p.category))].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="w-full">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-white/10 text-white backdrop-blur-sm border-0 hover:bg-white/20"
                            >
                              {tag}
                            </Badge>
                          )) || null}
                        </div>
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 text-white bg-white/10 border-white/20 hover:bg-white/20"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 text-white bg-white/10 border-white/20 hover:bg-white/20"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              View Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {project.category}
                        </span>
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-900 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // In production, if there are no projects and there's an error, show empty state
  if (projects.length === 0) {
    return (
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-gray-600 mb-8">
              We're currently updating our portfolio. Please check back soon to see our latest work.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Get unique categories for filters
  const categories = ['All', ...new Set(projects.map(project => project.category))];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-gray-600">
            Check out some of our recent work and projects we've completed for our clients.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id || project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="w-full">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-white/10 text-white backdrop-blur-sm border-0 hover:bg-white/20"
                            >
                              {tag}
                            </Badge>
                          )) || null}
                        </div>
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 text-white bg-white/10 border-white/20 hover:bg-white/20"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 text-white bg-white/10 border-white/20 hover:bg-white/20"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              View Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {project.category}
                        </span>
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-900 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
