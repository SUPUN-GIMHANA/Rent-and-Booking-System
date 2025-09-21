import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import Footer from '@/pages/footer';
import { 
    Home, Car, Building, PartyPopper, Wrench, Smartphone, Shirt, 
    Mountain, Gamepad2, Search, User, HelpCircle, Shield, Mail,
    FileText, Star, TrendingUp, CreditCard, Settings, Bell,
    MapPin, Calendar, Users, BarChart3, ChevronDown, ChevronRight
} from 'lucide-react';

export default function Sitemap() {
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


 const [expandedSections, setExpandedSections] = useState({
        categories: true,
        account: false,
        help: false,
        company: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const rentalCategories = [
        {
            name: "Vehicles",
            icon: Car,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            items: ["Cars", "Motorcycles", "Bicycles", "Trucks", "Vans", "Luxury Cars", "Electric Vehicles"]
        },
        {
            name: "Real Estate & Space",
            icon: Building,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            items: ["Apartments", "Houses", "Office Spaces", "Event Venues", "Storage Units", "Vacation Rentals", "Commercial Space"]
        },
        {
            name: "Event & Party Supplies",
            icon: PartyPopper,
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-200",
            items: ["Party Decorations", "Sound Systems", "Lighting", "Catering Equipment", "Furniture", "Tents & Canopies", "Photo Booths"]
        },
        {
            name: "Tools & Equipment",
            icon: Wrench,
            color: "from-orange-500 to-amber-500",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            items: ["Power Tools", "Construction Equipment", "Gardening Tools", "Cleaning Equipment", "Automotive Tools", "Heavy Machinery"]
        },
        {
            name: "Electronics",
            icon: Smartphone,
            color: "from-purple-500 to-violet-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            items: ["Cameras", "Laptops", "Gaming Consoles", "Audio Equipment", "Projectors", "Drones", "Smart Home Devices"]
        },
        {
            name: "Clothing & Costumes",
            icon: Shirt,
            color: "from-indigo-500 to-blue-500",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
            items: ["Formal Wear", "Costumes", "Designer Clothing", "Accessories", "Shoes", "Wedding Dresses", "Traditional Outfits"]
        },
        {
            name: "Travel & Adventure Gear",
            icon: Mountain,
            color: "from-teal-500 to-cyan-500",
            bgColor: "bg-teal-50",
            borderColor: "border-teal-200",
            items: ["Camping Gear", "Hiking Equipment", "Water Sports", "Winter Sports", "Luggage", "Travel Accessories", "Outdoor Furniture"]
        },
        {
            name: "Playgrounds",
            icon: Gamepad2,
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            items: ["Bounce Houses", "Playground Equipment", "Games", "Sports Equipment", "Kids Furniture", "Educational Toys", "Play Structures"]
        }
    ];

    const mainSections = {
        categories: {
            title: "Rental Categories",
            icon: Home,
            color: "text-blue-600",
            items: rentalCategories
        },
        account: {
            title: "Account & Profile",
            icon: User,
            color: "text-green-600",
            items: [
                { name: "My Profile", path: "/profile", icon: User },
                { name: "My Bookings", path: "/bookings", icon: Calendar },
                { name: "My Listings", path: "/my-listings", icon: Building },
                { name: "Favorites", path: "/favorites", icon: Star },
                { name: "Reviews & Ratings", path: "/reviews", icon: Star },
                { name: "Account Settings", path: "/settings", icon: Settings },
                { name: "Notification Settings", path: "/notifications", icon: Bell },
                { name: "Payment Methods", path: "/payment", icon: CreditCard }
            ]
        },
        help: {
            title: "Help & Support",
            icon: HelpCircle,
            color: "text-purple-600",
            items: [
                { name: "FAQ", path: "/faq", icon: HelpCircle },
                { name: "Contact Us", path: "/contact", icon: Mail },
                { name: "Safety Tips", path: "/safety", icon: Shield },
                { name: "How It Works", path: "/how-it-works", icon: FileText },
                { name: "Rental Guidelines", path: "/guidelines", icon: FileText },
                { name: "Community Forum", path: "/forum", icon: Users },
                { name: "Report Issue", path: "/report", icon: FileText }
            ]
        },
        company: {
            title: "Company Information",
            icon: Building,
            color: "text-orange-600",
            items: [
                { name: "About Us", path: "/about", icon: Building },
                { name: "Privacy Policy", path: "/privacy", icon: Shield },
                { name: "Terms & Conditions", path: "/terms", icon: FileText },
                { name: "Careers", path: "/careers", icon: TrendingUp },
                { name: "Press & Media", path: "/press", icon: FileText },
                { name: "Partner With Us", path: "/partnership", icon: Users },
                { name: "Investor Relations", path: "/investors", icon: BarChart3 },
                { name: "Site Map", path: "/sitemap", icon: MapPin }
            ]
        }
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




  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

            {/* Hero Section */}
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Text Content */}
                        <div className="text-left">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl">
                                <MapPin className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                                Site
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Map
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Explore everything RentHub has to offer. Find exactly what you're looking for with our comprehensive site navigation.
                            </p>
                        </div>

                        {/* Right Side - Search */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-2xl">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Search className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search pages, categories, or features..."
                                        className="w-full pl-14 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* Main Navigation Categories */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Rental Categories */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
                            <div className="flex items-center gap-4">
                                <Home className="w-8 h-8 text-white" />
                                <h2 className="text-3xl font-bold text-white">Rental Categories</h2>
                            </div>
                            <p className="text-blue-100 mt-2">Browse all available rental categories</p>
                        </div>
                        
                        <div className="p-8">
                            <div className="grid gap-4">
                                {rentalCategories.map((category, index) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`${category.bgColor} ${category.borderColor} border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                                                    <div className="flex flex-wrap gap-1">
                                                        {category.items.slice(0, 4).map((item, itemIndex) => (
                                                            <span key={itemIndex} className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
                                                                {item}
                                                            </span>
                                                        ))}
                                                        {category.items.length > 4 && (
                                                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                                +{category.items.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Platform Features */}
                    <div className="space-y-6">
                        {Object.entries(mainSections).slice(1).map(([key, section]) => {
                            const IconComponent = section.icon;
                            const isExpanded = expandedSections[key];
                            
                            return (
                                <div key={key} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                    <button
                                        onClick={() => toggleSection(key)}
                                        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                                <IconComponent className={`w-5 h-5 ${section.color}`} />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                                                <p className="text-gray-600 text-sm">{section.items.length} pages</p>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                    
                                    {isExpanded && (
                                        <div className="px-6 pb-6 border-t border-gray-100">
                                            <div className="grid md:grid-cols-2 gap-3 pt-4">
                                                {section.items.map((item, index) => {
                                                    const ItemIcon = item.icon;
                                                    return (
                                                        <a
                                                            key={index}
                                                            href={item.path || '#'}
                                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                                                        >
                                                            <ItemIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                                            <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                                                                {item.name}
                                                            </span>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Links Grid */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Pages</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "How It Works", icon: FileText, color: "from-blue-500 to-cyan-500" },
                            { name: "Safety Guidelines", icon: Shield, color: "from-green-500 to-emerald-500" },
                            { name: "Pricing", icon: CreditCard, color: "from-purple-500 to-violet-500" },
                            { name: "Contact Support", icon: Mail, color: "from-orange-500 to-red-500" },
                            { name: "Become a Host", icon: Users, color: "from-pink-500 to-rose-500" },
                            { name: "Mobile App", icon: Smartphone, color: "from-indigo-500 to-blue-500" },
                            { name: "Partner Program", icon: TrendingUp, color: "from-teal-500 to-cyan-500" },
                            { name: "Community", icon: Users, color: "from-yellow-500 to-orange-500" }
                        ].map((link, index) => {
                            const IconComponent = link.icon;
                            return (
                                <a
                                    key={index}
                                    href="#"
                                    className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-800">
                                        {link.name}
                                    </h3>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Navigate RentHub</h2>
                        <p className="text-gray-400">Everything you need is just a click away</p>
                    </div>
                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                            <span className="text-sm font-bold">f</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                            <span className="text-sm font-bold">t</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors duration-200">
                            <span className="text-sm font-bold">ig</span>
                        </a>
                    </div>
                    <p className="text-gray-400">&copy; 2024 RentHub. All rights reserved.</p>
                </div>
            </div>
        </div>
    
  
    <Footer />
    </div>
  );
}