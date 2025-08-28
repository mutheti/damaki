import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMC0xMGMwLTUuNTIzLTQuNDc3LTEwLTEwLTEwUzE2IDE4LjQ3NyAxNiAyNHM0LjQ3NyAxMCAxMCAxMCAxMC00LjQ3NyAxMC0xMCIvPjwvZz48L2c+PC9zdmc+')]" />
      </div>
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Let's Talk About Your Project
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Bring Your <span className="text-red-400">Ideas to Life</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Let's discuss how we can help you achieve your business goals with our expert software solutions. Schedule a free consultation today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 rounded-full group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Call
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm"
          >
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-gray-800"></div>
                ))}
              </div>
              <span>Trusted by 100+ businesses</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center">
              <div className="text-yellow-400 mr-2">★★★★★</div>
              <span>5.0 Rating (50+ Reviews)</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
