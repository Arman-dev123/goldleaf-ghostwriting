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
    // Your Railway backend URL
    const BACKEND_URL = "https://goldleaf-ghostwriting-production.up.railway.app";

    fetch(`${BACKEND_URL}/db-test`)
      .then(res => res.json())
      .then(data => {
        if (data.db === "connected") setDbStatus("✅ Database Connected");
        else setDbStatus("❌ DB Error");
      })
      .catch(err => {
        console.error("Error connecting to backend:", err);
        setDbStatus("❌ Connection Failed");
      });
  }, []);

  return (
    <div>
      {/* DB status display */}
      <p style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        Backend DB Status: {dbStatus}
      </p>

      {/* Your existing routing */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
