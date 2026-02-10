import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Mock data for Nigerian medical institutions
const nigerianHospitals = [
  { name: "Lagos University Teaching Hospital", coords: [3.3792, 6.5244], city: "Lagos", count: 4521, type: "Teaching Hospital" },
  { name: "University College Hospital", coords: [3.8951, 7.3775], city: "Ibadan", count: 3214, type: "Teaching Hospital" },
  { name: "Ahmadu Bello University Teaching Hospital", coords: [7.6381, 11.1499], city: "Zaria", count: 2891, type: "Teaching Hospital" },
  { name: "National Hospital Abuja", coords: [7.4951, 9.0765], city: "Abuja", count: 3756, type: "Federal Hospital" },
  { name: "University of Nigeria Teaching Hospital", coords: [7.4898, 6.2649], city: "Enugu", count: 2456, type: "Teaching Hospital" },
  { name: "Jos University Teaching Hospital", coords: [8.8965, 9.9285], city: "Jos", count: 1876, type: "Teaching Hospital" },
  { name: "University of Maiduguri Teaching Hospital", coords: [13.1571, 11.8469], city: "Maiduguri", count: 1234, type: "Teaching Hospital" },
  { name: "Federal Medical Centre Katsina", coords: [7.6017, 12.9908], city: "Katsina", count: 987, type: "Federal Medical Centre" },
  { name: "University of Port Harcourt Teaching Hospital", coords: [7.0134, 4.8156], city: "Port Harcourt", count: 2134, type: "Teaching Hospital" },
  { name: "Federal Medical Centre Owerri", coords: [7.0240, 5.4840], city: "Owerri", count: 1543, type: "Federal Medical Centre" },
];

const NigeriaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Show fallback Nigeria map without requiring Mapbox token
    const fallbackMapElement = document.createElement('div');
    fallbackMapElement.className = 'fallback-nigeria-map';
    fallbackMapElement.style.cssText = `
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: 8px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    `;
    
    // Create Nigeria map outline (simplified SVG)
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
      <svg width="300" height="250" viewBox="0 0 300 250" style="opacity: 0.3;">
        <path d="M50,80 C60,70 80,65 120,70 C160,60 200,65 250,80 C260,100 255,130 240,150 C220,170 180,175 150,170 C120,175 80,170 60,150 C45,130 40,100 50,80 Z" 
              fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
        <text x="150" y="125" text-anchor="middle" fill="#1d4ed8" font-size="14" font-weight="bold">NIGERIA</text>
      </svg>
    `;
    
    // Add hospital markers
    const markersContainer = document.createElement('div');
    markersContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;
    
    nigerianHospitals.forEach((hospital, index) => {
      const marker = document.createElement('div');
      marker.style.cssText = `
        position: absolute;
        left: ${20 + (index % 5) * 60}px;
        top: ${60 + Math.floor(index / 5) * 40}px;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(142 71% 45%) 100%);
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 8px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 10;
      `;
      marker.textContent = `${Math.floor(hospital.count / 1000)}K`;
      marker.title = `${hospital.name} - ${hospital.count.toLocaleString()} images`;
      markersContainer.appendChild(marker);
    });
    
    fallbackMapElement.appendChild(svgContainer);
    fallbackMapElement.appendChild(markersContainer);
    
    // Add instruction text
    const instructionText = document.createElement('div');
    instructionText.style.cssText = `
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255,255,255,0.9);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      color: #374151;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;
    instructionText.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 2px;">Interactive Map Preview</div>
      <div>Add Mapbox token for full functionality</div>
    `;
    fallbackMapElement.appendChild(instructionText);
    
    mapContainer.current.appendChild(fallbackMapElement);

    // Cleanup
    return () => {
      if (mapContainer.current && mapContainer.current.firstChild) {
        mapContainer.current.removeChild(mapContainer.current.firstChild);
      }
    };
  }, []);

  const totalImages = nigerianHospitals.reduce((sum, hospital) => sum + hospital.count, 0);
  const totalInstitutions = nigerianHospitals.length;

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contributing Institutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{totalInstitutions}</div>
            <p className="text-xs text-gray-500">Across Nigeria</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{totalImages.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Cancer imaging datasets</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Geographic Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">6</div>
            <p className="text-xs text-gray-500">Geopolitical zones</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>National Distribution</CardTitle>
          <p className="text-sm text-gray-600">
            Cancer imaging data contributors across Nigeria& apos;s medical institutions
          </p>
        </CardHeader>
        <CardContent>
          <div ref={mapContainer} className="w-full h-96 rounded-lg border border-gray-200" />
          <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
              <span>Contributing Institution</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Size indicates dataset volume</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NigeriaMap;