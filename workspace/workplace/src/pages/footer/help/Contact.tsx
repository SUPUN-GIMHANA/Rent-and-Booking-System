import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import Footer from '@/pages/footer';

export default function Contact() {
    const navigate = useNavigate();
    const [currentLocation, setCurrentLocation] = useState('');
    const [mapOpen, setMapOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
    const handleLocationSelectClick = () => {
    setMapOpen(true);
};

const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setSelectedPosition({ lat, lng });
    }
};

const confirmLocation = () => {
    if (selectedPosition) {
        setCurrentLocation(`${selectedPosition.lat.toFixed(5)}, ${selectedPosition.lng.toFixed(5)}`);
    }
    setMapOpen(false);
};

const handleConfirmBooking = (bookingData: BookingData) => {
    console.log('Booking confirmed:', bookingData);
    setSelectedItem(null);
};



return (
    <div className="min-h-screen bg-background">
    <Header
        onLocationSelectClick={handleLocationSelectClick}
        onSearch={(q) => console.log('Search:', q)}
        currentLocation={currentLocation}
    />
    <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>Select a Location</DialogTitle>
            </DialogHeader>
            <div className="h-[400px] w-full">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={selectedPosition || { lat: 6.9271, lng: 79.8612 }}
                    zoom={10}
                    onClick={handleMapClick}
                >
                {selectedPosition && <Marker position={selectedPosition} />}
                </GoogleMap>
            </LoadScript>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setMapOpen(false)}>Cancel</Button>
                <Button onClick={confirmLocation} disabled={!selectedPosition}>Confirm</Button>
            </div>
        </DialogContent>
    </Dialog>
      {/* Hero Section */}




    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">

        <h1 className="text-3xl font-bold text-gray-800"> Contacts</h1>
        <p className="text-gray-600 mt-2">
          Below are some tips on how to post ads that attract a lot of buyer interest.
        </p>
      </div>


    </div>

    
  
    <Footer />
    </div>
  );
}