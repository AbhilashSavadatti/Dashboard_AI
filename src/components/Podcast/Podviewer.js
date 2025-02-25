import React, { useState } from "react";
import Podchat from "./Podchat";

const Podviewer = ({ content, audioSrc1, audioSrc2 }) => {
  // State to manage MP3 players, including heading and editing status
  const [players, setPlayers] = useState([
    { id: 1, src: audioSrc1, heading: "Podcast 1", isEditing: false },
    { id: 2, src: audioSrc2, heading: "Podcast 2", isEditing: false },
  ]);

  // Function to update the heading
  const updateHeading = (id, newHeading) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, heading: newHeading } : player
      )
    );
  };

  // Function to toggle editing mode for a player
  const setEditing = (id, isEditing) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, isEditing } : player
      )
    );
  };

  // Function to delete a player
  const deletePlayer = (id) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  };

  return (
    <div style={{ position: "relative", width: "1140px", marginLeft: "20px" }}>
      {/* Scrollable content section */}
      <div
        style={{
          position: "relative",
          width: "1120px",
          height: "520px",
          border: "1px solid #ccc",
          overflowY: "scroll",
          padding: "16px",
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Dynamically render MP3 players */}
        {players.map((player, index) => (
          <div
            key={player.id}
            style={{
              position: "absolute",
              top: `${10 + index * 100}px`, // Adjust spacing between players
              left: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "5px",
            }}
          >
            {/* Editable Heading */}
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                cursor: "pointer",
              }}
            >
              {player.isEditing ? (
                <input
                  type="text"
                  value={player.heading}
                  onChange={(e) => updateHeading(player.id, e.target.value)}
                  onBlur={() => setEditing(player.id, false)} // Set to non-editable on blur
                  autoFocus
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "4px",
                  }}
                />
              ) : (
                <span onClick={() => setEditing(player.id, true)}>
                  {player.heading}
                </span>
              )}
            </div>

            {/* MP3 Player */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <audio controls style={{ width: "250px" }}>
                <source src={player.src} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <button
                onClick={() => deletePlayer(player.id)}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#34eba8",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Display the content below the players */}
        <div dangerouslySetInnerHTML={{ __html: content }} style={{ marginTop: `${players.length * 100 + 20}px` }} />
      </div>

      {/* Additional Podchat component */}
      <div style={{ marginTop: "10px" }}>
        <Podchat />
      </div>
    </div>
  );
};

export default Podviewer;




