import React from 'react';
import Codeviewer from '../Viewers/Codeviewer';
import Tableviewer from '../Viewers/Jsonviewers/Tableviewer';
import Textviewer from '../Viewers/Textviewer';
import Graphviewer from '../Viewers/Jsonviewers/Graphviewer';
import Mapviewer from '../Viewers/Jsonviewers/Mapviewer';
import Heatviewer from '../Viewers/Jsonviewers/Heatviewer';
import Others from '../Viewers/Jsonviewers/Others';

const Workflowviewer = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '16px',
        border: '1px solid #ccc',
      }}
    >
      <h1>Workflow Viewer</h1>
      
      <Codeviewer />
      <Tableviewer />
      <h1>Text Viewer</h1>
      <Textviewer />
      <h1>Graph viewer</h1>
      <Graphviewer />

      <h1>Others viewer</h1>
      <Others />
      <h1>Mapviewer</h1>
      <Mapviewer />
      
      
      <h1>Heatmapviewer</h1>
      <Heatviewer />
      
    </div>
  );
};

export default Workflowviewer;


