'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Code, Smartphone, Zap, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, CheckCircle, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', initial === 'dark');
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you within 24 hours.');
    setFormData({ name: '', email: '', project: '', message: '' });
  };

  const services = [
    {
      icon: <Code className="w-10 h-10 text-emerald-400" />,
      title: "Premium Web Development",
      description: "Cutting-edge websites that convert visitors into customers",
      features: ["Next.js & React", "Performance Optimized", "SEO Ready"],
      gradient: "from-emerald-400 to-cyan-400"
    },
    {
      icon: <Smartphone className="w-10 h-10 text-violet-400" />,
      title: "Interactive UI/UX", 
      description: "Stunning interfaces that users love to engage with",
      features: ["Mobile-First Design", "Micro-Animations", "User Research"],
      gradient: "from-violet-400 to-purple-400"
    },
    {
      icon: <Zap className="w-10 h-10 text-amber-400" />,
      title: "Lightning Fast Delivery",
      description: "Premium quality delivered at startup speed",
      features: ["48hr Turnaround", "Live Updates", "24/7 Support"],
      gradient: "from-amber-400 to-orange-400"
    }
  ];

  const projects = [
    {
      title: "Bella Vista Restaurant",
      description: "Elegant restaurant experience with menu, booking, and immersive visuals.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      status: "Coming Soon",
      gradient: "from-rose-400 to-pink-400",
      url: "" // Add your Vercel URL here when deployed
    },
    {
      title: "Creative Agency Portfolio",
      description: "Bold, creative portfolio that increased client inquiries by 340%.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      tech: ["React", "GSAP", "Tailwind"],
      status: "Coming Soon",
      gradient: "from-blue-400 to-indigo-400"
    },
    {
      title: "SaaS Product Launch",
      description: "High-converting landing page that generated $2M in pre-orders.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tech: ["Next.js", "TypeScript", "Analytics"],
      status: "Case Study",
      gradient: "from-green-400 to-emerald-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-200/50 shadow-lg shadow-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                OutcomeForge
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-slate-700 hover:text-violet-600 transition-colors font-medium">Services</a>
              <a href="#projects" className="text-slate-700 hover:text-violet-600 transition-colors font-medium">Work</a>
              <a href="#contact" className="text-slate-700 hover:text-violet-600 transition-colors font-medium">Contact</a>
            </div>
            <a href="#contact" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl hover:shadow-violet-600/30 transform hover:scale-105">
              Start Project
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} id="hero">
            <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full text-violet-700 font-medium mb-5 border border-violet-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Web Development
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 bg-clip-text text-transparent">
                Websites that win customers.
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Built fast. Optimized to convert.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              I build <span className="font-bold text-violet-600">conversion‑focused websites</span> for founders and creators—fast, polished, and measurable.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#contact" className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl shadow-violet-600/25 hover:shadow-2xl hover:shadow-violet-600/35 transform hover:scale-110 inline-flex items-center justify-center ring-2 ring-violet-500/40">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#projects" className="group bg-white/80 backdrop-blur hover:bg-white text-slate-900 px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/15 border-2 border-slate-200 hover:border-violet-300 transform hover:scale-105 inline-flex items-center justify-center ring-1 ring-slate-200/80 hover:text-violet-700">
                View Portfolio
                <ExternalLink className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full text-emerald-700 font-medium mb-6 border border-emerald-200">
              <Code className="w-4 h-4 mr-2" />
              Premium Services
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Excellence in Every Detail</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Crafting digital experiences that combine stunning visuals with flawless functionality
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`group bg-white/70 backdrop-blur-sm p-10 rounded-3xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-700 font-medium">
                      <div className={`w-6 h-6 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center mr-3 shadow-sm`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 font-medium mb-6 border border-blue-200">
              <Star className="w-4 h-4 mr-2" />
              Featured Work
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Projects That Deliver Results</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real projects, real results—driving growth for businesses worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-3xl overflow-hidden border border-slate-200/50 hover:border-slate-300/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/15 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                 <Image 
                  src={project.image} 
                  alt={project.title} 
                  width={600} 
                  height={256} 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${project.gradient} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {project.status}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-violet-600 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 mb-6 text-lg leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn text-violet-600 hover:text-violet-700 font-bold text-lg inline-flex items-center transition-colors"
                    >
                      Visit Site
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-slate-500 font-semibold text-lg inline-flex items-center">
                      Case study coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        ></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Proven Track Record</h2>
            <p className="text-xl text-purple-200">Numbers that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Projects Delivered", icon: <Code className="w-8 h-8 text-white" /> },
              { number: "95+", label: "Happy Clients", icon: <Star className="w-8 h-8 text-white" /> },
              { number: "99.9%", label: "Uptime Record", icon: <Zap className="w-8 h-8 text-white" /> },
              { number: "2hr", label: "Avg Response", icon: <Mail className="w-8 h-8 text-white" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                  <div className="text-purple-200 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-purple-200 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full text-emerald-700 font-medium mb-6 border border-emerald-200">
              <Mail className="w-4 h-4 mr-2" />
              Connect with us
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Ready to Create Something Amazing?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We would love to discuss your vision and bring it to life with precision and creativity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className={`transform transition-all duration-1000 ${isVisible.contact ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-10 rounded-3xl border border-violet-200/50">
                <h3 className="text-3xl font-bold mb-8 text-slate-900">Start a Conversation</h3>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-slate-900 mb-1">Email</div>
                      <div className="text-slate-600">hello@outcomeforge.dev</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-slate-900 mb-1">Response Time</div>
                      <div className="text-slate-600">Within 2 hours, guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-slate-900 mb-1">Global Service</div>
                      <div className="text-slate-600">Worldwide project delivery</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-violet-200">
                  <h4 className="font-bold text-lg text-slate-900 mb-4">Follow the Journey</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-slate-200">
                      <Github className="w-5 h-5 text-slate-700" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-slate-200">
                      <Linkedin className="w-5 h-5 text-slate-700" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className={`transform transition-all duration-1000 ${isVisible.contact ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} id="contact">
              <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-200/50 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 text-slate-900 font-medium"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 text-slate-900 font-medium"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Project Type</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 text-slate-900 font-medium"
                  >
                    <option value="">Select your project type</option>
                    <option value="portfolio">Premium Portfolio</option>
                    <option value="landing">High-Converting Landing Page</option>
                    <option value="business">Business Website</option>
                    <option value="ecommerce">E-commerce Platform</option>
                    <option value="webapp">Web Application</option>
                    <option value="other">Custom Solution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Project Details</label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell me about your vision, goals, and timeline..."
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 text-slate-900 font-medium resize-none"
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-violet-600/25 hover:shadow-2xl hover:shadow-violet-600/35 transform hover:scale-105"
                >
                  Send Project Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl font-bold text-white">
              OutcomeForge
            </div>
          </div>
          <p className="text-slate-400 mb-8 text-lg">
            Crafting digital excellence, one pixel at a time.
          </p>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500">
              © 2024 OutcomeForge. All rights reserved. Built with passion and precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}