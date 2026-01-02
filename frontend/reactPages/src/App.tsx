import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Register from './register';
// Simple components for demonstration
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;

function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* Use Link instead of <a href="..."> */}
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={< Register/>} />
        <Route path="/login" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;