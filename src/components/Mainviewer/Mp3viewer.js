import React, { useState } from "react";

const Mp3viewer = ({ content, audioSrc1, audioSrc2 }) => {
  // State to manage MP3 players
  const [players] = useState([
    { id: 1, src: audioSrc1, heading: "Mp3 1" },
    { id: 2, src: audioSrc2, heading: "Mp3 2" },
  ]);

  return (
    <div style={{ position: "relative", width: "840px", marginLeft: "20px" }}>
      {/* Scrollable content section */}
      <div
        style={{
          position: "relative",
          width: "750px",
          height: "520px",
          
          overflowY: "scroll",
          padding: "16px",
          boxSizing: "border-box",
          backgroundColor: "white",
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
            {/* Non-editable Heading */}
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {player.heading}
            </div>

            {/* MP3 Player */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <audio controls style={{ width: "250px" }}>
                <source src={player.src} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ))}

        {/* Display the content below the players */}
        <div dangerouslySetInnerHTML={{ __html: content }} style={{ marginTop: `${players.length * 100 + 20}px` }} />
      </div>
    </div>
  );
};

export default Mp3viewer;
