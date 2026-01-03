// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   Menu, X, Calendar, Clock, User, Mail, 
//   MessageSquare, Phone, ShieldCheck, CheckCircle2 
// } from 'lucide-react';

// import logo1 from '../assets/logo1.jpg'; 

// const Quote = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     service_type: 'Ghostwriting',
//     genre: '',
//     word_count: '',
//     message: '',
//     meeting_date: '',
//     meeting_time: ''
//   });

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Prevent booking past dates
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const timeSlots = [
//     '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage('');
//     setErrorMessage('');
//     setIsSubmitting(true);

//     try {
//       const submissionData = {
//         ...formData,
//         meeting_time: formData.meeting_time + ':00'
//       };
//       // Note: Ensure your Flask server has Flask-CORS enabled
//       await axios.post('http://127.0.0.1:5000/api/schedule-meeting', submissionData);
//       setSuccessMessage('✓ Your consultation has been reserved successfully.');
//       setFormData({ name: '', email: '', service_type: 'Ghostwriting', genre: '', word_count: '', message: '', meeting_date: '', meeting_time: '' });
//     } catch (err) {
//       setErrorMessage('Submission failed. Ensure your backend server is running and CORS is enabled.');
//       console.error("API Error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] font-sans text-slate-900">
      
//       {/* --- NAVIGATION --- */}
//       <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
//         isScrolled ? 'bg-white/95 backdrop-blur-md py-3 border-slate-100 shadow-sm' : 'bg-white py-5 border-transparent'
//       }`}>
//         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//           <Link to="/" className="flex items-center gap-3 group">
//             <img 
//               src={logo1} 
//               alt="Gold Leaf Logo" 
//               className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
//             />
//           </Link>

//           <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
//             <Link to="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
//             <Link to="/services" className="hover:text-[#C5A059] transition-colors">Services</Link>
//             <Link to="/process" className="hover:text-[#C5A059] transition-colors">Process</Link>
//             <Link to="/quote" className="px-5 py-2 bg-[#C5A059] text-white rounded-sm hover:bg-slate-900 transition-all shadow-md">Get a Quote</Link>
//           </div>

//           <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </nav>

//       {/* --- FORM SECTION --- */}
//       <div className="pt-40 pb-20 px-6">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-0 shadow-2xl rounded-sm overflow-hidden bg-white border border-slate-100">
          
//           <div className="md:col-span-5 bg-[#C5A059] p-12 text-white flex flex-col justify-between">
//             <div className="relative z-10">
//               <h2 className="text-4xl font-serif font-bold mb-6 italic tracking-tight leading-tight">Secure Your <br/>Legacy.</h2>
//               <p className="text-white/80 font-light leading-relaxed mb-12">
//                 Reserved for visionaries. Book a private consultation to discuss your manuscript in total confidence.
//               </p>

//               <div className="space-y-8">
//                 <div className="flex items-start gap-4">
//                   <div className="p-2 bg-white/10 rounded-sm"><Phone size={20} /></div>
//                   <div>
//                     <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Private Line</p>
//                     <p className="text-lg font-medium">0308-3255440</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="p-2 bg-white/10 rounded-sm"><ShieldCheck size={20} /></div>
//                   <div>
//                     <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Security</p>
//                     <p className="text-sm">Full NDA Protection Guaranteed</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-7 p-12 bg-white">
//             {successMessage && (
//               <div className="mb-6 p-4 bg-green-50 text-green-700 border-l-4 border-green-500 flex items-center gap-2">
//                 <CheckCircle2 size={18} /> {successMessage}
//               </div>
//             )}
//             {errorMessage && (
//               <div className="mb-6 p-4 bg-red-50 text-red-700 border-l-4 border-red-500">
//                 {errorMessage}
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Full Name</label>
//                   <input 
//                     type="text" name="name" value={formData.name} onChange={handleChange} required
//                     className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Email</label>
//                   <input 
//                     type="email" name="email" value={formData.email} onChange={handleChange} required
//                     className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none transition-all"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Date</label>
//                   <input 
//                     type="date" 
//                     name="meeting_date" 
//                     min={today} // Prevents selecting past dates
//                     value={formData.meeting_date} 
//                     onChange={handleChange} 
//                     required
//                     className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none" 
//                   />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Time Slot</label>
//                   <select 
//                     name="meeting_time" value={formData.meeting_time} onChange={handleChange} required
//                     className="w-full border-b border-slate-200 py-2 bg-transparent focus:border-[#C5A059] outline-none"
//                   >
//                     <option value="">Select Time</option>
//                     {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Project Brief</label>
//                 <textarea 
//                   name="message" value={formData.message} onChange={handleChange} required
//                   rows="2"
//                   className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none resize-none"
//                 />
//               </div>

//               <button 
//                 type="submit" disabled={isSubmitting}
//                 className="w-full py-4 bg-slate-900 text-white font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-[#C5A059] transition-all shadow-lg active:scale-95 disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Reserving...' : 'Confirm Consultation'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quote;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Menu, X, Calendar, Clock, User, Mail, 
  MessageSquare, Phone, ShieldCheck, CheckCircle2, Check 
} from 'lucide-react';

import logo1 from '../assets/logo1.jpg'; 

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service_type: 'Ghostwriting', // Matches backend validation
    genre: '',
    word_count: '',
    message: '',
    meeting_date: '',
    meeting_time: ''
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Standardize time for backend validation
      const submissionData = {
        ...formData,
        meeting_time: formData.meeting_time.includes(':00') 
          ? formData.meeting_time 
          : `${formData.meeting_time}:00`
      };

      await axios.post('http://127.0.0.1:5000/api/schedule-meeting', submissionData);
      
      setShowSuccessModal(true);
      setFormData({ name: '', email: '', service_type: 'Ghostwriting', genre: '', word_count: '', message: '', meeting_date: '', meeting_time: '' });
    } catch (err) {
      const errorDetail = err.response?.data?.error || 'Submission failed. Check your connection.';
      setErrorMessage(errorDetail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-slate-900 selection:bg-[#C5A059] selection:text-white">
      
      {/* --- DUAL LAYER NAVIGATION --- */}
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

      {/* --- FORM SECTION --- */}
      <div className="pt-48 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-0 shadow-[0_50px_100px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden bg-white border border-slate-100">
          
          {/* Sidebar */}
          <div className="md:col-span-5 bg-[#C5A059] p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-serif font-bold mb-6 italic tracking-tight leading-tight">Begin Your <br/>Legacy.</h2>
              <p className="text-white/80 font-light leading-relaxed mb-12">
                Reserved for visionaries. Book a private consultation to discuss your manuscript in total confidence.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-xl"><Phone size={20} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Private Line</p>
                    <p className="text-lg font-medium">0308-3255440</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-xl"><ShieldCheck size={20} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Security</p>
                    <p className="text-sm">Full NDA Protection Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background design element */}
            <div className="absolute -bottom-10 -right-10 text-white/5 font-serif font-bold text-9xl italic select-none">GL</div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7 p-12 bg-white">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 animate-in slide-in-from-top-2">
                <p className="text-xs font-bold uppercase tracking-tight mb-1">Error</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2 group-focus-within:text-[#C5A059]">Full Name</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="Enter your name"
                    className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none transition-all placeholder:text-slate-200"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2 group-focus-within:text-[#C5A059]">Email Address</label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="example@domain.com"
                    className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none transition-all placeholder:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2 group-focus-within:text-[#C5A059]">Service Required</label>
                  <select 
                    name="service_type" value={formData.service_type} onChange={handleChange} required
                    className="w-full border-b border-slate-200 py-2 bg-transparent focus:border-[#C5A059] outline-none"
                  >
                    <option value="Ghostwriting">Ghostwriting</option>
                    <option value="Book Design">Book Design</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2 group-focus-within:text-[#C5A059]">Genre / Category</label>
                  <input 
                    type="text" name="genre" value={formData.genre} onChange={handleChange}
                    placeholder="e.g. Memoir, Business"
                    className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none transition-all placeholder:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Preferred Date</label>
                  <input 
                    type="date" name="meeting_date" min={today} value={formData.meeting_date} onChange={handleChange} required
                    className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Preferred Time (EST)</label>
                  <select 
                    name="meeting_time" value={formData.meeting_time} onChange={handleChange} required
                    className="w-full border-b border-slate-200 py-2 bg-transparent focus:border-[#C5A059] outline-none"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Project Description</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} required
                  rows="2"
                  placeholder="Tell us about your story..."
                  className="w-full border-b border-slate-200 py-2 focus:border-[#C5A059] outline-none resize-none placeholder:text-slate-200"
                />
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full py-5 bg-slate-900 text-white font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-[#C5A059] transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Reserving Your Legacy...' : 'Confirm Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- SUCCESS MODAL --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-12 text-center shadow-3xl border border-[#C5A059]/20 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#C5A059]/30">
              <Check className="text-white" size={40} strokeWidth={3} />
            </div>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 italic leading-tight">Legacy Reserved.</h3>
            <p className="text-slate-500 font-light leading-relaxed mb-8">
              Your consultation is secured. A confirmation email has been sent. We look forward to authoring your story.
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-[#C5A059] transition-all uppercase tracking-widest text-[10px]"
            >
              Return to Site
            </button>
          </div>
        </div>
      )}

      <footer className="py-12 bg-white text-center border-t border-slate-50">
          <p className="text-slate-400 text-[9px] tracking-[0.3em] font-medium uppercase italic">
            © 2026 Gold Leaf Ghostwriting — Crafted for Excellence
          </p>
      </footer>
    </div>
  );
};

export default Quote;