import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeafletMap from '@/components/maps/LeafletMap';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import Footer from '@/pages/footer';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Headphones, CheckCircle } from 'lucide-react';


export default function Contact() {
    const navigate = useNavigate();
    const [currentLocation, setCurrentLocation] = useState('');
    const [mapOpen, setMapOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
    const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
    const handleLocationSelectClick = () => {
    setMapOpen(true);
};

const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
};

const confirmLocation = () => {
    if (selectedPosition) {
        setCurrentLocation(`${selectedPosition[0].toFixed(5)}, ${selectedPosition[1].toFixed(5)}`);
    }
    setMapOpen(false);
};

const handleConfirmBooking = (bookingData: BookingData) => {
    console.log('Booking confirmed:', bookingData);
    setSelectedItem(null);
};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('contact');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
        }, 1000);
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Call Us",
            description: "Speak with our support team",
            value: "+94 11 234 5678",
            action: "tel:+94112345678",
            color: "green",
            available: "24/7 Available"
        },
        {
            icon: Mail,
            title: "Email Us",
            description: "Send us your queries",
            value: "support@renthub.lk",
            action: "mailto:support@renthub.lk",
            color: "blue",
            available: "Response in 2 hours"
        },
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Chat with our agents",
            value: "Start Chat",
            action: "#",
            color: "purple",
            available: "9 AM - 9 PM"
        },
        {
            icon: Headphones,
            title: "Support Center",
            description: "Browse help articles",
            value: "Help Center",
            action: "#",
            color: "orange",
            available: "Self Service"
        }
    ];

    const officeLocations = [
        {
            city: "Colombo",
            address: "123 Galle Road, Colombo 03",
            phone: "+94 11 234 5678",
            hours: "Mon - Fri: 9 AM - 6 PM"
        },
        {
            city: "Kandy",
            address: "456 Peradeniya Road, Kandy",
            phone: "+94 81 234 5678", 
            hours: "Mon - Fri: 9 AM - 5 PM"
        },
        {
            city: "Galle",
            address: "789 Main Street, Galle Fort",
            phone: "+94 91 234 5678",
            hours: "Mon - Fri: 9 AM - 5 PM"
        }
    ];

    const faqData = [
        {
            question: "How do I list my property?",
            answer: "You can list your property by creating an account and using our easy listing wizard. Upload photos, add details, and set your price."
        },
        {
            question: "Is RentHub Safe Pay secure?",
            answer: "Yes, RentHub Safe Pay uses bank-level encryption and holds your money securely until you confirm your booking is complete."
        },
        {
            question: "How do I verify my identity?",
            answer: "You can verify your identity by uploading a government-issued ID and completing our verification process in your account settings."
        },
        {
            question: "What are the fees?",
            answer: "Listing basic properties is free. We charge a small commission only when you successfully complete a booking through our platform."
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

                        {/* <nav className="hidden md:flex items-center space-x-8">
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
                                Contact
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300"></div>
                            </a>
                            
                            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg">
                                Get Started
                            </button>
                        </nav> */}

                        <button className="md:hidden text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400"></div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                        <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We're here to help you with any questions about rentals, bookings, or our platform. 
                        Reach out to us anytime!
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactMethods.map((method, index) => {
                        const IconComponent = method.icon;
                        const colorClasses = {
                            green: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
                            blue: "from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700",
                            purple: "from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700",
                            orange: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        };

                        return (
                            <div key={index} className="group">
                                <a
                                    href={method.action}
                                    className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${colorClasses[method.color]} rounded-xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                                    <p className="text-gray-600 mb-3">{method.description}</p>
                                    <p className="font-semibold text-gray-900 mb-1">{method.value}</p>
                                    <p className="text-sm text-gray-500">{method.available}</p>
                                </a>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                                <p className="text-blue-100">Fill out the form below and we'll get back to you soon</p>
                            </div>
                            
                            <div onSubmit={handleSubmit} className="p-8">
                                {/* Category Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">What can we help you with?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['general', 'support', 'billing', 'partnership'].map((category) => (
                                            <label key={category} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category}
                                                    checked={formData.category === category}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                />
                                                <div className={`p-3 rounded-lg border-2 text-center capitalize transition-all duration-200 ${
                                                    formData.category === category
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                    {category}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="+94 XX XXX XXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Brief subject"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitted}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitted ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Office Locations */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin className="w-6 h-6 text-blue-600" />
                                <h3 className="text-xl font-bold text-gray-900">Our Offices</h3>
                            </div>
                            <div className="space-y-6">
                                {officeLocations.map((office, index) => (
                                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="font-semibold text-gray-900 mb-1">{office.city}</h4>
                                        <p className="text-gray-600 text-sm mb-2">{office.address}</p>
                                        <p className="text-gray-600 text-sm mb-1">📞 {office.phone}</p>
                                        <p className="text-gray-500 text-xs">{office.hours}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Answers</h3>
                            <div className="space-y-4">
                                {faqData.map((faq, index) => (
                                    <details key={index} className="group">
                                        <summary className="cursor-pointer font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200">
                                            {faq.question}
                                        </summary>
                                        <p className="text-gray-600 text-sm mt-2 pl-4">{faq.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Emergency Support</h3>
                                    <p className="text-gray-600 text-sm">24/7 Available</p>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-red-600 mb-2">+94 70 123 4567</p>
                            <p className="text-gray-600 text-sm">For urgent safety issues or emergencies only</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Stay Connected</h2>
                        <p className="text-gray-400">Follow us on social media for updates and tips</p>
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
                        <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-200">
                            <span className="text-sm font-bold">in</span>
                        </a>
                    </div>
                    <p className="text-gray-400">&copy; 2024 RentHub. All rights reserved.</p>
                </div>
            </div>
    
  
    <Footer />
    </div>
  );
}