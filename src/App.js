import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Quote from './pages/Quote';
import Services from './pages/Services';
import Process from './pages/Process';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
      </Routes>
    </Router>
  );
}

export default App;
