// components/BlockDetail.jsx - VERSION MODULAIRE
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './BlockDetail.css';

// Import des composants de blocs spécifiques
import EcommerceBlocks from './blocks/ArduinoBlocks';
import AnalyticsBlocks from './blocks/IoTBlocks';
import SocialBlocks from './blocks/FPGABlocks';
import WeatherBlocks from './blocks/FreeRTOSBlocks';
import ProjectManagementBlocks from './blocks/GameBlocks';
import ArtisticPortfolioBlocks from './blocks/ArtisticPortfolioBlocks';

const BlockDetail = () => {
  const navigate = useNavigate();
  const { projectId, blockId } = useParams();
  const projectNum = parseInt(projectId);
  const blockNum = parseInt(blockId);

  // Navigation directe vers la liste des projets
  const handleBackToProjects = () => {
    navigate('/projects');
  };

  // Sélectionner le composant de blocs selon le projet
  const getBlockComponent = (projectId) => {
    switch(projectId) {
      case 1: return EcommerceBlocks;
      case 2: return AnalyticsBlocks;
      case 3: return SocialBlocks;
      case 4: return WeatherBlocks;
      case 5: return ProjectManagementBlocks;
      case 6: return ArtisticPortfolioBlocks;
      default: return EcommerceBlocks;
    }
  };

  const BlockComponent = getBlockComponent(projectNum);
  
  // Navigation entre blocs
  const nextBlock = blockNum < 6 ? `/project/${projectId}/block/${blockNum + 1}` : null;
  const prevBlock = blockNum > 1 ? `/project/${projectId}/block/${blockNum - 1}` : null;

  return (
    <div className="block-detail">
      {/* Header avec navigation */}
      <div className="block-detail-header">
        <div className="block-nav-top">
          <button className="back-btn" onClick={handleBackToProjects}>
            ← Retour aux projets
          </button>
          <div className="block-breadcrumb">
            <Link to="/projects">Projets</Link> › 
            <Link to={`/project/${projectId}`}>Projet {projectId}</Link> › 
            <span>Bloc {blockId}</span>
          </div>
        </div>
      </div>

      {/* Passer les props au composant de bloc spécifique */}
      <BlockComponent 
        projectId={projectNum}
        blockId={blockNum}
        nextBlock={nextBlock}
        prevBlock={prevBlock}
      />
    </div>
  );
};

export default BlockDetail;