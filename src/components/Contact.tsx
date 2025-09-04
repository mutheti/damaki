import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://damaki-backend.onrender.com';
      const response = await fetch(`${apiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        
        toast({
          title: 'Success!',
          description: data.message || 'Your message has been sent successfully!',
          variant: 'default',
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@damakisolutions.com",
      action: "mailto:info@damakisolutions.com",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "0743 863 009",
      action: "tel:+254743863009",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      content: "Chat with us",
      action: "https://wa.me/+254743863009",
      color: "from-red-600 to-red-700"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Office 2B, Mountain Mall, Thika Road",
      action: "https://maps.google.com/?q=Mountain+Mall+Thika+Road",
      color: "from-blue-600 to-blue-700"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Get In <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600">
            Ready to start your next project? Let's discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-700">
                    First Name
                  </label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.firstName ? 'border-red-500' : ''}`}
                    aria-label="Enter your first name"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-700">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.lastName ? 'border-red-500' : ''}`}
                    aria-label="Enter your last name"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.email ? 'border-red-500' : ''}`}
                  aria-label="Enter your email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                  Phone Number (Optional)
                </label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                  aria-label="Enter your phone number (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                  Project Details
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`min-h-[120px] border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.message ? 'border-red-500' : ''}`}
                  required 
                  aria-label="Describe your project requirements"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base transition-all duration-300 transform hover:scale-[1.02]"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Let's start a conversation</h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We're here to help you achieve your digital goals. Reach out to us through 
                any of the following channels, and we'll get back to you promptly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.action}
                  className="block group"
                  aria-label={`Contact us via ${info.title.toLowerCase()}: ${info.content}`}
                >
                  <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-red-200 hover:-translate-y-2 group-hover:bg-red-50">
                    <div className={`bg-gradient-to-r ${info.color} p-3 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold mb-2 text-gray-900 group-hover:text-red-600 transition-colors">{info.title}</h4>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick response promise */}
            <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl border border-red-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-gray-900">Quick Response Guarantee</h4>
                  <p className="text-sm text-gray-600">
                    We respond to all inquiries within 24 hours, often much sooner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}