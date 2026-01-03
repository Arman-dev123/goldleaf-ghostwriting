import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageCircle, FileText, PenTool, Rocket, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Process = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { 
      title: "Strategic Consultation", 
      desc: "Every great book begins with a conversation. We dive deep into your vision and the core message you wish to leave behind.", 
      expanded: "You'll collaborate closely with our experts to refine your ideas, identify your target audience, and establish the unique voice that will resonate with readers.",
      icon: <MessageCircle className="w-6 h-6" />,
      number: "01",
      image: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80"
    },
    { 
      title: "Manuscript Blueprint", 
      desc: "Our architects map out your story, creating a comprehensive outline that ensures every chapter serves your ultimate goal.", 
      expanded: "We build a detailed chapter-by-chapter structure, incorporating your feedback at every stage to align perfectly with your vision.",
      icon: <FileText className="w-6 h-6" />,
      number: "02",
      image: "https://images.unsplash.com/photo-1513475380706-6f1107cdaaf6?auto=format&fit=crop&q=80" // Better planning image (people with notes/laptop)
    },
    { 
      title: "The Iterative Craft", 
      desc: "Our elite ghostwriters breathe life into your ideas. You receive regular drafts, ensuring the voice is unmistakably yours.", 
      expanded: "Through multiple rounds of revisions and direct collaboration, we perfect the manuscript until it feels authentically you.",
      icon: <PenTool className="w-6 h-6" />,
      number: "03",
      image: "https://images.unsplash.com/photo-1455391727115-907fd4c000b9?auto=format&fit=crop&q=80" // Writing/typing focused alternative
    },
    { 
      title: "Design & Global Launch", 
      desc: "We manage the technical complexity of publishing. Your book is released with world-class cover art and global distribution.", 
      expanded: "Professional editing, stunning cover design, formatting, and strategic launch across Amazon, bookstores, and digital platforms.",
      icon: <Rocket className="w-6 h-6" />,
      number: "04",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80"
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#C5A059] selection:text-white overflow-x-hidden">
      {/* --- MINIMALIST NAV (unchanged) --- */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-3 border-slate-100' : 'bg-white py-5 border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-serif font-bold tracking-tight">
            GOLD <span className="text-[#C5A059]">LEAF</span>
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

  {/* 3. Contact Us Link */}
  <Link to="/quote" className="text-sm font-semibold text-slate-600 hover:text-[#C5A059] transition-colors">
    Contact Us
  </Link>

  {/* 4. CTA Button */}
  <Link to="/quote" className="px-6 py-2.5 bg-[#C5A059] text-white font-bold rounded-sm hover:bg-[#B38F4D] transition-all">
    Get a Quote
  </Link>
</div>
        </div>
      </nav>

      {/* --- COMPACT HEADER with subtle animation --- */}
      <header className="pt-32 pb-20 bg-[#FAF9F6]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <p className="text-[#C5A059] uppercase tracking-[0.4em] text-[9px] font-bold mb-3">Our Proven Methodology</p>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 italic mb-6">Your Idea. Your Voice. Your Bestseller.</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">A collaborative, transparent process designed to make authoring your book effortless and exciting.</p>
          <ChevronDown className="mx-auto text-[#C5A059] animate-bounce" size={32} />
        </motion.div>
      </header>

      {/* --- INTERACTIVE ACCORDION-STYLE STEPS --- */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {steps.map((step, index) => (
          <motion.section 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-12 last:mb-0"
          >
            <div 
              className="bg-white border border-slate-100 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              {/* Header Row */}
              <div className="flex items-center p-8 gap-8">
                <div className="flex-shrink-0">
                  <div className="relative aspect-square w-48 overflow-hidden rounded-sm">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 hover:scale-110 transition-all duration-700"
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-serif italic text-[#C5A059]/30">{step.number}</span>
                    <div className="p-3 bg-[#C5A059]/10 text-[#C5A059] rounded-sm">
                      {step.icon}
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: activeStep === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-[#C5A059]" size={28} />
                  </motion.div>
                </div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {activeStep === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-4 border-t border-slate-100">
                      <p className="text-base text-slate-500 leading-relaxed max-w-3xl mb-6">
                        {step.expanded}
                      </p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-start gap-3 text-slate-600">
                          <ArrowRight className="text-[#C5A059] flex-shrink-0 mt-1" size={18} />
                          <span>You provide input and feedback at every milestone</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-600">
                          <ArrowRight className="text-[#C5A059] flex-shrink-0 mt-1" size={18} />
                          <span>Unlimited revisions until you're 100% satisfied</span>
                        </li>
                        <li className="flex items-start gap-3 text-slate-600">
                          <ArrowRight className="text-[#C5A059] flex-shrink-0 mt-1" size={18} />
                          <span>Full ownership and royalties belong to you</span>
                        </li>
                      </ul>
                      <Link 
                        to="/quote" 
                        className="inline-flex items-center gap-3 px-6 py-3 bg-[#C5A059] text-white font-bold uppercase tracking-wider text-xs rounded-sm hover:bg-slate-900 transition-all"
                      >
                        Start This Step Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        ))}
      </main>

      {/* --- ENHANCED CTA SECTION --- */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#FAF9F6] to-white text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <ShieldCheck className="text-[#C5A059] mx-auto mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 italic">Imagine Holding Your Published Book in 6-12 Months</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Thousands of aspiring authors never finish their book. With our proven process and dedicated team, your legacy is guaranteed.
          </p>
          <Link 
            to="/quote" 
            className="inline-block px-12 py-5 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-[#C5A059] hover:scale-105 transition-all shadow-xl"
          >
            Begin Your Journey Today
          </Link>
        </motion.div>
      </section>

      {/* --- FOOTER (unchanged) --- */}
      <footer className="py-10 bg-white text-center border-t border-slate-50">
        <p className="text-slate-400 text-[10px] tracking-[0.3em] font-medium uppercase">
          © 2026 Gold Leaf Ghostwriting
        </p>
      </footer>
    </div>
  );
};

export default Process;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X, ArrowRight, MessageCircle, FileText, PenTool, Rocket, ShieldCheck } from 'lucide-react';

// const Process = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [hoveredStep, setHoveredStep] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const steps = [
//     { 
//       title: "Strategic Consultation", 
//       desc: "Every great book begins with a conversation. We dive deep into your vision and the core message you wish to leave behind.", 
//       icon: <MessageCircle className="w-5 h-5" />,
//       number: "01",
//       image: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80",
//       details: ["90-minute discovery call", "Audience analysis", "Brand positioning strategy"]
//     },
//     { 
//       title: "Manuscript Blueprint", 
//       desc: "Our architects map out your story, creating a comprehensive outline that ensures every chapter serves your ultimate goal.", 
//       icon: <FileText className="w-5 h-5" />,
//       number: "02",
//       image: "https://images.unsplash.com/photo-1455391727115-1a6c0a891463?auto=format&fit=crop&q=80",
//       details: ["Detailed chapter outline", "Story arc development", "Key message framework"]
//     },
//     { 
//       title: "The Iterative Craft", 
//       desc: "Our elite ghostwriters breathe life into your ideas. You receive regular drafts, ensuring the voice is unmistakably yours.", 
//       icon: <PenTool className="w-5 h-5" />,
//       number: "03",
//       image: "https://images.unsplash.com/photo-1473186578172-c141e6798ee4?auto=format&fit=crop&q=80",
//       details: ["Weekly progress updates", "Unlimited revisions", "Your voice, perfected"]
//     },
//     { 
//       title: "Design & Global Launch", 
//       desc: "We manage the technical complexity of publishing. Your book is released with world-class cover art and global distribution.", 
//       icon: <Rocket className="w-5 h-5" />,
//       number: "04",
//       image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80",
//       details: ["Professional cover design", "Amazon optimization", "Multi-format publishing"]
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#C5A059] selection:text-white">
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//           opacity: 0;
//         }
//       `}</style>

//       {/* --- MINIMALIST NAV --- */}
//       <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
//         isScrolled ? 'bg-white/95 backdrop-blur-md py-3 border-slate-100' : 'bg-white py-5 border-transparent'
//       }`}>
//         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//           <Link to="/" className="text-xl font-serif font-bold tracking-tight">
//             GOLD <span className="text-[#C5A059]">LEAF</span>
//           </Link>
//           <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
//             <Link to="/services" className="hover:text-[#C5A059] transition-colors">Services</Link>
//             <Link to="/quote" className="hover:text-[#C5A059] transition-colors">Contact</Link>
//             <Link to="/quote" className="px-5 py-2 bg-[#C5A059] text-white rounded-sm hover:bg-slate-900 transition-all">Quote</Link>
//           </div>
//         </div>
//       </nav>

//       {/* --- COMPACT HEADER --- */}
//       <header className="pt-32 pb-16 bg-[#FAF9F6]">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <p className="text-[#C5A059] uppercase tracking-[0.4em] text-[9px] font-bold mb-3">Our Methodology</p>
//           <h1 className="text-4xl md:text-5xl font-serif text-slate-900 italic mb-4">From Idea to Amazon</h1>
//           <div className="w-16 h-[1px] bg-[#C5A059] mx-auto opacity-50"></div>
//         </div>
//       </header>

//       {/* --- INTERACTIVE TIMELINE --- */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           {/* Progress Line */}
//           <div className="relative mb-20">
//             <div className="absolute top-12 left-0 right-0 h-[2px] bg-slate-100">
//               <div 
//                 className="h-full bg-[#C5A059] transition-all duration-700 ease-out"
//                 style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
//               ></div>
//             </div>
            
//             {/* Step Indicators */}
//             <div className="relative flex justify-between">
//               {steps.map((step, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveStep(index)}
//                   onMouseEnter={() => setHoveredStep(index)}
//                   onMouseLeave={() => setHoveredStep(null)}
//                   className="group flex flex-col items-center"
//                 >
//                   <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-500 cursor-pointer ${
//                     activeStep === index 
//                       ? 'bg-[#C5A059] text-white scale-110 shadow-2xl' 
//                       : activeStep > index
//                       ? 'bg-[#C5A059]/30 text-[#C5A059]'
//                       : 'bg-slate-50 text-slate-400'
//                   } ${hoveredStep === index ? 'scale-105 shadow-xl' : ''}`}>
//                     <div className="scale-150">{step.icon}</div>
//                   </div>
//                   <span className={`text-xs font-bold tracking-wider transition-colors ${
//                     activeStep === index ? 'text-[#C5A059]' : 'text-slate-400'
//                   }`}>
//                     STEP {step.number}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Active Step Content */}
//           <div className="bg-[#FAF9F6] rounded-sm p-12 min-h-[500px] shadow-2xl border border-slate-100">
//             <div className="flex flex-col md:flex-row gap-12 items-center">
//               {/* Image */}
//               <div className="w-full md:w-1/2">
//                 <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl group">
//                   <img 
//                     src={steps[activeStep].image}
//                     alt={steps[activeStep].title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
//                   <div className="absolute top-6 left-6">
//                     <span className="text-8xl font-serif italic text-white/20 font-bold">
//                       {steps[activeStep].number}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="w-full md:w-1/2">
//                 <div className="mb-6">
//                   <div className="inline-block p-3 bg-[#C5A059]/10 text-[#C5A059] rounded-sm mb-4">
//                     <div className="scale-125">{steps[activeStep].icon}</div>
//                   </div>
//                   <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
//                     {steps[activeStep].title}
//                   </h2>
//                   <p className="text-lg text-slate-600 leading-relaxed mb-8">
//                     {steps[activeStep].desc}
//                   </p>
//                 </div>

//                 {/* Details List */}
//                 <div className="space-y-3 mb-8">
//                   {steps[activeStep].details.map((detail, idx) => (
//                     <div 
//                       key={idx}
//                       className="flex items-center gap-3 text-slate-700 animate-fadeIn"
//                       style={{ animationDelay: `${idx * 100}ms` }}
//                     >
//                       <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
//                       <span className="text-sm font-medium">{detail}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
//                     disabled={activeStep === 0}
//                     className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-sm hover:border-[#C5A059] hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-wider"
//                   >
//                     ← Previous
//                   </button>
//                   {activeStep < steps.length - 1 ? (
//                     <button
//                       onClick={() => setActiveStep(activeStep + 1)}
//                       className="px-6 py-3 bg-[#C5A059] text-white rounded-sm hover:bg-slate-900 transition-all font-bold text-xs uppercase tracking-wider flex items-center gap-2"
//                     >
//                       Next Step <ArrowRight className="w-4 h-4" />
//                     </button>
//                   ) : (
//                     <Link
//                       to="/quote"
//                       className="px-6 py-3 bg-slate-900 text-white rounded-sm hover:bg-[#C5A059] transition-all font-bold text-xs uppercase tracking-wider flex items-center gap-2"
//                     >
//                       Start My Project <ArrowRight className="w-4 h-4" />
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- TIMELINE SUMMARY --- */}
//       <section className="py-16 px-6 bg-slate-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <p className="text-[#C5A059] uppercase tracking-[0.4em] text-[9px] font-bold mb-3">Average Timeline</p>
//           <h3 className="text-3xl font-serif text-slate-900 mb-12 italic">From First Call to Published Author</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { label: "Consultation", time: "Week 1" },
//               { label: "Blueprint", time: "Weeks 2-3" },
//               { label: "Writing", time: "Weeks 4-12" },
//               { label: "Launch", time: "Weeks 13-14" }
//             ].map((phase, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-sm shadow-sm hover:shadow-xl transition-all cursor-default border border-slate-100">
//                 <p className="text-2xl font-serif font-bold text-[#C5A059] mb-2">{phase.time}</p>
//                 <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">{phase.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- SLIM FOOTER CTA --- */}
//       <section className="py-20 px-6 bg-[#FAF9F6] text-center border-t border-slate-100">
//         <div className="max-w-2xl mx-auto">
//           <ShieldCheck className="text-[#C5A059] mx-auto mb-4" size={28} />
//           <h2 className="text-2xl font-serif text-slate-900 mb-8 italic">Ready to Author Your Legacy?</h2>
//           <Link 
//             to="/quote" 
//             className="inline-block px-10 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#C5A059] transition-all"
//           >
//             Start My Project
//           </Link>
//         </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <footer className="py-10 bg-white text-center border-t border-slate-50">
//           <p className="text-slate-400 text-[10px] tracking-[0.3em] font-medium uppercase">
//             © 2026 Gold Leaf Ghostwriting
//           </p>
//       </footer>
//     </div>
//   );
// };

// export default Process;