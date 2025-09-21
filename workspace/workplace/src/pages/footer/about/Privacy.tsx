import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import Footer from '@/pages/footer';

export default function Privacy() {
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
        <div className="min-h-screen bg-gray-50">
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

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
                    <p className="mt-4 text-gray-600 text-lg">We value your privacy and transparency. Here's how we handle your data.</p>
                </div>

                <div className="space-y-8 text-gray-700">
                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <h2 className="text-2xl font-semibold mb-2">Your Privacy Matters</h2>
                        <p>
                            At <strong>FindEasy</strong>, we respect your privacy and are committed to keeping your data safe.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                        <h2 className="text-2xl font-semibold mb-2">What We Collect</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Basic info: Name, email, phone number.</li>
                            <li>Booking info: Rentals you’ve viewed or reserved.</li>
                            <li>Location data: Only if you use location-based features.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                        <h2 className="text-2xl font-semibold mb-2">How We Use It</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>To provide and improve our rental services.</li>
                            <li>To communicate updates, offers, and support.</li>
                            <li>To make your search faster and personalized.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                        <h2 className="text-2xl font-semibold mb-2">Sharing Info</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Only with service providers who help run FindEasy.</li>
                            <li>With rental owners when you make a booking.</li>
                            <li>With authorities if legally required.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                        <h2 className="text-2xl font-semibold mb-2">Security</h2>
                        <p>We use standard security measures to protect your data. Always keep your account info safe.</p>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>View and update your info anytime.</li>
                            <li>Delete your account if you wish.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
                        <h2 className="text-2xl font-semibold mb-2">Questions?</h2>
                        <p>Contact us at: <strong></strong></p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
