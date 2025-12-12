// App.jsx - MODIFIÉ (ajout de la route Certifications)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ProjectDetail from './components/ProjectDetail';
import BlockDetail from './components/BlockDetail';
import Certifications from './components/Certifications'; // Nouveau composant

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
          <Route path="/certifications" element={<Certifications />} /> {/* Nouvelle route */}
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