import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { RentalItem } from '@/types/rental';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RentalMapProps {
  items: RentalItem[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  onItemClick?: (item: RentalItem) => void;
}

export default function RentalMap({
  items,
  center = [6.9271, 79.8612], // Default to Colombo, Sri Lanka
  zoom = 10,
  height = '400px',
  className = '',
  onItemClick,
}: RentalMapProps) {
  // Custom marker icons based on category
  const getCategoryIcon = (category: string) => {
    const iconColors = {
      vehicles: 'blue',
      real_estate: 'green',
      event_items: 'purple',
      tools_equipment: 'orange',
      electronics: 'red',
      costumes_clothing: 'pink',
      travel_adventure: 'teal',
      playgrounds: 'yellow',
    };

    const color = iconColors[category as keyof typeof iconColors] || 'blue';
    
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
    });
  };

  // Calculate center from items if not provided
  const mapCenter = center || (items.length > 0 
    ? [items[0].location.coordinates.lat, items[0].location.coordinates.lng]
    : [6.9271, 79.8612]
  );

  return (
    <div className={`leaflet-container ${className}`} style={{ height, width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {items.map((item) => (
          <Marker
            key={item.id}
            position={[item.location.coordinates.lat, item.location.coordinates.lng]}
            icon={getCategoryIcon(item.category)}
            eventHandlers={{
              click: () => onItemClick?.(item),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">
                    LKR {item.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">
                    /{item.priceType}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm">{item.averageRating}</span>
                  <span className="text-xs text-gray-500">
                    ({item.ratings.length} reviews)
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">
                  📍 {item.location.address}
                </p>
                
                {onItemClick && (
                  <button
                    onClick={() => onItemClick(item)}
                    className="w-full bg-primary text-primary-foreground text-xs py-1 px-2 rounded hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
