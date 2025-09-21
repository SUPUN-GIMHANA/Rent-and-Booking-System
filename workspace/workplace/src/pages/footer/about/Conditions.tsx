import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import Footer from '@/pages/footer';

export default function Conditions() {
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
                    <h1 className="text-4xl font-bold text-gray-800">Terms & Conditions</h1>
                    <p className="mt-4 text-gray-600 text-lg">
                        Please read these terms carefully before using FindEasy. They outline your responsibilities and rights while using our platform.
                    </p>
                </div>

                <div className="space-y-8 text-gray-700">
                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <h2 className="text-2xl font-semibold mb-2">Using FindEasy</h2>
                        <p>
                            FindEasy allows you to browse, book, and rent items safely. Availability of rentals depends on the rental owners.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                        <h2 className="text-2xl font-semibold mb-2">Your Responsibilities</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Provide accurate information when registering or booking.</li>
                            <li>Use FindEasy responsibly and respectfully.</li>
                            <li>Follow local laws while renting items.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                        <h2 className="text-2xl font-semibold mb-2">Bookings & Payments</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Ensure your payment details are correct before confirming a booking.</li>
                            <li>Refunds and cancellations are subject to the rental owner’s policies.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                        <h2 className="text-2xl font-semibold mb-2">Safety & Respect</h2>
                        <p>
                            Fraud, spam, or harmful content is strictly prohibited. Treat all users with respect while using FindEasy.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                        <h2 className="text-2xl font-semibold mb-2">Content & Ownership</h2>
                        <p>
                            All content on FindEasy is owned by us or our partners. Do not copy or misuse content without permission.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                        <h2 className="text-2xl font-semibold mb-2">Limitations</h2>
                        <p>
                            FindEasy is not responsible for disputes between users and rental owners. Use the platform at your own risk.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
                        <h2 className="text-2xl font-semibold mb-2">Questions?</h2>
                        <p>
                            Contact us at: <strong></strong>
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
