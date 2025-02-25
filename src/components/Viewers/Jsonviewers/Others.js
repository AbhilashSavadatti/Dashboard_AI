import React, { useEffect, useRef } from 'react';

const Others = () => {
  const containerRef = useRef(null);

  const content = `
    <div id="d3-graph-container" style="width: 500px; height: 500px;"></div>
    <script>
      (function() {
        const container = document.getElementById('d3-graph-container');
        if (container && window.d3) {
          const width = 500;
          const height = 500;

          const data = {
            nodes: [
              { id: 'Node 1' },
              { id: 'Node 2' },
              { id: 'Node 3' },
              { id: 'Node 4' },
            ],
            links: [
              { source: 'Node 1', target: 'Node 2' },
              { source: 'Node 2', target: 'Node 3' },
              { source: 'Node 3', target: 'Node 4' },
              { source: 'Node 4', target: 'Node 1' },
            ]
          };

          const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

          const g = svg.append('g');  // Group element to handle zoom and pan

          const simulation = d3.forceSimulation(data.nodes)
            .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height / 2));

          const link = g.append('g')
            .selectAll('.link')
            .data(data.links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('stroke', '#aaa');

          const node = g.append('g')
            .selectAll('.node')
            .data(data.nodes)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', 10)
            .attr('fill', 'steelblue')
            .call(d3.drag()
              .on('start', dragStart)
              .on('drag', dragged)
              .on('end', dragEnd));

          // Adding node labels
          g.append('g')
            .selectAll('.node-label')
            .data(data.nodes)
            .enter()
            .append('text')
            .attr('class', 'node-label')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('dy', -15)  // Position the label above the node
            .attr('text-anchor', 'middle')
            .text(d => d.id);

          // Zoom functionality
          const zoom = d3.zoom()
            .scaleExtent([0.5, 5])  // Limit the zoom scale
            .on('zoom', (event) => {
              g.attr('transform', event.transform);
            });

          svg.call(zoom);

          simulation.on('tick', () => {
            link
              .attr('x1', d => d.source.x)
              .attr('y1', d => d.source.y)
              .attr('x2', d => d.target.x)
              .attr('y2', d => d.target.y);

            node
              .attr('cx', d => d.x)
              .attr('cy', d => d.y);

            // Update the label positions on each tick
            g.selectAll('.node-label')
              .attr('x', d => d.x)
              .attr('y', d => d.y);
          });

          function dragStart(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          }

          function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
          }

          function dragEnd(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }
        }
      })();
    </script>
  `;

  useEffect(() => {
    // Load D3.js script dynamically
    const loadD3 = () => {
      const script = document.createElement('script');
      script.src = 'https://d3js.org/d3.v7.min.js';
      script.onload = () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = content;

          // Evaluate embedded script tags
          const scripts = containerRef.current.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
          });
        }
      };
      document.body.appendChild(script);
    };

    loadD3();
  }, [content]);

  return <div ref={containerRef}></div>;
};

export default Others;

