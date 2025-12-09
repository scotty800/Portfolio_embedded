import React from 'react';
import degradeImage from './assets/Dégradé_couleurs.png';

function AfficherImage() {
  return (
    <div>
      <h1>Dégradé de Couleurs</h1>
      <img 
        src={degradeImage} 
        alt="Dégradé de couleurs" 
        style={{ 
          width: '100%', 
          maxWidth: '800px',
          height: 'auto',
          display: 'block',
          margin: '20px auto',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}
      />
      <p>Image affichée avec succès !</p>
    </div>
  );
}

export default AfficherImage;