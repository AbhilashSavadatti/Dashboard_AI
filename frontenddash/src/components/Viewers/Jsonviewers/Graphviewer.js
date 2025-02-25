import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Download } from "lucide-react";
import React, { useEffect, useRef } from "react";

const Graphviewer = () => {
  const containerRef = useRef(null);

  const content = `
    <div id="chart-container" style="width: 500px; height: 400px;">
      <canvas id="myChart"></canvas>
    </div>
    <script>
      (function() {
        const ctx = document.getElementById('myChart').getContext('2d');
        
        const data = [
          { year: 2018, sales: 200 },
          { year: 2019, sales: 300 },
          { year: 2020, sales: 400 },
          { year: 2021, sales: 350 },
          { year: 2022, sales: 450 }
        ];

        const chart = new Chart(ctx, {
          type: 'line', // Line chart type
          data: {
            labels: data.map(d => d.year), // X-axis: years
            datasets: [{
              label: 'Sales',
              data: data.map(d => d.sales), // Y-axis: sales
              borderColor: 'steelblue', // Line color
              backgroundColor: 'rgba(70, 130, 180, 0.2)', // Fill under the line
              fill: true, // Enable filling under the curve
              tension: 0.4, // Smoothing the curve
              pointRadius: 5,
              pointHoverRadius: 8,
              pointBackgroundColor: 'red',
              pointBorderColor: 'black',
              pointHoverBackgroundColor: 'yellow',
              pointHoverBorderColor: 'black',
            }]
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return 'Sales: ' + tooltipItem.raw; // Customize tooltip
                  }
                }
              },
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'xy', // Enable pan in both directions (x and y)
                  threshold: 10
                },
                zoom: {
                  enabled: true,
                  mode: 'xy', // Enable zoom in both directions (x and y)
                  speed: 0.1, // Speed of zooming
                  sensitivity: 3, // Sensitivity of zoom
                  limits: {
                    max: 10, // Maximum zoom
                    min: 1 // Minimum zoom
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Year'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Sales'
                },
                beginAtZero: true
              }
            },
            interaction: {
              mode: 'index',
              intersect: false
            },
            onClick: function(event) {
              const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
              if (points.length) {
                const firstPoint = points[0];
                const sales = data[firstPoint.index].sales;
           
              }
            }
          }
        });
      })();
    </script>
  `;

  const loadChartjs = () => {
    const scriptChartJs = document.createElement("script");
    scriptChartJs.src = "https://cdn.jsdelivr.net/npm/chart.js"; // Link to Chart.js CDN
    scriptChartJs.onload = () => {
      const scriptZoom = document.createElement("script");
      scriptZoom.src = "https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom"; // Link to chartjs-plugin-zoom CDN
      scriptZoom.onload = () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = content; // Inject HTML content

          // Evaluate embedded script tags
          const scripts = containerRef.current.querySelectorAll("script");
          scripts.forEach((script) => {
            const newScript = document.createElement("script");
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
          });
        }
      };
      document.body.appendChild(scriptZoom); // Append zoom plugin script
    };
    document.body.appendChild(scriptChartJs); // Append Chart.js script
  };

  useEffect(() => {
    loadChartjs(); // Load Chart.js and the zoom plugin
  }, []); // Empty dependency array to ensure it's loaded once when the component mounts

  return (
    <div>
      <div ref={containerRef}></div>
      {/* <button>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0",
            color: "#424242",
          }}
        >
          <div
            style={{
              width: "20px", // Control width
              height: "20px", // Control height
              margin: "0 5px",
            }}
          >
            <Download style={{ width: "100%", height: "100%" }} />
          </div>
          <p style={{ margin: "0px 7px", fontSize: "13px", color: "#424242" }}>
            Download Chart
          </p>
        </span>
      </button> */}
    </div>
  ); // Return the container for the chart
};

export default Graphviewer;
