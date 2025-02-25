import React, { useState } from "react";
import {  FaMicrophone, FaPaperPlane } from "react-icons/fa";



export default function Filter() {


 

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          border: "2px solid #34eba8", // Added border here
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
         
          <input
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              flex: 1,
              padding: "10px",
              fontSize: "16px",
            }}
            placeholder="Type a message..."
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        >
          <FaMicrophone style={{ marginRight: "10px", color: "grey" }} />
          <FaPaperPlane style={{ color: "grey" }} />
        </div>
      </div>

             
          
     
   
    </>
  );
}
