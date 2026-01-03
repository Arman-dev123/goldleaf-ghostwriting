import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, PenTool, Palette, 
  Globe, ShieldCheck, Check, Sparkles 
} from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetQuote = (service) => {
    navigate('/quote', { state: { service_type: service } });
  };

  const services = [
    {
      id: 'Ghostwriting',
      title: "Premium Ghostwriting",
      icon: <PenTool className="w-8 h-8" />,
      desc: "Our master writers capture your unique voice and transform your ideas into industry-leading manuscripts.",
      features: ["Fiction & Non-Fiction", "Deep Voice Matching", "Strict NDA Confidentiality", "Developmental Editing"],
      accent: "bg-[#C5A059]"
    },
    {
      id: 'Book Design',
      title: "Bespoke Book Design",
      icon: <Palette className="w-8 h-8" />,
      desc: "Award-winning visual storytelling through custom cover art and exquisite interior typography.",
      features: ["Custom Cover Illustration", "Print-Ready Formatting", "3D Marketing Mockups", "Kindle Optimization"],
      accent: "bg-[#C5A059]"
    },
    {
      id: 'Web Design',
      title: "Author Brand Hubs",
      icon: <Globe className="w-8 h-8" />,
      desc: "High-conversion digital ecosystems designed to showcase your literary legacy and capture readers.",
      features: ["SEO Optimized Landing Pages", "Email List Integration", "Responsive Mobile Design", "Bestseller Marketing Kits"],
      accent: "bg-[#C5A059]"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- SHARED NAV --- */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-4 border-slate-100 shadow-sm' : 'bg-white py-6 border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">
              GOLD <span className="text-[#C5A059]">LEAF</span>
            </span>
          </Link>
         <div className="hidden md:flex items-center gap-10">
  {/* 1. Home Link (pointing to root) */}
  <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-[#C5A059] transition-colors">
    Home
  </Link>

  {/* 2. Services Link */}
  <Link to="/services" className="text-sm font-semibold text-slate-600 hover:text-[#C5A059] transition-colors">
    Services
  </Link>

{/* 2. Process Link */}
  <Link to="/Process" className="text-sm font-semibold text-slate-600 hover:text-[#C5A059] transition-colors">
    Process
  </Link>

  {/* 3. Contact Us Link */}
  <Link to="/quote" className="text-sm font-semibold text-slate-600 hover:text-[#C5A059] transition-colors">
    Contact Us
  </Link>

  {/* 4. CTA Button */}
  <Link to="/quote" className="px-6 py-2.5 bg-[#C5A059] text-white font-bold rounded-sm hover:bg-[#B38F4D] transition-all">
    Get a Quote
  </Link>
</div>
          <button className="text-slate-900 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* --- PAGE HEADER --- */}
      <section className="pt-40 pb-20 bg-[#FAF9F6] border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#C5A059]" />
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-[10px] font-bold">World-Class Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 italic">Excellence in Every Chapter</h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            From the first word to the final publication, we provide the expert support required to turn your vision into a global bestseller.
          </p>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-white p-10 rounded-sm border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
            >
              {/* Hover Accent Line */}
              <div className="absolute top-0 left-0 w-full h-0 group-hover:h-2 bg-[#C5A059] transition-all duration-300"></div>
              
              <div className="mb-8 p-4 bg-[#FAF9F6] inline-block rounded-sm text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-300 self-start">
                {service.icon}
              </div>

              <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900 group-hover:text-[#C5A059] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light italic">
                {service.desc}
              </p>

              <div className="space-y-4 mb-10">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                    <Check size={14} className="text-[#C5A059]" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleGetQuote(service.id)}
                className="mt-auto group/btn w-full py-4 border border-slate-200 text-slate-800 font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] transition-all flex items-center justify-center gap-2"
              >
                Get a Quote
                <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONFIDENTIALITY BANNER --- */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#FAF9F6] border border-slate-100 p-12 text-center flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h4 className="text-xl font-serif font-bold mb-2 flex items-center gap-2 text-slate-900">
              <ShieldCheck className="text-[#C5A059]" />
              Strict NDA Protection
            </h4>
            <p className="text-slate-500 text-sm font-light">Your intellectual property is sacred. We provide full legal confidentiality for every project.</p>
          </div>
          <Link to="/quote" className="text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:underline">
            Review Our Privacy Standards &rarr;
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-12 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-serif font-bold text-slate-900">
            GOLD <span className="text-[#C5A059]">LEAF</span>
          </span>
          <p className="text-slate-400 text-[10px] tracking-widest">© 2026 GOLD LEAF GHOSTWRITING. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}

export default Services;