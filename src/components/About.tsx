import { Users, Target, Lightbulb, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

function useCountUp(end: number | string, duration = 1.2) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    let frame: number;
    const step = (timestamp: number) => {
      if (!ref.current) return;
      if (start === 0) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const value = Math.floor(progress * (typeof end === 'number' ? end : parseInt(end)));
      ref.current.textContent = value + (typeof end === 'string' && end.includes('+') ? '+' : '');
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        ref.current.textContent = end.toString();
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);
  return ref;
}

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower businesses with innovative digital solutions that drive growth and success in the modern world.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with our clients as partners, ensuring transparent communication throughout the development process.",
      color: "from-red-600 to-red-700"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We are committed to delivering high-quality solutions that exceed expectations and stand the test of time.",
      color: "from-blue-600 to-blue-700"
    }
  ];

  const stats = [
    { number: 50, label: "Projects Completed", suffix: "+", color: "from-red-500 to-red-600" },
    { number: 3, label: "Years in Business", suffix: "+", color: "from-blue-500 to-blue-600" },
    { number: 15, label: "Technologies Mastered", suffix: "+", color: "from-red-600 to-red-700" },
    { number: 100, label: "Client Satisfaction", suffix: "%", color: "from-blue-600 to-blue-700" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About <span className="text-red-600">Damaki Solutions</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                We are a passionate team of software developers, designers, and digital strategists 
                dedicated to transforming businesses through innovative technology solutions.
              </p>
              <p>
                Founded with the vision of bridging the gap between complex technology and practical 
                business needs, Damaki Solutions has grown to become a trusted partner for companies 
                looking to digitize and optimize their operations.
              </p>
              <p>
                Our expertise spans across modern web technologies, mobile development, cloud solutions, 
                and emerging technologies. We believe in building long-term relationships with our clients 
                by delivering solutions that not only meet their current needs but also scale with their growth.
              </p>
            </div>

          
          </div>

          {/* Right content - Values */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Why Choose Us?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-red-200 hover:-translate-y-2 h-full group">
                    <div className={`bg-gradient-to-r ${value.color} p-3 rounded-lg w-fit mx-auto mb-4 shadow-lg`}>
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}