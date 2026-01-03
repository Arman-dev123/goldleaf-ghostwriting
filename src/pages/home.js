import books from "../assets/shelf.jpg";
import logo1 from '../assets/logo1.jpg'; 



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  BookOpen, 
  Palette, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  PenTool, 
  Rocket, 
  CheckCircle2,
  Star
} from 'lucide-react';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- MINIMALIST NAV --- */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md py-4 border-slate-100 shadow-sm' 
          : 'bg-white py-6 border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logo1} 
              alt="Gold Leaf Logo" 
              className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/services" className="text-sm font-semibold tracking-wide text-slate-600 hover:text-[#C5A059] transition-colors">
              Services
            </Link>
            <Link to="/quote" className="text-sm font-semibold tracking-wide text-slate-600 hover:text-[#C5A059] transition-colors">
              Contact Us
            </Link>
            <Link 
              to="/quote" 
              className="px-6 py-2.5 bg-[#C5A059] text-white font-bold rounded-sm hover:bg-[#B38F4D] transition-all shadow-md active:scale-95"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="text-slate-900 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-8 flex flex-col gap-6 md:hidden shadow-xl animate-fade-in">
            <Link to="/services" className="text-slate-800 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <Link to="/quote" className="text-slate-800 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            <Link to="/quote" className="bg-[#C5A059] text-white text-center py-4 font-bold rounded-sm" onClick={() => setIsMobileMenuOpen(false)}>GET A QUOTE</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center bg-[#FAF9F6] overflow-hidden border-b border-slate-100">
        {/* Subtle Decorative Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#C5A059]/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[5%] left-[-5%] w-[30%] h-[30%] bg-[#C5A059]/10 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 pt-20">
          <div className="text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#C5A059]"></div>
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] font-bold">The Gold Standard of Writing</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 leading-tight">
              Your Story, <br />
              <span className="text-[#C5A059] italic">Masterfully Told.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-light">
              Bespoke ghostwriting and publishing services for entrepreneurs, visionaries, and storytellers. We turn your legacy into literature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/quote"
                className="px-10 py-4 bg-[#C5A059] text-white font-bold rounded-sm flex items-center justify-center gap-2 hover:bg-[#B38F4D] transition-all shadow-lg"
              >
                Request a Quote
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/services"
                className="px-10 py-4 bg-transparent border border-[#C5A059] text-[#C5A059] font-bold rounded-sm hover:bg-[#C5A059]/5 transition-all"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* --- HERO IMAGE SLOT --- */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-[4/5] bg-white p-4 shadow-2xl rounded-sm border border-slate-100">
              <div className="h-full w-full overflow-hidden relative">
                <img
    src={books}
    alt="High-end writing workspace"
    className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
  />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
              
              {/* Achievement Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-2xl border-l-4 border-[#C5A059] hidden md:block">
                 <div className="flex gap-1 text-[#C5A059] mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
                 <p className="text-sm font-serif italic text-slate-800">"An exceptional literary <br/>partner."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Books Published", value: "500+" },
            { label: "Bestsellers", value: "85" },
            { label: "Client Privacy", value: "100%" },
            { label: "Success Rate", value: "98%" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-serif font-bold text-[#C5A059] mb-2">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES (WHITE THEME) --- */}
      <section className="py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">Expert Services</h2>
            <div className="h-[2px] w-12 bg-[#C5A059]"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "Ghostwriting", 
                icon: <PenTool className="text-[#C5A059]" />, 
                desc: "Your voice, our pen. We create industry-leading manuscripts that resonate with your audience." 
              },
              { 
                title: "Publishing Management", 
                icon: <Rocket className="text-[#C5A059]" />, 
                desc: "End-to-end management of your Amazon KDP presence, from distribution to category strategy." 
              },
              { 
                title: "Author Branding", 
                icon: <Palette className="text-[#C5A059]" />, 
                desc: "Bespoke book cover designs and author websites that define your professional legacy." 
              }
            ].map((s, i) => (
              <div key={i} className="group p-10 bg-white border border-slate-100 rounded-sm hover:shadow-xl transition-all">
                <div className="mb-6 inline-block p-4 bg-[#FAF9F6] rounded-sm group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 text-slate-900">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 px-6 bg-[#C5A059] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Your legacy deserves <br/> more than a drawer.</h2>
          <p className="text-xl text-white/80 mb-12 font-light">
            Book a confidential consultation today to discuss your manuscript.
          </p>
          <Link
            to="/quote"
            className="inline-block px-12 py-5 bg-white text-[#C5A059] font-black tracking-widest rounded-sm hover:shadow-2xl transition-all uppercase text-sm"
          >
            Start Your Journey
          </Link>
        </div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-16 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="text-xl font-serif font-bold text-slate-900">
              GOLD <span className="text-[#C5A059]">LEAF</span>
            </span>
            <p className="text-slate-400 text-[10px] mt-2 tracking-widest font-bold uppercase">Bespoke Publishing Agency</p>
          </div>
          
          <div className="flex gap-10 text-slate-500 text-xs font-bold tracking-widest uppercase">
            <Link to="/services" className="hover:text-[#C5A059]">Services</Link>
            <Link to="/quote" className="hover:text-[#C5A059]">Contact</Link>
            <Link to="/quote" className="hover:text-[#C5A059]">Privacy</Link>
          </div>
          
          <div className="text-slate-400 text-[10px] tracking-widest font-medium md:text-right">
            © 2026 GOLD LEAF GHOSTWRITING. <br/>ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;


