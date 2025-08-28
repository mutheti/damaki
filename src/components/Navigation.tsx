import { useState, useEffect, useRef } from "react";
import { Menu, X, Code2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/logo2.png";

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return [isDark, setIsDark] as const;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Our Work", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const logoVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut" as const
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" as const }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" as const }
    }
  };

  const rollingBackgroundVariants = {
    initial: { scale: 0, opacity: 0, x: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      x: i * 120, // Increased spacing for better visual separation
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 150,
        damping: 15
      }
    })
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-all duration-300 ${
        isScrolling 
          ? 'bg-white/98 border-gray-200 shadow-xl' 
          : 'bg-white/95 border-gray-200 shadow-lg'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="p-2 rounded-xl shadow-lg bg-gray-50 border border-gray-200"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)",
                borderColor: "rgb(239, 68, 68)"
              }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={logoImage} 
                alt="Damaki Logo" 
                className="h-10 w-10 object-contain"
              />
            </motion.div>
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-2xl font-bold text-gray-900 leading-tight">
                Damaki
              </span>
              <span className="text-sm text-gray-600 font-medium">
                Solutions
              </span>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 relative" ref={navRef}>
            {/* Dual-Line Rolling Background Effect */}
            {/* Top Line - Longer and Black */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-xl opacity-0 pointer-events-none border border-gray-600/50 shadow-lg"
              variants={rollingBackgroundVariants}
              initial="initial"
              animate="animate"
              custom={activeIndex}
              style={{
                width: "80px",
                height: "3px",
                top: "100%",
                transform: "translateY(0)",
                borderRadius: "2px"
              }}
            />
            
            {/* Bottom Line - Shorter and Red */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-xl opacity-0 pointer-events-none border border-red-400/50 shadow-lg"
              variants={rollingBackgroundVariants}
              initial="initial"
              animate="animate"
              custom={activeIndex}
              style={{
                width: "60px",
                height: "2px",
                top: "100%",
                transform: "translateY(4px)",
                borderRadius: "1px"
              }}
            />
            
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative px-6 py-3 text-gray-700 hover:text-red-600 transition-all duration-300 font-medium rounded-xl hover:bg-transparent z-10 cursor-pointer"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{ 
                  y: -3,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(0)}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.a>
            ))}
            <motion.div 
              className="ml-6 flex items-center space-x-3"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              {/* Get Started Button */}
              <motion.a
                href="#contact"
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-red-500/50"
                variants={buttonVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.div 
                  className="pt-4 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a
                    href="#contact"
                    className="block mx-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg text-center shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}