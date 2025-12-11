// components/FloatingStars.jsx - NOUVEAU COMPOSANT
import React, { useEffect, useState } from 'react';
import './FloatingStars.css';

const FloatingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Générer des étoiles aléatoires
    const newStars = [];
    for (let i = 0; i < 15; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 5,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="floating-stars-container">
      {stars.map(star => (
        <div
          key={star.id}
          className="floating-star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      
      {/* Effets de connexion réseau */}
      <div className="network-connection">
        <div className="connection-node node-1"></div>
        <div className="connection-node node-2"></div>
        <div className="connection-node node-3"></div>
        <div className="connection-line line-1"></div>
        <div className="connection-line line-2"></div>
        <div className="connection-line line-3"></div>
      </div>
    </div>
  );
};

export default FloatingStars;