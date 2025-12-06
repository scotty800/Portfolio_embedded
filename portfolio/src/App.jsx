// App.jsx - CODE COMPLET
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ProjectDetail from './components/ProjectDetail';
import BlockDetail from './components/BlockDetail';

function App() {
  const [activeSection, setActiveSection] = React.useState('home');

  return (
    <Router>
      <div className="App">
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/project/:projectId/block/:blockId" element={<BlockDetail />} />
          {/* Redirection par défaut */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;