import { ArrowRight, Play, Sparkles, Code2, Smartphone, Laptop, Globe, Monitor, Smartphone as MobileIcon, Globe as WebIcon, Monitor as DesktopIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logoImage from "../assets/logo2.png";

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        ease: "easeOut" as const
      }
    })
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.2 + i * 0.1,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-red-200 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content - Text */}
          <motion.div 
            className="text-center lg:text-left"
            initial="hidden"
            animate="visible"
          >
            {/* Main heading */}
            <motion.div className="mb-6" variants={textVariants} custom={0}>
              <span className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-4">
                Transforming Ideas Into Digital Reality
              </span>
              <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                <span className="block">Innovative Solutions</span>
                <span className="text-red-600">For Your Digital Success</span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={textVariants}
              custom={1}
            >
              We craft custom software solutions that drive business growth. 
              From concept to deployment, our expert team delivers scalable, 
              secure, and high-performance applications tailored to your needs.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
              variants={textVariants}
              custom={2}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg transform transition-all duration-300 hover:shadow-xl">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg group-hover:bg-red-50 transition-all duration-300">
                  <Play className="h-6 w-6 text-red-600" fill="currentColor" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Watch our</p>
                  <p className="font-medium text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                    Showreel (2:30)
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto lg:mx-0"
              initial="hidden"
              animate="visible"
            >
              {[
                { number: "50+", label: "Projects Delivered" },
                { number: "3+", label: "Years Experience" },
                { number: "100%", label: "Client Satisfaction" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={statsVariants}
                  custom={index}
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Devices with Logos */}
          <motion.div
            className="flex justify-center items-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="relative flex items-center justify-center -mt-16">
              {/* Smartphone - positioned to overlap with laptop */}
              <motion.div
                className="relative z-30 -mr-8"
                initial={{ opacity: 0, y: 20, rotate: -15 }}
                animate={{ opacity: 1, y: 0, rotate: -15 }}
                transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                whileHover={{ 
                  y: -10, 
                  rotate: -10,
                  scale: 1.05 
                }}
              >
                <div className="relative">
                  {/* Phone frame */}
                  <div className="w-48 h-96 bg-gray-900 rounded-[2rem] border-4 border-gray-700 shadow-2xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-red-50 rounded-[1.5rem] p-6 flex items-center justify-center">
                      {/* Logo inside screen */}
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                          <img 
                            src={logoImage} 
                            alt="Damaki Logo" 
                            className="w-28 h-28 object-contain"
                          />
                        </div>
                        <p className="text-lg text-gray-600 font-medium mb-2">Damaki</p>
                        <motion.p 
                          className="text-sm text-gray-500 font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.0, duration: 0.6 }}
                        >
                          Empowering Digital Solutions
                        </motion.p>
                      </div>
                    </div>
                  </div>
                  {/* Home button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
                </div>
              </motion.div>

              {/* Laptop - positioned to connect with smartphone */}
              <motion.div
                className="relative z-20"
                initial={{ opacity: 0, y: 30, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 5 }}
                transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                whileHover={{ 
                  y: -10, 
                  rotate: 0,
                  scale: 1.05 
                }}
              >
                <div className="relative">
                  {/* Laptop screen */}
                  <div className="w-96 h-64 bg-gray-900 rounded-t-2xl border-4 border-gray-700 shadow-2xl">
                    {/* Screen content */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-blue-50 rounded-t-xl p-8 flex items-center justify-center">
                      {/* Logo inside screen */}
                      <div className="text-center">
                        <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                          <img 
                            src={logoImage} 
                            alt="Damaki Logo" 
                            className="w-36 h-36 object-contain"
                          />
                        </div>
                        <p className="text-xl text-gray-700 font-semibold mb-2">Damaki Solutions</p>
                        <motion.p 
                          className="text-base text-gray-500 font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.2, duration: 0.6 }}
                        >
                          Empowering Digital Solutions
                        </motion.p>
                      </div>
                    </div>
                  </div>
                  {/* Laptop base */}
                  <div className="w-[28rem] h-8 bg-gray-800 rounded-b-2xl border-4 border-gray-700 shadow-lg"></div>
                  {/* Laptop stand */}
                  <div className="w-20 h-3 bg-gray-700 rounded-full mx-auto mt-3"></div>
                </div>
              </motion.div>

              {/* Connection line between devices */}
              <motion.div
                className="absolute z-10 w-16 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full opacity-80"
                style={{ 
                  top: '50%', 
                  left: 'calc(50% - 8rem)', 
                  transform: 'translateY(-50%) rotate(15deg)' 
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.8, scaleX: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
              />
            </div>

            {/* Enhanced decorative elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-12 h-12 bg-blue-600 rounded-full opacity-80 shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-10 h-10 bg-red-600 rounded-full opacity-80 shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 2.1, duration: 0.5 }}
            />
            
            {/* Additional floating elements for visual interest */}
            <motion.div
              className="absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-4 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-60"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 2.7, duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}