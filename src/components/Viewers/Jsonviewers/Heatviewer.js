import React, { useEffect } from 'react'; 
import L from 'leaflet';
import 'leaflet.heat'; // Import the Leaflet heatmap plugin

const Heatviewer = () => {
  // Store the HTML content as a string (with Leaflet and heatmap)
  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sales Heatmap</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
      <style>
          #map {
              width: 100%;
              height: 600px;
          }
      </style>
  </head>
  <body>
      <div id="map"></div>
      <script>
          const demoData = [
              { Location: 'New York', Sales: 1200 },
              { Location: 'London', Sales: 900 },
              { Location: 'Tokyo', Sales: 1500 },
              { Location: 'Sydney', Sales: 800 },
              { Location: 'Unknown', Sales: 0 },
          ];

          const fetchCoordinates = async (location) => {
              const response = await fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${location}\`);
              const data = await response.json();
              if (data && data[0]) {
                  return {
                      lat: parseFloat(data[0].lat),
                      lon: parseFloat(data[0].lon),
                  };
              } else {
                  return { lat: 0, lon: 0 }; // Default to (0, 0) if location is not found
              }
          };

          // Initialize the map
          const map = L.map('map').setView([20, 0], 2); // Initial map center [latitude, longitude], zoom level

          // Add OpenStreetMap tile layer with black and white styling
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              // Black and white color style for the map
              style: {
                  color: 'black',
                  fillColor: 'white'
              }
          }).addTo(map);

          // Collect coordinates based on demo data
          const heatData = [];

          const fetchAndPrepareData = async () => {
              for (const data of demoData) {
                  if (data.Sales > 0) {
                      const { lat, lon } = await fetchCoordinates(data.Location);
                      if (lat && lon) {
                          heatData.push([lat, lon, data.Sales]); // Push to heatmap data

                          // Add a marker with tooltip or popup for each data point
                          const popupContent = \`<b>Location:</b> \${data.Location}<br/><b>Sales:</b> \${data.Sales}\`;
                          L.marker([lat, lon])
                              .bindPopup(popupContent) // Use bindPopup() for a clickable popup
                              .addTo(map);
                      }
                  }
              }

              // Create heatmap layer
              const heat = L.heatLayer(heatData, {
                  radius: 25,
                  blur: 15,
                  maxZoom: 13,
              }).addTo(map);
          };

          // Fetch coordinates and update heatmap
          fetchAndPrepareData();
      </script>
  </body>
  </html>
  `;

  useEffect(() => {
    const existingIframe = document.getElementById('heat-iframe');
    if (existingIframe) {
      existingIframe.remove(); // Remove any existing iframe if present
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'heat-iframe'; // Assign a unique ID to avoid conflicts
    iframe.srcdoc = content;
    iframe.style.width = '100%';
    iframe.style.height = '600px';

    document.getElementById('heat-container').appendChild(iframe);
  }, []);

  return <div id="heat-container"></div>;
};

export default Heatviewer;




