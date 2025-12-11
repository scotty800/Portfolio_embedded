// components/BlockDetail.jsx - VERSION MODULAIRE AVEC PROJET 6 SUPPRIMÉ
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './BlockDetail.css';

// Import des composants de blocs spécifiques (projet 6 supprimé)
import ArduinoBlocks from './blocks/ArduinoBlocks';
import IoTBlocks from './blocks/IoTBlocks';
import FPGABlocks from './blocks/FPGABlocks';
import FreeRTOSBlocks from './blocks/FreeRTOSBlocks';
import GameBlocks from './blocks/GameBlocks';
// Projet 6 supprimé

const BlockDetail = () => {
  const navigate = useNavigate();
  const { projectId, blockId } = useParams();
  const projectNum = parseInt(projectId);
  const blockNum = parseInt(blockId);

  // Navigation directe vers la liste des projets
  const handleBackToProjects = () => {
    navigate('/projects');
  };

  // Sélectionner le composant de blocs selon le projet (projet 6 supprimé)
  const getBlockComponent = (projectId) => {
    switch(projectId) {
      case 1: return ArduinoBlocks;
      case 2: return IoTBlocks;
      case 3: return FPGABlocks;
      case 4: return FreeRTOSBlocks;
      case 5: return GameBlocks;
      // Projet 6 supprimé
      default: return ArduinoBlocks;
    }
  };

  const BlockComponent = getBlockComponent(projectNum);
  
  // Navigation entre blocs - ajusté selon le nombre de blocs par projet
  const getMaxBlockId = (projectId) => {
    switch(projectId) {
      case 1: case 2: case 3: return 6;  // 6 blocs
      case 4: return 4;                   // 4 blocs
      case 5: return 1;                   // 1 bloc
      default: return 6;
    }
  };

  const maxBlockId = getMaxBlockId(projectNum);
  const nextBlock = blockNum < maxBlockId ? `/project/${projectId}/block/${blockNum + 1}` : null;
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