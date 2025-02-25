import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardContent, Menu, MenuItem, IconButton } from '@mui/material';
import { Add, Edit, Delete, DragIndicator } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Dashchat from './Dashchat';

const Graph = () => {
};


const Global = () => {
};


const Metric = () => {
};



const Worldmap = () => {
};

const Text = () => <div >Text Widget</div>;
const Link = () => <div >Link Widget</div>;
const DataTable = () => {

};

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const dashboardRef = useRef();
  const handleMenuOpen = (event, rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const addWidget = (type) => {
    const newWidget = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: `New ${type} widget`,
    };
    const updatedRows = [...rows];
    updatedRows[currentRowIndex] = [...updatedRows[currentRowIndex], newWidget];
    setRows(updatedRows);
    handleMenuClose();
  };
  const deleteWidget = (rowIndex, id) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = updatedRows[rowIndex].filter(widget => widget.id !== id);
    setRows(updatedRows);
    setSelectedWidget(null);
  };
  const editWidget = (id) => {
    console.log(`Editing widget ${id}`);
    // Implement edit functionality here
  };
  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'graph': return <Graph />;
      case 'global': return <Global />;
      case 'worldmap': return <Worldmap />;

      case 'metric': return <Metric />;

      case 'text': return <Text />;
      case 'link': return <Link />;
      case 'dataTable': return <DataTable />;
      default: return null;
    }
  };
  const addRow = () => {
    setRows([...rows, []]);
  };
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.type === 'ROW') {
      const updatedRows = Array.from(rows);
      const [movedRow] = updatedRows.splice(result.source.index, 1);
      updatedRows.splice(result.destination.index, 0, movedRow);
      setRows(updatedRows);
    } else if (result.type === 'WIDGET') {
      const updatedRows = Array.from(rows);
      const sourceRowIndex = result.source.droppableId;
      const destinationRowIndex = result.destination.droppableId;
      const sourceWidgets = Array.from(updatedRows[sourceRowIndex]);
      const [movedWidget] = sourceWidgets.splice(result.source.index, 1);

      if (sourceRowIndex === destinationRowIndex) {
        sourceWidgets.splice(result.destination.index, 0, movedWidget);
        updatedRows[sourceRowIndex] = sourceWidgets;
      } else {
        updatedRows[sourceRowIndex].splice(result.source.index, 1);
        updatedRows[destinationRowIndex].splice(result.destination.index, 0, movedWidget);
      }

      setRows(updatedRows);
    }
  };
   // Handle clicks outside the widget to deselect
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
         setSelectedWidget(null); // Reset selected widget
       }
     };

     document.addEventListener('mousedown', handleClickOutside);
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, []);

   return (
     <DragDropContext onDragEnd={onDragEnd}>
       <div ref={dashboardRef} style={{ padding: '16px' }}>
        
         <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Dashboard</h1>
         <Button variant="contained" onClick={addRow} style={{ marginBottom: '16px' }}>
           Add Row
         </Button>
         
         <Button variant="contained" style={{ marginBottom: '16px' }}>
           Save
         </Button>
         <Button variant="contained"  style={{ marginBottom: '16px' }}>
           Edit
         </Button>
         <Button variant="contained" style={{ marginBottom: '16px' }}>
           Share
         </Button>

         <Droppable droppableId="rows" type="ROW">
           {(provided) => (
             <div ref={provided.innerRef} {...provided.droppableProps}>
               {rows.map((row, rowIndex) => (
                 <div key={rowIndex} style={{ marginBottom: '16px' }}>
                   <Droppable droppableId={`${rowIndex}`} type="WIDGET">
                     {(provided) => (
                       <div
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                         style={{ backgroundColor: '#e0e0e0', padding: '16px' }}
                         onClick={() => setSelectedWidget(null)} // Unselect widget when clicking on the row
                       >
                         <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-8px' }}>
                           {row.map((widget, widgetIndex) => (
                             <Draggable key={widget.id} draggableId={widget.id} index={widgetIndex}>
                               {(provided) => (
                                 <div ref={provided.innerRef} {...provided.draggableProps} style={{ flex: '1 1 calc(25% - 16px)', margin: '8px', ...provided.draggableProps.style }}>
                                   <Card
                                     variant="outlined"
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       setSelectedWidget(widget.id);
                                     }}
                                     style={{
                                       borderColor: selectedWidget === widget.id ? '#3f51b5' : undefined,
                                       transition: 'border-color 0.2s',
                                     }}
                                   >
                                    
                                     <CardContent>
                                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                         <h3>{widget.type}</h3>
                                         <IconButton {...provided.dragHandleProps}>
                                           <DragIndicator />
                                         </IconButton>
                                       </div>
                                       {renderWidget(widget)}
                                       {selectedWidget === widget.id && (
                                         <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                                           <Button size="small" variant="outlined" onClick={() => editWidget(widget.id)} startIcon={<Edit />}>
                                             Edit
                                           </Button>
                                           <Button size="small" variant="contained" color="secondary" onClick={() => deleteWidget(rowIndex, widget.id)} startIcon={<Delete />} style={{ marginLeft: '8px' }}>
                                             Delete
                                           </Button>
                                           <Button size="small" variant="contained" color="secondary"   style={{ marginLeft: '8px' }}>
                                             Data Table
                                           </Button>
                                         </div>
                                       )}
                                     </CardContent>
                                   </Card>
                                 </div>
                               )}
                             </Draggable>
                           ))}
                         </div>
                         <Button variant="contained" onClick={(event) => handleMenuOpen(event, rowIndex)} startIcon={<Add />} style={{ marginTop: '8px' }}>
                           Add Widget
                         </Button>
                         <Button variant="contained" color="error" onClick={() => deleteRow(rowIndex)} startIcon={<Delete />} style={{ marginTop: '8px', marginLeft: '8px' }}>
                           Delete Row
                         </Button>
                         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                           <MenuItem onClick={() => addWidget('graph')}>Graph</MenuItem>
                           <MenuItem onClick={() => addWidget('global')}>Globe</MenuItem>
                           <MenuItem onClick={() => addWidget('worldmap')}>Worldmap</MenuItem>

                           <MenuItem onClick={() => addWidget('metric')}>Metric</MenuItem>

                           <MenuItem onClick={() => addWidget('text')}>Text</MenuItem>
                           <MenuItem onClick={() => addWidget('link')}>Link</MenuItem>
                           <MenuItem onClick={() => addWidget('dataTable')}>Data Table</MenuItem>
                         </Menu>
                       </div>
                     )}
                   </Droppable>
                 </div>
               ))}
               {provided.placeholder}
             </div>
           )}
           
         </Droppable>
         <Dashchat />
       </div>
     </DragDropContext>
   );
}