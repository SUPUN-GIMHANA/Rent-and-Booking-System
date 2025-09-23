import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface EnhancedLeafletMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
  selectedPosition?: [number, number] | null;
  markers?: Array<{
    position: [number, number];
    title?: string;
    description?: string;
    type?: 'rental' | 'user' | 'selected';
  }>;
  className?: string;
  showSearch?: boolean;
  showCurrentLocation?: boolean;
  enableClustering?: boolean;
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

// Component to get current location
function CurrentLocationButton({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) {
  const map = useMap();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationFound(latitude, longitude);
          map.setView([latitude, longitude], 15);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  };

  return (
    <div className="leaflet-control leaflet-bar">
      <button
        onClick={getCurrentLocation}
        className="bg-white border border-gray-300 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        title="Get current location"
      >
        📍
      </button>
    </div>
  );
}

// Component to search for locations
function LocationSearch({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using Nominatim (OpenStreetMap) geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=lk`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    if (onLocationSelect) {
      onLocationSelect(lat, lng);
    }
    setSearchQuery(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] w-80">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            searchLocation(e.target.value);
          }}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-[1001]">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-sm">{suggestion.display_name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EnhancedLeafletMap({
  center = [6.9271, 79.8612], // Default to Colombo, Sri Lanka
  zoom = 10,
  height = '400px',
  onLocationSelect,
  selectedPosition,
  markers = [],
  className = '',
  showSearch = false,
  showCurrentLocation = false,
  enableClustering = false,
}: EnhancedLeafletMapProps) {
  const [map, setMap] = useState<L.Map | null>(null);

  // Custom marker icons
  const rentalIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const getIcon = (type?: string) => {
    switch (type) {
      case 'rental':
        return rentalIcon;
      case 'user':
        return userIcon;
      case 'selected':
        return selectedIcon;
      default:
        return rentalIcon;
    }
  };

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
        
        {/* Location search */}
        {showSearch && <LocationSearch onLocationSelect={onLocationSelect} />}
        
        {/* Current location button */}
        {showCurrentLocation && (
          <div className="absolute top-4 right-4 z-[1000]">
            <CurrentLocationButton
              onLocationFound={(lat, lng) => {
                if (onLocationSelect) {
                  onLocationSelect(lat, lng);
                }
              }}
            />
          </div>
        )}
        
        {/* Render existing markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={getIcon(marker.type)}
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
