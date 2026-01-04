// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/home';
// import Quote from './pages/Quote';
// import Services from './pages/Services';
// import Process from './pages/Process';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/quote" element={<Quote />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/process" element={<Process />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Quote from './pages/Quote';
import Services from './pages/Services';
import Process from './pages/Process';

function App() {
  const [dbStatus, setDbStatus] = useState("Checking...");

  useEffect(() => {
    // Note: I removed the extra slash logic to prevent double slashes
    const BACKEND_URL = "https://goldleaf-ghostwriting-production.up.railway.app";

    fetch(`${BACKEND_URL}/db-test`)
      .then(res => {
        if (!res.ok) {
            throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.db === "connected") setDbStatus("✅ Database Connected");
        else setDbStatus("❌ DB Error");
      })
      .catch(err => {
        console.error("Connection Error:", err);
        setDbStatus("❌ Connection Failed (Check Console)");
      });
  }, []);

  return (
    <Router>
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, fontSize: '12px' }}>
        <p style={{ margin: 0, padding: '5px', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
          Backend DB Status: {dbStatus}
        </p>
      </div>
      
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