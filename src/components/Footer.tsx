import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import logoImage from "../assets/logo2.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    { name: "Web Development", href: "#" },
    { name: "Mobile Apps", href: "#" },
    { name: "API Development", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "IT Consulting", href: "#" }
  ];

  const socialLinks = [
    { icon: Github, href: "#", name: "GitHub", color: "hover:text-red-600" },
    { icon: Linkedin, href: "#", name: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", name: "Twitter", color: "hover:text-red-600" }
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <img 
                  src={logoImage} 
                  alt="Damaki Solutions Logo" 
                  className="h-6 w-6 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">
                Damaki Solutions
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering businesses with innovative digital solutions that drive growth and success.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-sm">hello@damakisolutions.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">0790 449157</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-sm">Mountain Mall, Thika Road</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Damaki Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}