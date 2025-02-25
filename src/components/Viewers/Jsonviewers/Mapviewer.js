import { Download } from "lucide-react";
import React, { useEffect } from "react";

const Mapviewer = () => {
  // Store the HTML content as a string
  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Map Viewer with Sales Density</title>
    <link
      href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css"
      rel="stylesheet"
    />
    <style>
      #map {
        width: 100%;
        height: 600px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>

    <script src="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js"></script>
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

      const map = new maplibregl.Map({
        container: 'map', // Container ID for the map
        style: 'https://demotiles.maplibre.org/style.json', // MapLibre demo tile server
        center: [0, 20], // Initial map center [longitude, latitude]
        zoom: 2, // Initial zoom level
      });

      const salesValues = demoData.map((data) => data.Sales);
      const maxSales = Math.max(...salesValues);
      const minSales = Math.min(...salesValues);

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('load', async () => {
        const locationsWithCoords = [];

        for (const data of demoData) {
          if (data.Sales > 0) {
            const { lat, lon } = await fetchCoordinates(data.Location);
            locationsWithCoords.push({
              ...data,
              Lat: lat,
              Lon: lon,
            });
          }
        }

        const geojsonData = {
          type: 'FeatureCollection',
          features: locationsWithCoords.map((data) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [data.Lon, data.Lat],
            },
            properties: {
              Location: data.Location,
              Sales: data.Sales,
            },
          })),
        };

        map.addSource('sales-locations', {
          type: 'geojson',
          data: geojsonData,
        });

        map.addLayer({
          id: 'sales-contours',
          type: 'circle',
          source: 'sales-locations',
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'Sales'],
              800, 10,
              1500, 25,
            ],
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'Sales'],
              minSales, '#ff0000',
              maxSales, '#0000ff',
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': 'rgba(255, 255, 255, 0.8)',
          },
        });

        map.on('click', 'sales-contours', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['sales-contours'],
          });

          if (features.length > 0) {
            const feature = features[0];
            const location = feature.properties.Location;
            const sales = feature.properties.Sales;

            popup.setLngLat(e.lngLat)
              .setHTML(\`Location: \${location}<br>Sales: \${sales}\` )
              .addTo(map);
          }
        });

        map.on('mouseenter', 'sales-contours', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'sales-contours', () => {
          map.getCanvas().style.cursor = '';
        });
      });
    </script>
  </body>
  </html>
  `;

  useEffect(() => {
    const existingIframe = document.getElementById("map-iframe");
    if (existingIframe) {
      existingIframe.remove();
    }

    const iframe = document.createElement("iframe");
    iframe.id = "map-iframe";
    iframe.srcdoc = content;
    iframe.style.width = "100%";
    iframe.style.height = "600px";

    document.getElementById("map-container").appendChild(iframe);
  }, []);

  return (
    <div>
      <div id="map-container"></div>
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
            Download Map
          </p>
        </span>
      </button> */}
    </div>
  );
};

export default Mapviewer;
