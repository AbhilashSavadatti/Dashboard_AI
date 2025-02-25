import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { FaTrash, FaTable } from 'react-icons/fa'; // Import the icons
import 'react-resizable/css/styles.css'; // Required for react-resizable

export default function Widget() {
  const [cards, setCards] = useState([]);
  const [isEditable, setIsEditable] = useState(true); // State to track if it's in edit mode

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      width: 200,
      height: 150,
      top: 50,
      left: 50,
      isAddedToDashboard: false, // Track if card is added to the dashboard
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (id, newDimensions) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, ...newDimensions } : card)));
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable); // Toggle between edit and save mode
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const addToDashboard = (id) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, isAddedToDashboard: true } : card)));
  };

  const dashboardStyles = {
    position: 'relative',
    width: '100%',
    height: '97%',
    backgroundColor: '#f5f5f5',
    overflow: 'auto',
  };

  const addButtonStyles = {
    position: 'absolute',
    top: '20px',
    left: '20px',
   
    padding: '10px 20px',
    backgroundColor: '#3eb378',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 10,
  };

  const saveButtonStyles = {
    position: 'absolute',
    top: '20px',
    left: '100px',
    padding: '10px 20px',
    backgroundColor: '#4bdb87 ', // Green color for save button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 10,
  };

  const editButtonStyles = {
    position: 'absolute',
    top: '20px',
    left: '180px',
    padding: '10px 20px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <div style={dashboardStyles}>
      <button style={addButtonStyles} onClick={addCard}>
        Add Card
      </button>
      <button style={saveButtonStyles} onClick={toggleEditMode}>
        {isEditable ? 'Save' : 'Edit'}
      </button>

      <div>
        {cards.map((card) => (
          <Draggable
            key={card.id}
            disabled={!isEditable} // Disable dragging if not in edit mode
            defaultPosition={{ x: card.left, y: card.top }}
            onStop={(e, data) => updateCard(card.id, { top: data.y, left: data.x })}
          >
            <div style={{ position: 'absolute' }}>
              <ResizableBox
                width={card.width}
                height={card.height}
                axis={isEditable ? 'both' : null} // Allow resizing only in edit mode
                minConstraints={[100, 100]}
                maxConstraints={[600, 600]}
                onResizeStop={(e, data) => updateCard(card.id, { width: data.size.width, height: data.size.height })}
                resizeHandles={isEditable ? ['se', 'sw', 'ne', 'nw', 'n', 'e', 's', 'w'] : []} // Enable resizing handles only in edit mode
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    textAlign: 'center',
                    position: 'relative', // Make sure the buttons are positioned relative to the card
                  }}
                >
                  {isEditable && (
                    <>
                      {/* Show Data Table and Trash Icon in Edit Mode */}
                      <button
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '40px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 20,
                        }}
                        onClick={() => deleteCard(card.id)}
                      >
                        <FaTrash size={17} color="grey" />
                      </button>
                      <button
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 20,
                        }}
                      >
                        <FaTable size={17} color="grey" />
                      </button>

                      
                    </>
                  )}

                  {/* Only show Add to Dashboard if Save Mode and not yet added */}
                  {!isEditable && !card.isAddedToDashboard && (
                    <>
                      <button
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: '#28a745', // Green color for "Add to Dashboard"
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          zIndex: 20,
                        }}
                        
                      >
                        Add to Dashboard
                      </button>

                      <button
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '120px', // Adjusted to avoid overlap with the first button
                          backgroundColor: '#007bff', // Blue color for "Add to Report"
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          zIndex: 20,
                        }}

                      >
                        Add to Report
                      </button>
                    </>
                  )}


                  Card {card.id}
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}







