import { Code, Smartphone, Globe, Cpu, Server, Clock, Calendar, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Smartphone,
  Globe,
  Cpu,
  Server,
  Clock,
  Calendar,
  Layers,
  ArrowRight,
};

interface ServiceDetails {
  frameworks: string[];
  duration: string;
  process: string[];
  delivery: string;
}

interface ServiceType {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  details: ServiceDetails;
}

// Fallback data in case API is not available
const fallbackServices: ServiceType[] = [
  {
    icon: 'Code',
    title: "Custom Software",
    description: "Tailored solutions that drive business growth and efficiency.",
    features: ["Enterprise Apps", "Workflow Automation", "System Integration"],
    color: "from-red-500 to-red-600",
    details: {
      frameworks: ["React", "Node.js", "Python", "Java", ".NET"],
      duration: "4-12 weeks",
      process: ["Requirement Analysis", "UI/UX Design", "Development", "Testing", "Deployment"],
      delivery: "Fully documented source code and deployment guide"
    }
  },
  {
    icon: 'Smartphone',
    title: "Mobile Apps",
    description: "Engaging mobile experiences for iOS and Android platforms.",
    features: ["Native Development", "Cross-Platform", "App Optimization"],
    color: "from-blue-500 to-blue-600",
    details: {
      frameworks: ["React Native", "Flutter", "Swift", "Kotlin"],
      duration: "6-16 weeks",
      process: ["Wireframing", "UI/UX Design", "Development", "Testing", "App Store Deployment"],
      delivery: "App Store ready package and documentation"
    }
  },
  {
    icon: 'Globe',
    title: "Web Solutions",
    description: "High-performance websites and web applications.",
    features: ["React/Next.js", "E-commerce", "Web Performance"],
    color: "from-amber-500 to-amber-600",
    details: {
      frameworks: ["Next.js", "React", "Vue", "Angular", "Node.js"],
      duration: "2-8 weeks",
      process: ["Discovery", "Design", "Development", "Testing", "Launch"],
      delivery: "Hosting setup and handover documentation"
    }
  },
  {
    icon: 'Cpu',
    title: "AI & ML",
    description: "Intelligent solutions powered by artificial intelligence.",
    features: ["Predictive Analytics", "Computer Vision", "NLP"],
    color: "from-purple-500 to-purple-600",
    details: {
      frameworks: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
      duration: "8-20 weeks",
      process: ["Data Collection", "Model Training", "Integration", "Testing", "Deployment"],
      delivery: "Trained models and integration documentation"
    }
  },
  {
    icon: 'Server',
    title: "Cloud Services",
    description: "Scalable and secure cloud infrastructure.",
    features: ["AWS/GCP/Azure", "DevOps", "Serverless"],
    color: "from-emerald-500 to-emerald-600",
    details: {
      frameworks: ["AWS CDK", "Terraform", "Kubernetes", "Docker"],
      duration: "2-4 weeks",
      process: ["Architecture Review", "Infrastructure Setup", "CI/CD Pipeline", "Monitoring"],
      delivery: "Infrastructure as Code and deployment pipeline"
    }
  },
  {
    icon: 'Layers',
    title: "UI/UX Design",
    description: "Beautiful interfaces that enhance user experience.",
    features: ["User Research", "Prototyping", "Design Systems"],
    color: "from-pink-500 to-pink-600",
    details: {
      frameworks: ["Figma", "Sketch", "Adobe XD", "Framer"],
      duration: "2-6 weeks",
      process: ["User Research", "Wireframing", "Prototyping", "User Testing", "Handoff"],
      delivery: "Design system and assets with specifications"
    }
  }
];


export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const { toast } = useToast();
  
  // Always use fallback data as per requirements
  const services = fallbackServices;

  const handleLearnMore = (service: ServiceType) => {
    setSelectedService(service);
  };

  const handleScheduleCall = () => {
    if (!selectedService) return;
    
    // In a real app, this would open a scheduling modal or redirect to contact form
    window.location.href = '#contact';
    setSelectedService(null);
    
    toast({
      title: "Redirecting to contact form",
      description: `Please fill out the form to schedule a call about ${selectedService.title}`,
    });
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of services to help your business grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className={`bg-gradient-to-r ${service.color} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="group mt-auto w-full"
                  onClick={() => handleLearnMore(service)}
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Button 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-red-500/50"
            onClick={() => window.location.href = '#contact'}
          >
            Discuss Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Service Details Dialog */}
        <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            {selectedService && (
              <>
                <DialogHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`bg-gradient-to-r ${selectedService.color} p-2 rounded-full`}>
                      {React.createElement(iconMap[selectedService.icon] || Code, { 
                        className: "w-6 h-6 text-white" 
                      })}
                    </div>
                    <DialogTitle className="text-2xl">{selectedService.title}</DialogTitle>
                  </div>
                  <DialogDescription className="text-left">
                    <p className="text-gray-700 mb-6">{selectedService.description}</p>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Layers className="w-4 h-4 mr-2" />
                          Frameworks & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedService.details.frameworks.map((framework, i) => (
                            <span key={i} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {framework}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Duration
                          </h4>
                          <p className="text-sm text-gray-600">{selectedService.details.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Delivery
                          </h4>
                          <p className="text-sm text-gray-600">{selectedService.details.delivery}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Our Process</h4>
                        <ol className="space-y-2">
                          {selectedService.details.process.map((step, i) => (
                            <li key={i} className="flex items-start">
                              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-sm text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setSelectedService(null)}>
                    Close
                  </Button>
                  <Button onClick={handleScheduleCall}>
                    Schedule a Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}