import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import Footer from '@/pages/footer';

export default function SellFastPage() {
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
        <img
          src='/images/sellpage.png' // <-- replace with your image in /public
          alt="Sell fast"
          className="mx-auto  mb-6 w-[590px] h-[250px] -mt-14"
        />
        <h1 className="text-3xl font-bold text-gray-800">Sell Fast on RentEasy</h1>
        <p className="text-gray-600 mt-2">
          Below are some tips on how to post ads that attract a lot of buyer interest.
        </p>
        <a href="#" className="text-green-600 underline mt-3 block">
          See our ad posting rules
        </a>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tip 1 */}
        <div className="flex items-start space-x-4">
          <img src="/images/details.png" alt="Details" className="w-10 h-10" />
          <div>
            <h3 className="font-semibold text-lg">Add as much detail as you can</h3>
            <p className="text-gray-600 text-sm mt-1">
              Ads with clear details get more views! Include keywords and information that
              buyers will be interested in. Be honest while providing these details.
            </p>
          </div>
        </div>

        {/* Tip 2 */}
        <div className="flex items-start space-x-4">
          <img src="/images/addimages.png" alt="Photos" className="w-[85px] h-[85px]" />
          <div>
            <h3 className="font-semibold text-lg">Add great photos</h3>
            <p className="text-gray-600 text-sm mt-1">
              Use clear photos of the item you're selling. Ads with real photos get up to
              10 times more views than ads with stock images. Use good lighting and angles.
            </p>
          </div>
        </div>

        {/* Tip 3 */}
        <div className="flex items-start space-x-4">
          <img src="/images/price.png" alt="Price" className="w-[8 70px] h-[50px]" />
          <div>
            <h3 className="font-semibold text-lg">Pick the right price</h3>
            <p className="text-gray-600 text-sm mt-1">
              Everything sells if the price is right! Browse similar ads and choose a
              competitive price. If willing to negotiate, select the "Negotiable" option.
            </p>
          </div>
        </div>

        {/* Tip 4 */}
        <div className="flex items-start space-x-4">
          <img src="/images/boost.png" alt="Boost Ads" className="w-[81px] h-[51px]" />
          <div>
            <h3 className="font-semibold text-lg">Boost your ads!</h3>
            <p className="text-gray-600 text-sm mt-1">
              Boost your ad to get up to 10 times more views. The higher the demand, the
              better your chances of selling fast at the price you want.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-16 border-t pt-8">
        <h2 className="text-xl font-bold">Questions? Get in touch!</h2>
        <p className="text-gray-600">9am - 6pm on weekdays</p>
        <div className="flex justify-center space-x-12 mt-4">
          <div>
            <p className="font-semibold">📞 Call us</p>
            <p className="text-gray-700">077 368 6790</p>
          </div>
          <div>
            <p className="font-semibold">✉️ Email us</p>
            <p className="text-gray-700">support@renteasy.lk</p>
          </div>
        </div>
      </div>
    </div>


  
    <Footer />
    </div>
  );
}