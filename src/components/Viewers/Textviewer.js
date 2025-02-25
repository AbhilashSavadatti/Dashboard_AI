import React, { useEffect } from "react";

// Error handling function for script load failure
const handleScriptLoadError = (e) => {
  console.error("Script failed to load:", e.target.src);
};

// Function to dynamically load MathJax v2 script
const loadMathJax = () => {
  if (!window.MathJax) {
    // Load MathJax v2 script
    const mathJaxScript = document.createElement("script");
    mathJaxScript.src = "https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-MML-AM_CHTML";
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

const Textviewer = () => {
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
    <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default Textviewer;







