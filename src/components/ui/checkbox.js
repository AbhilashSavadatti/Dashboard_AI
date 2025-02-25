import React from "react";

const Checkbox = ({ checked, onChange }) => {
  const checkboxContainerStyle = {
    position: "relative",
    display: "inline-block",
    width: "24px",
    height: "24px",
    cursor: "pointer", // Add pointer cursor for better UX
  };

  const checkboxInputStyle = {
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute", // Position offscreen to make the span element visible
  };

  const checkmarkStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "24px",
    width: "24px",
    border: "2px solid black",
    borderRadius: "4px", // Rounded corners
    backgroundColor: checked ? "#34eba8" : "white", // Background color changes dynamically
    transition: "background-color 0.3s, border-color 0.3s",
    display: "flex",
    
    justifyContent: "center",
    alignItems: "center",
  };

  const checkmarkInnerStyle = checked
    ? {
        content: '""',
        width: "8px",
        height: "12px",
        border: "solid black", // White tick mark for checked state
        borderWidth: "0 3px 3px 0",
        transform: "rotate(45deg)",
      }
    : null;

  return (
    <label style={checkboxContainerStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={checkboxInputStyle}
      />
      <span style={checkmarkStyle}>
        {checked && <span style={checkmarkInnerStyle}></span>}
      </span>
    </label>
  );
};

export default Checkbox;
