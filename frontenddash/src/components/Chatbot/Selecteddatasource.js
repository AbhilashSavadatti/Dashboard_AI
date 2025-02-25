import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Selecteddatasource = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle close button click
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <>
      
      {/* <div
        style={{
          border: '1px solid #34eba8',
          borderRadius: '8px',
          padding: '5px',
          maxWidth: '300px',
          backgroundColor: 'white', 
          position: 'relative',
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FaTimes size={13} color="#555" />
        </button>
       
        <p
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: 0,
          }}
        >
          Folders & Files &gt; Marketing
        </p>
      </div> */}
      </>
    )
  );
};


export default Selecteddatasource;

