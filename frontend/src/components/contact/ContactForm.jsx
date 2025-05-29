import React, { useState } from 'react';
import { Send, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid Indian phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, simulate submission
      setTimeout(() => {
        // In a real app, this would send data to backend
        // console.log('Form submitted:', formData);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 1000);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        Contact Us
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact form */}
        <Card>
          <div className="p-6">
            <h2 className="font-bold text-xl text-white mb-6">Get in Touch</h2>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-center mb-4">
                  Thank you for reaching out to us. We'll get back to you soon.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.name ? 'border-red-500' : 'border-gray-700'
                      } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.email ? 'border-red-500' : 'border-gray-700'
                      } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.phone ? 'border-red-500' : 'border-gray-700'
                      } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                      placeholder="9876543210"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.message ? 'border-red-500' : 'border-gray-700'
                      } rounded-md text-white focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" variant="primary" fullWidth>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Card>
        
        {/* Contact info */}
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="font-bold text-xl text-white mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <Phone size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+919508078935" className="text-white hover:text-yellow-500 transition-colors">
                      +91 9508078935
                    </a>
                  </div>
                </div>
                
                <div className="flex">
                  <Mail size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:contact@dbgmitournament.com" className="text-white hover:text-yellow-500 transition-colors">
                      dbgmi.official@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">
                      Daudnagar, Bihar, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h2 className="font-bold text-xl text-white mb-6">Follow Us</h2>
              
              <div className="space-y-4">
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">YouTube</p>
                    <p className="text-sm text-gray-400">Watch tournament highlights</p>
                  </div>
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-tr from-yellow-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Instagram</p>
                    <p className="text-sm text-gray-400">Follow for updates and photos</p>
                  </div>
                </a>
                
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Discord</p>
                    <p className="text-sm text-gray-400">Join our community</p>
                  </div>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;