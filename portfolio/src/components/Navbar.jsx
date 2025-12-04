// components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'projects', label: 'Projets' },
    { id: 'skills', label: 'Compétences' }
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <div className="logo-top">
            <span className="logo-reliable">RELIABLE</span>
            <span className="logo-it">I.T. SERVICE</span>
          </div>
          <div className="logo-bottom">
            <span className="logo-startale">STARTALE</span>
            <span className="logo-solutions">SOLUTIONS</span>
          </div>
        </div>
        
        <div className="nav-menu">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;