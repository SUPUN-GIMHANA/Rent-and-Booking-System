// import { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { useNavigate } from 'react-router-dom';
// import Header from '@/components/layout/Header';
// import { Button } from '@/components/ui/button';
// import { RentalItem } from '@/types/rental';
// import { BookingData } from '@/types/booking';
// import Footer from '@/pages/footer';

// export default function Stay() {
//     const navigate = useNavigate();
//     const [currentLocation, setCurrentLocation] = useState('');
//     const [mapOpen, setMapOpen] = useState(false);
//     const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
//     const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
//     const handleLocationSelectClick = () => {
//     setMapOpen(true);
// };

// const handleMapClick = (e: google.maps.MapMouseEvent) => {
//     if (e.latLng) {
//         const lat = e.latLng.lat();
//         const lng = e.latLng.lng();
//         setSelectedPosition({ lat, lng });
//     }
// };

// const confirmLocation = () => {
//     if (selectedPosition) {
//         setCurrentLocation(`${selectedPosition.lat.toFixed(5)}, ${selectedPosition.lng.toFixed(5)}`);
//     }
//     setMapOpen(false);
// };

// const handleConfirmBooking = (bookingData: BookingData) => {
//     console.log('Booking confirmed:', bookingData);
//     setSelectedItem(null);
// };



// return (
//     <div className="min-h-screen bg-background">
//     <Header
//         onLocationSelectClick={handleLocationSelectClick}
//         onSearch={(q) => console.log('Search:', q)}
//         currentLocation={currentLocation}
//     />
//     <Dialog open={mapOpen} onOpenChange={setMapOpen}>
//         <DialogContent className="max-w-3xl">
//             <DialogHeader>
//                 <DialogTitle>Select a Location</DialogTitle>
//             </DialogHeader>
//             <div className="h-[400px] w-full">
//             <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//                 <GoogleMap
//                     mapContainerStyle={{ width: '100%', height: '100%' }}
//                     center={selectedPosition || { lat: 6.9271, lng: 79.8612 }}
//                     zoom={10}
//                     onClick={handleMapClick}
//                 >
//                 {selectedPosition && <Marker position={selectedPosition} />}
//                 </GoogleMap>
//             </LoadScript>
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//                 <Button variant="outline" onClick={() => setMapOpen(false)}>Cancel</Button>
//                 <Button onClick={confirmLocation} disabled={!selectedPosition}>Confirm</Button>
//             </div>
//         </DialogContent>
//     </Dialog>
//       {/* Hero Section */}




//     <div className="max-w-5xl mx-auto px-6 py-12">
//       {/* Header Section */}
//       <div className="text-center mb-12">

//         <h1 className="text-3xl font-bold text-gray-800"> Stay safe</h1>
//         <p className="text-gray-600 mt-2">
//           Below are some tips on how to post ads that attract a lot of buyer interest.
//         </p>
//       </div>


//     </div>

    
  
//     <Footer />
//     </div>
//   );
// }

import { useState } from 'react';
import { Shield, Lock, AlertTriangle, Phone, Mail, TrendingDown, Users, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Footer from '@/pages/footer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';

export default function Stay() {
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

    // const [currentLocation, setCurrentLocation] = useState('');
    // const [mapOpen, setMapOpen] = useState(false);
    // const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);

    // Chart data
    const safetyTrendData = [
        { month: 'Jan', incidents: 45, resolved: 42 },
        { month: 'Feb', incidents: 38, resolved: 36 },
        { month: 'Mar', incidents: 32, resolved: 30 },
        { month: 'Apr', incidents: 25, resolved: 24 },
        { month: 'May', incidents: 18, resolved: 18 },
        { month: 'Jun', incidents: 12, resolved: 12 },
    ];

    const scamTypesData = [
        { name: 'Fake Listings', value: 35, color: '#ef4444' },
        { name: 'Payment Fraud', value: 28, color: '#f97316' },
        { name: 'Identity Theft', value: 20, color: '#eab308' },
        { name: 'Advance Fee Scams', value: 17, color: '#06b6d4' },
    ];

    const userSafetyData = [
        { category: 'Verified Users', percentage: 95 },
        { category: 'Safe Transactions', percentage: 98 },
        { category: 'Issue Resolution', percentage: 92 },
        { category: 'User Satisfaction', percentage: 96 },
    ];

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
            {/* Header placeholder - you can replace with your Header component */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-blue-600">RentEasy</h1>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Properties</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Safety</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
                        </nav>
                    </div>

                {/* Safety Statistics Section */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Safety Trend Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingDown className="w-6 h-6 text-green-600" />
                            <h3 className="text-xl font-bold text-gray-800">Safety Incidents Trend</h3>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={safetyTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="incidents" 
                                        stroke="#ef4444" 
                                        strokeWidth={3}
                                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                                        name="Reported Incidents"
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="resolved" 
                                        stroke="#22c55e" 
                                        strokeWidth={3}
                                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                                        name="Resolved Cases"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            Our safety measures have resulted in a 73% reduction in incidents over 6 months
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-800">Active Users</h4>
                            </div>
                            <p className="text-3xl font-bold text-green-600">50K+</p>
                            <p className="text-sm text-gray-600">Verified and safe</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-800">Success Rate</h4>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">98.2%</p>
                            <p className="text-sm text-gray-600">Safe transactions</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-800">Blocked Scams</h4>
                            </div>
                            <p className="text-3xl font-bold text-purple-600">1.2K+</p>
                            <p className="text-sm text-gray-600">This month</p>
                        </div>
                    </div>
                </div>

                {/* Scam Types and Safety Metrics */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Scam Types Pie Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Common Scam Types Detected</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={scamTypesData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {scamTypesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {scamTypesData.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div 
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Safety Metrics Bar Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Platform Safety Metrics</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={userSafetyData} layout="horizontal">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis type="number" domain={[0, 100]} stroke="#666" />
                                    <YAxis type="category" dataKey="category" stroke="#666" width={100} />
                                    <Tooltip 
                                        formatter={(value) => [`${value}%`, 'Percentage']}
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar 
                                        dataKey="percentage" 
                                        fill="#3b82f6" 
                                        radius={[0, 4, 4, 0]}
                                        name="Percentage"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            Our comprehensive safety measures ensure high user satisfaction and security
                        </p>
                    </div>
                </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Stay safe on RentHub</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        At RentHub, we are 100% committed to making sure that your experience on our platform is as safe as possible. 
                        Here's some advice on how to stay safe while renting and booking on RentHub.
                    </p>
                </div>

                {/* General Safety Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">General safety advice</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Verify Properties in Person</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Always visit the property and inspect it thoroughly before proceeding with any payment. 
                                    Meet the landlord or agent in person to verify authenticity.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Exchange booking and payment at the same time</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Renters: don't make any payments before viewing the property. 
                                    Landlords: don't hand over keys before receiving confirmed payment.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Never give out financial information</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    This includes bank account details, credit card info, and any other 
                                    information that could be misused for fraudulent purposes.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">While applying for a rental</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Research the property and landlord before you apply. Don't give out personal 
                                    information before meeting the landlord in person. Avoid going to remote locations for viewings.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Use common sense</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Avoid anything that appears too good to be true. Such as unrealistically 
                                    low prices and promises of immediate availability without proper verification.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Use RentHub Safe Pay</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Use RentHub Safe Pay for ultimate protection when you're booking properties. 
                                    Your money is kept safe until you've confirmed that you have received your booking confirmation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scams and Frauds Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Scams and frauds to watch out for</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Fake property listings</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    RentHub never sends emails requesting your personal details. If you receive an email 
                                    asking you to provide your personal details to us, do not open any links. 
                                    Please report the email and delete it.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Caution: No Advance Payment Required</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    RentHub never requires advance payment for bookings. Please report any false claims 
                                    and avoid payment for such services before property verification.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Requests to use money transfer services</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    These services are not meant for transactions between strangers and many scams 
                                    are run through them. Avoid requests to use services like Western Union, MoneyGram, 
                                    or cryptocurrency transfers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Safety Measures Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Safety measures provided by RentHub</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Email address is not shown on your ad</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    This ensures that you are protected from spam and unwanted communications 
                                    from unauthorized parties.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Continuous improvements</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We make constant improvements to our technology to detect and prevent 
                                    suspicious or inappropriate activity on our platform.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Option to hide phone number on your ad</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You can choose to hide your phone number and still be contacted by 
                                    interested renters via our secure chat system.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Block repeat offenders</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We track reports of suspicious or illegal activity to prevent offenders 
                                    from using the site again and protect our community.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reporting Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Reporting a safety issue</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Victim of a scam?</h3>
                            <p className="text-gray-600 leading-relaxed">
                                If you feel that you have been the victim of a scam, please report your situation 
                                to us immediately. If you have been cheated, we also recommend that you contact 
                                your local police department.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Information sharing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                RentHub is committed to the privacy of our users and does not share user information 
                                publicly. However, we take safety seriously and will cooperate with law enforcement 
                                if we receive requests regarding fraudulent or other criminal activity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Need help?</h2>
                    <div className="text-sm text-gray-600 mb-6">
                        <p>9am - 6pm on weekdays</p>
                        <p>8am - 5pm on weekends and mercantile holidays</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-green-600">Call us</span>
                        </div>
                        <span className="text-blue-600 font-medium">077 368 6790</span>
                        
                        <div className="flex items-center gap-2 sm:ml-8">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-blue-600">Email us</span>
                        </div>
                        <span className="text-blue-600 font-medium">support@renteasy.lk</span>
                    </div>
                </div>
            </div>
        
            <Footer />
        
        </div>
    );
}