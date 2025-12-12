// components/Navbar.jsx - MODIFIÉ (ajout de Certifications)
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ activeSection, setActiveSection }) => {
  const location = useLocation();
  
  const navItems = [
    { id: 'home', label: 'Accueil', path: '/' },
    { id: 'projects', label: 'Projets', path: '/projects' },
    { id: 'skills', label: 'Compétences', path: '/skills' },
    { id: 'certifications', label: 'Certifications', path: '/certifications' } // Nouvel élément
  ];

  React.useEffect(() => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('/project/')) {
      setActiveSection('projects');
      return;
    }
    
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveSection(activeItem.id);
    } else if (currentPath === '/') {
      setActiveSection('home');
    }
  }, [location.pathname, navItems, setActiveSection]);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <div className="logo-top">
            <span className="logo-welcome">WELCOME</span>
          </div>
        </div>
        
        <div className="nav-menu">
          {navItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;