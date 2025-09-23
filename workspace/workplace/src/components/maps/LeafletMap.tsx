import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
  selectedPosition?: [number, number] | null;
  markers?: Array<{
    position: [number, number];
    title?: string;
    description?: string;
  }>;
  className?: string;
}

// Component to handle map click events
function MapClickHandler({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onLocationSelect) {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function LeafletMap({
  center = [6.9271, 79.8612], // Default to Colombo, Sri Lanka
  zoom = 10,
  height = '400px',
  onLocationSelect,
  selectedPosition,
  markers = [],
  className = '',
}: LeafletMapProps) {
  const [map, setMap] = useState<L.Map | null>(null);

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  // Selected position marker icon (different color)
  const selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <div className={`leaflet-container ${className}`} style={{ height, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Handle map clicks */}
        <MapClickHandler onLocationSelect={onLocationSelect} />
        
        {/* Render existing markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={customIcon}
          >
            {marker.title && (
              <Popup>
                <div>
                  <h3 className="font-semibold">{marker.title}</h3>
                  {marker.description && (
                    <p className="text-sm text-gray-600">{marker.description}</p>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
        
        {/* Render selected position marker */}
        {selectedPosition && (
          <Marker
            position={selectedPosition}
            icon={selectedIcon}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">Selected Location</h3>
                <p className="text-sm text-gray-600">
                  Lat: {selectedPosition[0].toFixed(5)}, Lng: {selectedPosition[1].toFixed(5)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
