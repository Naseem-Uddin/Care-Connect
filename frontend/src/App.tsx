import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/register';
//import Login from './pages/login';

const Home = () => (
  <div className="simple-page">
    <h2>Home Page</h2>
  </div>
);

function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  useEffect(() => {
    fetch('/api/v1/auth/login-test')
      .then((res) => {
        if (!res.ok) throw new Error('Backend reachable but returned an error');
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage('Backend not reachable. Check if Uvicorn is running!');
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <header className="site-header">
          <span className="site-brand">Care Connect</span>
          <nav className="site-nav" aria-label="Primary">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>

        <div className="backend-status" role="status">
          <strong>Backend:</strong> {message}
        </div>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
