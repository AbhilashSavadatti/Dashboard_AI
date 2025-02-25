import React, { useEffect } from "react";
import Reportchat from "./Reportchat"

// Error handling function for script load failure
const handleScriptLoadError = (e) => {
  console.error("Script failed to load:", e.target.src);
};

// Function to dynamically load MathJax v2 script
const loadMathJax = () => {
  if (!window.MathJax) {
    const mathJaxScript = document.createElement("script");
    mathJaxScript.src =
      "https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-MML-AM_CHTML";
    mathJaxScript.crossOrigin = "anonymous";
    mathJaxScript.async = true;
    mathJaxScript.onload = () => {
      if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    };
    mathJaxScript.onerror = handleScriptLoadError;
    document.head.appendChild(mathJaxScript);
  } else {
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
  }
};

const Docxeditor = () => {
  useEffect(() => {
    loadMathJax();
  }, []);

  const content = `
    <h2>Specific Heat Relationships for Ideal Gases</h2>
    <p>Specific heat relationships describe the amount of energy required to raise the temperature of an ideal gas by a certain amount.</p>
    <h3>Specific Heat at Constant Volume (c<sub>v</sub>)</h3>
    <p>The specific heat at constant volume (c<sub>v</sub>) represents the change in internal energy (<em>u</em>) per unit mass (<em>m</em>) per degree Celsius change in temperature (ΔT) at constant volume (V).</p>
    <p>We can express it mathematically as:</p>
    <p>$$c_v = \\frac{\\delta u}{m \\delta T}_V$$</p>
    <h3>Specific Heat at Constant Pressure (c<sub>p</sub>)</h3>
    <p>The specific heat at constant pressure (c<sub>p</sub>) represents the change in enthalpy (<em>h</em>) per unit mass (<em>m</em>) per degree Celsius change in temperature (ΔT) at constant pressure (P).</p>
    <p>The formula for c<sub>p</sub> is:</p>
    <p>$$c_p = \\frac{\\delta h}{m \\delta T}_P$$</p>
    <h3>Relationship between c<sub>p</sub> and c<sub>v</sub></h3>
    <p>For ideal gases, there's a specific relationship between c<sub>p</sub> and c<sub>v</sub>. The difference between them is equal to the gas constant (<em>R</em>).</p>
    <p>This relationship is expressed as:</p>
    <p>$$c_p = c_v + R$$</p>
    <h3>Key Points</h3>
    <ul>
      <li><strong>Internal Energy (<em>u</em>):</strong> The internal energy of an ideal gas depends only on its temperature.</li>
      <li>The change in internal energy (Δu) can be calculated as the integral of c<sub>v</sub> over the temperature change: Δu = ∫c<sub>v</sub>dT</li>
      <li><strong>Enthalpy (<em>h</em>):</strong> Enthalpy represents the total energy of a system, including both internal energy and the energy associated with pressure-volume work.</li>
      <li>The change in enthalpy (Δh) can be calculated as the integral of c<sub>p</sub> over the temperature change: Δh = ∫c<sub>p</sub>dT</li>
      <li><strong>Approximations:</strong> Over small temperature intervals, c<sub>p</sub> and c<sub>v</sub> can be approximated as constant values (C<sub>avg</sub>). This simplifies calculations.</li>
    </ul>
    <p>Feel free to ask if you'd like a deeper explanation of any concept or applications of these relationships!</p>
  `;

  return (
    <div>
          <button
    style={{
      position: "absolute", // Position relative to the container
      top: "50px", // Adjust the distance from the top
      right: "240px", // Adjust the distance from the right
      backgroundColor: "#4bdb87", // Green background color
      border: "1px solid #4bdb87", // Light border
      padding: "5px 5px",
      width: "75px",
      height: "29px",
      borderRadius: "3px", // Rounded corners
      cursor: "pointer",
      fontSize: "14px",
      color: "black", // White text color
      fontWeight: "initial",
    }}
  >
    Download
  </button>
    <div
      style={{
        width: "1120px", // Set the desired width of the container
        height: "520px", // Set the desired height of the container
        marginLeft:"20px",
        border: "1px solid #ccc", // Optional: Add a border
        overflowY: "scroll", // Enable vertical scrolling
        padding: "16px", // Add some padding
        boxSizing: "border-box", // Ensure padding doesn't affect width/height
        backgroundColor: "#f9f9f9", // Optional: Add a background color
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
    <div style={{marginTop:"10px"}}>
    <Reportchat/>
    </div>
    </div>
  );
};

export default Docxeditor;

