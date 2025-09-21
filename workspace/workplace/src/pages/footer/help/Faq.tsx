import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import Footer from '@/pages/footer';
import { Search } from 'lucide-react';

export default function Faq() {
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


const [searchTerm, setSearchTerm] = useState('');

    const faqCategories = [
        {
            id: 1,
            title: "General questions about RentHub",
            description: "Other frequently asked questions",
            articleCount: 4,
            color: "bg-teal-50 border-teal-200",
            textColor: "text-teal-600"
        },
        {
            id: 2,
            title: "Do you need help related to Properties?",
            description: "Frequently asked questions related to Properties",
            articleCount: 12,
            color: "bg-purple-50 border-purple-200",
            textColor: "text-purple-600"
        },
        {
            id: 3,
            title: "Do you need help listing on RentHub?",
            description: "Frequently asked questions by Property Owners",
            articleCount: 18,
            color: "bg-teal-50 border-teal-200",
            textColor: "text-teal-600"
        },
        {
            id: 4,
            title: "Do you need help renting on RentHub?",
            description: "Frequently asked questions by renters",
            articleCount: 15,
            color: "bg-purple-50 border-purple-200",
            textColor: "text-purple-600"
        }
    ];


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




     <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-lg">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center group">
                            <div className="relative mr-3">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <div className="w-5 h-5 bg-white rounded transform rotate-45"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 w-12 h-12 bg-white rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-black text-white tracking-tight">
                                    Rent<span className="text-yellow-300">Hub</span>
                                </h1>
                                <div className="h-1 w-16 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full transform origin-left group-hover:scale-x-125 transition-transform duration-300"></div>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group">
                                Home
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                            </a>
                            <a href="#" className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group">
                                Properties
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                            </a>
                            <a href="#" className="text-white/90 hover:text-white font-medium transition-colors duration-200 relative group">
                                Safety
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                            </a>
                            <a href="#" className="text-white font-medium relative group">
                                FAQ
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300"></div>
                            </a>
                            
                            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg">
                                Get Started
                            </button>
                        </nav>

                        <button className="md:hidden text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400"></div>
            </div>

            {/* FAQ Hero Section with Light Blue Background */}
            <div className="bg-sky-400 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                        Frequently asked questions
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="What do you need help with?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 text-lg bg-white border-0 rounded-2xl shadow-lg focus:ring-4 focus:ring-white/20 focus:outline-none transition-all duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* FAQ Categories Grid */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {faqCategories.map((category) => (
                        <div
                            key={category.id}
                            className={`${category.color} rounded-2xl border-2 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                        >
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-200">
                                    {category.title}
                                </h2>
                                
                                <p className="text-gray-600 mb-8 text-lg">
                                    {category.description}
                                </p>
                                
                                <div className="inline-flex items-center justify-center">
                                    <span className={`${category.textColor} bg-white px-4 py-2 rounded-full font-semibold text-sm shadow-sm`}>
                                        {category.articleCount} Articles
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Help Section */}
            <div className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Still need help?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Can't find the answer you're looking for? Our support team is here to help.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sky-600 transition-colors duration-200 shadow-lg">
                            Contact Support
                        </button>
                        <button className="bg-white text-sky-600 border-2 border-sky-500 px-8 py-4 rounded-xl font-semibold hover:bg-sky-50 transition-colors duration-200">
                            Live Chat
                        </button>
                    </div>
                </div>
            </div>

            {/* Popular Questions Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Popular Questions
                    </h2>
                    
                    <div className="space-y-6">
                        {[
                            "How do I create an account on RentHub?",
                            "What are the fees for listing a property?",
                            "How do I verify my identity?",
                            "Can I cancel my booking?",
                            "How do I contact a property owner?",
                            "What payment methods are accepted?"
                        ].map((question, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {question}
                                    </h3>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">RentHub Support</h2>
                        <p className="text-gray-400">We're here to help you succeed</p>
                    </div>
                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                            <span className="text-sm font-bold">f</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                            <span className="text-sm font-bold">t</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:pink-blue-700 transition-colors duration-200">
                            <span className="text-sm font-bold">ig</span>
                        </a>
                    </div>
                    <p className="text-gray-400">&copy; 2024 RentHub. All rights reserved.</p>
                </div>
            </div>

    
  
    <Footer />
    </div>
  );
}