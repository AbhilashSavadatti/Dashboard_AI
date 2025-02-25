import React from 'react';

import MainContent from '../Mainviewer/MainContent';
import Chatbox from '../Chatbot/Chatbox';

const Thread = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          overflow-y: hidden; /* Hide vertical scrollbar */
          height: 100%;
        }

        .app-container2 {
          display: flex;
          flex-direction: column;
          height: 74vh;
          overflow: hidden; /* Prevent scrollbars in the container */
          background-color: white; /* Default background color */
          color: black; /* Default text color */
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .content-container {
          display: flex;
          flex-grow: 1;
          overflow: hidden; /* Prevent scrollbars in the content */
        }

        /* Hide Sidebar */
        .content-container > .sidebar {
          display: none;
        }
      `}</style>
      <div className="app-container2">
        
        <div className="content-container">
        
          <MainContent />
          <Chatbox />
        </div>
      </div>
    </>
  );
};

export default Thread;