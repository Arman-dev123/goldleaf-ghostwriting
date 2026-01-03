import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-amber-600">
            GOLD<span className="text-slate-900">LEAF</span>
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className={`text-sm font-medium transition-colors hover:text-amber-600 ${isActive('/') ? 'text-amber-600' : 'text-slate-600'}`}>Home</Link>
          <Link to="/services" className={`text-sm font-medium transition-colors hover:text-amber-600 ${isActive('/services') ? 'text-amber-600' : 'text-slate-600'}`}>Services</Link>
          <Link to="/process" className={`text-sm font-medium transition-colors hover:text-amber-600 ${isActive('/process') ? 'text-amber-600' : 'text-slate-600'}`}>Process</Link>
          <Link to="/quote" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-amber-600 transition-all transform hover:scale-105">
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;