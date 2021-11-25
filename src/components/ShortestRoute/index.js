import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ShortestRoute({source, dest}) {
  const position = [20.593683, 78.962883];

  return (
    <div className="leaflet-container">
    <MapContainer center={position} zoom={6} style={{height: '100%', width: '100%', position: 'relative'}}>    
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />  
    </MapContainer>
    </div>
  );
}
