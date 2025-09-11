'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ChevronDown, Code, Smartphone, Zap, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, CheckCircle, Star, ArrowRight, Sparkles, Sun, Moon, Menu, X } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', or ''
  const [formErrors, setFormErrors] = useState({});

  // Refs for GSAP animations
  const heroHeadingRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    const initial = stored || 'light';
    setTheme(initial);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', initial === 'dark');
    }
  }, []);

  // Loading Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // Show loader for 2.8 seconds

    return () => clearTimeout(timer);
  }, []);

  // GSAP Hero Animation - triggers after loading completes
  useEffect(() => {
    if (!isLoading) {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const ctx = gsap.context(() => {
        const elements = [heroHeadingRef.current, heroSubtitleRef.current, heroDescriptionRef.current];
        
        if (prefersReducedMotion) {
          // If reduced motion is preferred, just show elements immediately
          gsap.set(elements, { opacity: 1, y: 0 });
          return;
        }

        // Optimize for performance
        gsap.set(elements, {
          opacity: 0,
          y: 30,
          willChange: "transform"
        });

        // Animate in sequence with staggered timing
        const tl = gsap.timeline({ delay: 0.3 });
        
        tl.to(heroHeadingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .to(heroSubtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .to(heroDescriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            // Clear will-change after animation completes
            gsap.set(elements, { willChange: "auto" });
          }
        }, "-=0.6");
      });

      return () => ctx.revert(); // Cleanup
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Switching from', theme, 'to', newTheme);
    setTheme(newTheme);
  };

  

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

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.project) {
      errors.project = 'Please select a project type';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Project details are required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Please provide more details (minimum 10 characters)';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous status and errors
    setFormStatus('');
    setFormErrors({});
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Set loading state
    setFormSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/movnrwgj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project: formData.project,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', project: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setFormSubmitting(false);
    }
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
      status: "Live Site",
      gradient: "from-rose-400 to-pink-400",
      url: "https://bella-vista-restaurant-9cal.vercel.app/"
    },
    {
      title: "Elite Business Consulting",
      description: "Professional consulting website featuring strategic planning, business growth, and leadership coaching services.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      tech: ["Next.js", "React", "Tailwind"],
      status: "Live Site",
      gradient: "from-blue-400 to-indigo-400",
      url: "https://elite-consulting-hjt8.vercel.app/"
    },
    {
      title: "Luna Pierce - Creative Portfolio",
      description: "Stunning creative portfolio showcasing photography, design, and digital art with elegant animations.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      status: "Live Site",
      gradient: "from-pink-400 to-violet-400",
      url: "https://luna-pierce.vercel.app/"
    }
  ];

  return (
    <>
      {/* Full-Screen Loading Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #0f172a, #1e293b, #334155)' 
            : 'linear-gradient(135deg, #f8fafc, #ffffff, #e2e8f0)'
        }}
      >
        <div className="flex flex-col items-center">
          {/* Loading Spinner */}
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 opacity-20"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: '#7c3aed',
                borderRightColor: '#9333ea',
                animationDuration: '1s'
              }}
            ></div>
          </div>
          
          {/* Loading Dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="w-3 h-3 rounded-full animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                  animationDelay: `${dot * 0.2}s`,
                  animationDuration: '1.2s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div 
        className={`min-h-screen transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(to bottom right, #0f172a, #1e293b, #334155)' 
            : 'linear-gradient(to bottom right, #f8fafc, #ffffff, #e2e8f0)'
        }}
      >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav 
        className="fixed top-0 w-full backdrop-blur-xl z-50 shadow-lg transition-colors duration-300"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(71, 85, 105, 0.5)' : 'rgba(148, 163, 184, 0.3)'}`,
          boxShadow: theme === 'dark' ? '0 10px 25px rgba(0, 0, 0, 0.2)' : '0 10px 25px rgba(15, 23, 42, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#services" 
                className="hover:text-violet-600 transition-colors font-medium"
                style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
              >
                Services
              </a>
              <a 
                href="#projects" 
                className="hover:text-violet-600 transition-colors font-medium"
                style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
              >
                Work
              </a>
              <a 
                href="#contact" 
                className="hover:text-violet-600 transition-colors font-medium"
                style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
              >
                Contact
              </a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#e2e8f0',
                  color: theme === 'dark' ? '#cbd5e1' : '#475569'
                }}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#e2e8f0',
                  color: theme === 'dark' ? '#cbd5e1' : '#475569'
                }}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#e2e8f0',
                  color: theme === 'dark' ? '#cbd5e1' : '#475569'
                }}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop CTA Button */}
            <a 
              href="#contact" 
              className="hidden md:block bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-lg shadow-violet-600/25 hover:shadow-xl hover:shadow-violet-600/30 transform hover:scale-105"
            >
              Start Project
            </a>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 z-30 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden absolute top-full left-0 right-0 border-b transition-all duration-300 z-40"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderBottomColor: theme === 'dark' ? 'rgba(71, 85, 105, 0.5)' : 'rgba(148, 163, 184, 0.3)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#services" 
                className="block py-3 px-4 rounded-xl hover:text-violet-600 transition-colors font-medium text-lg"
                style={{ 
                  color: theme === 'dark' ? '#cbd5e1' : '#475569',
                  backgroundColor: 'transparent'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#projects" 
                className="block py-3 px-4 rounded-xl hover:text-violet-600 transition-colors font-medium text-lg"
                style={{ 
                  color: theme === 'dark' ? '#cbd5e1' : '#475569',
                  backgroundColor: 'transparent'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </a>
              <a 
                href="#contact" 
                className="block py-3 px-4 rounded-xl hover:text-violet-600 transition-colors font-medium text-lg"
                style={{ 
                  color: theme === 'dark' ? '#cbd5e1' : '#475569',
                  backgroundColor: 'transparent'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="#contact" 
                className="block bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl transition-all duration-300 font-semibold text-center shadow-lg shadow-violet-600/25"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Project
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} id="hero">
            <div 
              className="inline-flex items-center px-3 py-1.5 rounded-full font-medium mb-5 border transition-colors"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(to right, rgba(109, 40, 217, 0.5), rgba(147, 51, 234, 0.5))'
                  : 'linear-gradient(to right, #ede9fe, #f3e8ff)',
                color: theme === 'dark' ? '#c4b5fd' : '#6d28d9',
                borderColor: theme === 'dark' ? 'rgba(124, 58, 237, 0.5)' : '#c4b5fd'
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Web Development
            </div>
            <h1 ref={heroHeadingRef} className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: theme === 'dark' 
                    ? 'linear-gradient(to right, #f1f5f9, #a78bfa, #f1f5f9)'
                    : 'linear-gradient(to right, #0f172a, #5b21b6, #0f172a)'
                }}
              >
                Hi, I&apos;m Monish
              </span>
            </h1>
            <h2 
              ref={heroSubtitleRef}
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: theme === 'dark' ? '#a78bfa' : '#7c3aed' }}
            >
              Full-Stack Developer
            </h2>
            <p 
              ref={heroDescriptionRef}
              className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
              style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
            >
              I build modern websites and applications that help businesses grow online. Clean code, beautiful design, measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#contact" className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 shadow-xl shadow-violet-600/25 hover:shadow-2xl hover:shadow-violet-600/35 transform hover:scale-110 inline-flex items-center justify-center ring-2 ring-violet-500/40">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#projects" 
                className="group backdrop-blur px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center border-2 hover:text-violet-600"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
                  borderColor: theme === 'dark' ? '#475569' : '#cbd5e1',
                  boxShadow: theme === 'dark' 
                    ? '0 25px 50px rgba(0, 0, 0, 0.25)' 
                    : '0 25px 50px rgba(15, 23, 42, 0.1)'
                }}
              >
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
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full font-medium mb-6 border transition-colors"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(to right, rgba(16, 185, 129, 0.5), rgba(6, 182, 212, 0.5))'
                  : 'linear-gradient(to right, #d1fae5, #cffafe)',
                color: theme === 'dark' ? '#6ee7b7' : '#047857',
                borderColor: theme === 'dark' ? 'rgba(16, 185, 129, 0.5)' : '#a7f3d0'
              }}
            >
              <Code className="w-4 h-4 mr-2" />
              What I Build
            </div>
            <h2 
              className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: theme === 'dark'
                  ? 'linear-gradient(to right, #f1f5f9, #cbd5e1)'
                  : 'linear-gradient(to right, #0f172a, #374151)'
              }}
            >
              Excellence in Every Detail
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
            >
              Crafting digital experiences that combine stunning visuals with flawless functionality
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`group backdrop-blur-sm p-10 rounded-3xl border transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: theme === 'dark' ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)',
                  boxShadow: theme === 'dark' 
                    ? '0 25px 50px rgba(0, 0, 0, 0.2)' 
                    : '0 25px 50px rgba(15, 23, 42, 0.05)',
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                >
                  {service.title}
                </h3>
                <p 
                  className="mb-8 text-lg leading-relaxed"
                  style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
                >
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center font-medium"
                      style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
                    >
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
      <section 
        id="projects" 
        className="py-32 px-4 sm:px-6 lg:px-8 relative"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, #1e293b, #0f172a)'
            : 'linear-gradient(to bottom, #f8fafc, #ffffff)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full font-medium mb-6 border transition-colors"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(to right, rgba(59, 130, 246, 0.5), rgba(99, 102, 241, 0.5))'
                  : 'linear-gradient(to right, #dbeafe, #e0e7ff)',
                color: theme === 'dark' ? '#93c5fd' : '#1d4ed8',
                borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : '#bfdbfe'
              }}
            >
              <Star className="w-4 h-4 mr-2" />
              Project Showcase
            </div>
            <h2 
              className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: theme === 'dark'
                  ? 'linear-gradient(to right, #f1f5f9, #cbd5e1)'
                  : 'linear-gradient(to right, #0f172a, #374151)'
              }}
            >
              Project Showcase
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
            >
              Sample websites showcasing different industries and design approaches
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`group rounded-3xl overflow-hidden border transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: theme === 'dark' ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)',
                  boxShadow: theme === 'dark' 
                    ? '0 25px 50px rgba(0, 0, 0, 0.2)' 
                    : '0 25px 50px rgba(15, 23, 42, 0.05)',
                  transitionDelay: `${index * 200}ms`
                }}
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
                  <h3 
                    className="text-2xl font-bold mb-3 group-hover:text-violet-600 transition-colors"
                    style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="mb-6 text-lg leading-relaxed"
                    style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 rounded-full text-sm font-medium border"
                        style={{
                          background: theme === 'dark' 
                            ? 'linear-gradient(to right, #374151, #4b5563)'
                            : 'linear-gradient(to right, #f1f5f9, #e2e8f0)',
                          color: theme === 'dark' ? '#cbd5e1' : '#475569',
                          borderColor: theme === 'dark' ? '#4b5563' : '#cbd5e1'
                        }}
                      >
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
                    <span 
                      className="font-semibold text-lg inline-flex items-center"
                      style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}
                    >
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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Work With Me</h2>
            <p className="text-xl text-purple-200">Numbers that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5+", label: "Technologies Used", icon: <Code className="w-8 h-8 text-white" /> },
              { number: "48hr", label: "Project Delivery", icon: <Zap className="w-8 h-8 text-white" /> },
              { number: "24/7", label: "Availability", icon: <Star className="w-8 h-8 text-white" /> },
              { number: "2hr", label: "Response Time", icon: <Mail className="w-8 h-8 text-white" /> }
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
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full font-medium mb-6 border transition-colors"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(to right, rgba(16, 185, 129, 0.5), rgba(6, 182, 212, 0.5))'
                  : 'linear-gradient(to right, #d1fae5, #cffafe)',
                color: theme === 'dark' ? '#6ee7b7' : '#047857',
                borderColor: theme === 'dark' ? 'rgba(16, 185, 129, 0.5)' : '#a7f3d0'
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Connect with us
            </div>
            <h2 
              className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: theme === 'dark'
                  ? 'linear-gradient(to right, #f1f5f9, #cbd5e1)'
                  : 'linear-gradient(to right, #0f172a, #374151)'
              }}
            >
              Ready to Create Something Amazing?
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
            >
              We would love to discuss your vision and bring it to life with precision and creativity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className={`transform transition-all duration-1000 ${isVisible.contact ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div 
                className="p-10 rounded-3xl border transition-colors"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(to bottom right, rgba(109, 40, 217, 0.2), rgba(147, 51, 234, 0.2))'
                    : 'linear-gradient(to bottom right, #faf5ff, #f3e8ff)',
                  borderColor: theme === 'dark' ? 'rgba(124, 58, 237, 0.5)' : 'rgba(196, 181, 253, 0.5)'
                }}
              >
                <h3 
                  className="text-3xl font-bold mb-8"
                  style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                >
                  Start a Conversation
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div 
                        className="font-bold text-lg mb-1"
                        style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                      >
                        Email
                      </div>
                      <div style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                        hello.monishdev@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div 
                        className="font-bold text-lg mb-1"
                        style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                      >
                        Response Time
                      </div>
                      <div style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                        Within 2 hours, guaranteed
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div 
                        className="font-bold text-lg mb-1"
                        style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                      >
                        Global Service
                      </div>
                      <div style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                        Worldwide project delivery
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-violet-200">
                  <h4 
                    className="font-bold text-lg mb-4"
                    style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                  >
                    Follow the Journey
                  </h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/monish-j" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                        borderColor: theme === 'dark' ? '#475569' : '#cbd5e1'
                      }}
                    >
                      <Github 
                        className="w-5 h-5"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
                      />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/monish-494147213/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                        borderColor: theme === 'dark' ? '#475569' : '#cbd5e1'
                      }}
                    >
                      <Linkedin 
                        className="w-5 h-5"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className={`transform transition-all duration-1000 ${isVisible.contact ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} id="contact">
              <div 
                className="p-10 rounded-3xl shadow-2xl border space-y-6 transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: theme === 'dark' ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)',
                  boxShadow: theme === 'dark' 
                    ? '0 25px 50px rgba(0, 0, 0, 0.2)' 
                    : '0 25px 50px rgba(15, 23, 42, 0.1)'
                }}
              >
                <div>
                  <label 
                    className="block text-sm font-bold mb-3"
                    style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 font-medium ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc',
                      borderColor: formErrors.name ? '#ef4444' : (theme === 'dark' ? '#4b5563' : '#cbd5e1'),
                      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                    }}
                    placeholder="John Smith"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label 
                    className="block text-sm font-bold mb-3"
                    style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                  >Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 font-medium ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc',
                      borderColor: formErrors.email ? '#ef4444' : (theme === 'dark' ? '#4b5563' : '#cbd5e1'),
                      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                    }}
                    placeholder="john@company.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label 
                    className="block text-sm font-bold mb-3"
                    style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                  >Project Type</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 font-medium ${formErrors.project ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc',
                      borderColor: formErrors.project ? '#ef4444' : (theme === 'dark' ? '#4b5563' : '#cbd5e1'),
                      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                    }}
                  >
                    <option value="">Select your project type</option>
                    <option value="portfolio">Premium Portfolio</option>
                    <option value="landing">High-Converting Landing Page</option>
                    <option value="business">Business Website</option>
                    <option value="ecommerce">E-commerce Platform</option>
                    <option value="webapp">Web Application</option>
                    <option value="other">Custom Solution</option>
                  </select>
                  {formErrors.project && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.project}</p>
                  )}
                </div>
                <div>
                  <label 
                    className="block text-sm font-bold mb-3"
                    style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                  >Project Details</label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell me about your vision, goals, and timeline..."
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 font-medium resize-none ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc',
                      borderColor: formErrors.message ? '#ef4444' : (theme === 'dark' ? '#4b5563' : '#cbd5e1'),
                      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                    }}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{formErrors.message}</p>
                  )}
                </div>
                
                {/* Success Message */}
                {formStatus === 'success' && (
                  <div className="p-6 rounded-2xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                      <div>
                        <h4 className="font-bold text-green-800 dark:text-green-300">Message Sent Successfully!</h4>
                        <p className="text-green-700 dark:text-green-400 mt-1">Thank you for reaching out! I&apos;ll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {formStatus === 'error' && (
                  <div className="p-6 rounded-2xl border-2 border-red-500 bg-red-50 dark:bg-red-900/20">
                    <div className="flex items-center">
                      <X className="w-6 h-6 text-red-500 mr-3" />
                      <div>
                        <h4 className="font-bold text-red-800 dark:text-red-300">Something went wrong</h4>
                        <p className="text-red-700 dark:text-red-400 mt-1">Please try again or contact me directly at hello.monishdev@gmail.com</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleSubmit}
                  disabled={formSubmitting}
                  className={`w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl transform ${
                    formSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                      : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-violet-600/25 hover:shadow-2xl hover:shadow-violet-600/35 hover:scale-105'
                  } text-white`}
                >
                  {formSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Project Details'
                  )}
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
              MonishDev
            </div>
          </div>
          <p className="text-slate-400 mb-8 text-lg">
            Crafting digital excellence, one pixel at a time.
          </p>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500">
              © 2025 MonishDev. All rights reserved. Built with passion and precision.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}