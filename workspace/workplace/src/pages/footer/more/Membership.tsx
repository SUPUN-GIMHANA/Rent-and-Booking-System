import { useEffect, useState } from 'react';
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
    const [planType, setPlanType] = useState<"plus" | "premium">("plus");
    const [selectedCategory, setSelectedCategory] = useState<string>('');

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

    // Define pricing for different categories
    const categoryPricing = {
        'Vehicals': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 275", validity: "1 Month", adsPerMonth: 60, freeVoucher: "LKR 9,500", total: "LKR 16,500",},
                {name: "Quarterly", costPerAd: "LKR 250", validity: "3 Months", adsPerMonth: 60, freeVoucher: "LKR 28,500", total: "LKR 45,000",},
                {name: "Yearly", costPerAd: "LKR 220", validity: "12 Months", adsPerMonth: 60, freeVoucher: "LKR 115,000", total: "LKR 158,400",},
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 350", validity: "1 Month", adsPerMonth: 80, freeVoucher: "LKR 12,000", total: "LKR 28,000",},
                {name: "Quarterly", costPerAd: "LKR 320", validity: "3 Months", adsPerMonth: 80, freeVoucher: "LKR 35,000", total: "LKR 76,800",},
                {name: "Yearly", costPerAd: "LKR 300", validity: "12 Months", adsPerMonth: 80, freeVoucher: "LKR 140,000", total: "LKR 288,000",},
            ],
        },
        'Real Estate & Space': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 300", validity: "1 Month", adsPerMonth: 70, freeVoucher: "LKR 10,000", total: "LKR 18,000",},
                {name: "Quarterly", costPerAd: "LKR 280", validity: "3 Months", adsPerMonth: 70, freeVoucher: "LKR 30,000", total: "LKR 50,400",},
                {name: "Yearly", costPerAd: "LKR 250", validity: "12 Months", adsPerMonth: 70, freeVoucher: "LKR 120,000", total: "LKR 180,000",},
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 400", validity: "1 Month", adsPerMonth: 30, freeVoucher: "LKR 15,000", total: "LKR 32,000",},
                {name: "Quarterly", costPerAd: "LKR 370", validity: "3 Months", adsPerMonth: 30, freeVoucher: "LKR 45,000", total: "LKR 88,800",},
                {name: "Yearly", costPerAd: "LKR 350", validity: "12 Months", adsPerMonth: 30, freeVoucher: "LKR 180,000", total: "LKR 336,000",},
            ],
        },
        'Event & Party Supplies': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 400", validity: "1 Month", adsPerMonth: 10, freeVoucher: "LKR 10,500", total: "LKR 11,440",},
                {name: "Quarterly", costPerAd: "LKR 550", validity: "3 Months", adsPerMonth: 20, freeVoucher: "LKR 28,500", total: "LKR 45,000",},
                {name: "Yearly", costPerAd: "LKR 620", validity: "12 Months", adsPerMonth: 30, freeVoucher: "LKR 115,000", total: "LKR 158,400",},
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 550", validity: "1 Month", adsPerMonth: 180, freeVoucher: "LKR 16,500", total: "LKR 38,300",},
                {name: "Quarterly", costPerAd: "LKR 320", validity: "3 Months", adsPerMonth: 280, freeVoucher: "LKR 35,000", total: "LKR 76,800",},
                {name: "Yearly", costPerAd: "LKR 300", validity: "12 Months", adsPerMonth: 380, freeVoucher: "LKR 120,000", total: "LKR 238,040",},
            ],
        },
        'Tools & Equipment': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 450", validity: "1 Month", adsPerMonth: 510, freeVoucher: "LKR 5,500", total: "LKR 12,600",},
                {name: "Quarterly", costPerAd: "LKR 550", validity: "3 Months", adsPerMonth: 60, freeVoucher: "LKR 48,600", total: "LKR 47,900",},
                {name: "Yearly", costPerAd: "LKR 620", validity: "12 Months", adsPerMonth: 70, freeVoucher: "LKR 215,000", total: "LKR 134,500",},
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 550", validity: "1 Month", adsPerMonth: 120, freeVoucher: "LKR 8,000", total: "LKR 22,000",},
                {name: "Quarterly", costPerAd: "LKR 320", validity: "3 Months", adsPerMonth: 230, freeVoucher: "LKR 23,000", total: "LKR 44,800",},
                {name: "Yearly", costPerAd: "LKR 300", validity: "12 Months", adsPerMonth: 340, freeVoucher: "LKR 250,000", total: "LKR 655,000",},
            ],
        },
        'Electronics': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 600", validity: "1 Month", adsPerMonth: 450, freeVoucher: "LKR 6,500", total: "LKR 55,500",},
                {name: "Quarterly", costPerAd: "LKR 550", validity: "3 Months", adsPerMonth: 560, freeVoucher: "LKR 66,500", total: "LKR 54,000",},
                {name: "Yearly", costPerAd: "LKR 620", validity: "12 Months", adsPerMonth: 670, freeVoucher: "LKR 456,000", total: "LKR 754,400", },
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 650", validity: "1 Month", adsPerMonth: 780, freeVoucher: "LKR 21,000", total: "LKR 54,000", },
                {name: "Quarterly", costPerAd: "LKR 320", validity: "3 Months", adsPerMonth: 890, freeVoucher: "LKR 34,000", total: "LKR 45,800",},
                {name: "Yearly", costPerAd: "LKR 300", validity: "12 Months", adsPerMonth: 900, freeVoucher: "LKR 175,000", total: "LKR 293,500",},
            ],
        },
        'Cloathing & Costumes': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 700", validity: "1 Month", adsPerMonth: 21, freeVoucher: "LKR 11,500", total: "LKR 13,750",},
                {name: "Quarterly", costPerAd: "LKR 550", validity: "3 Months", adsPerMonth: 32, freeVoucher: "LKR 14,500", total: "LKR 64,000",},
                {name: "Yearly", costPerAd: "LKR 620", validity: "12 Months", adsPerMonth: 30, freeVoucher: "LKR 123,000", total: "LKR 345,400", },
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 750", validity: "1 Month", adsPerMonth: 430, freeVoucher: "LKR 21,000", total: "LKR 32,000", },
                {name: "Quarterly", costPerAd: "LKR 320", validity: "3 Months", adsPerMonth: 540, freeVoucher: "LKR 54,000", total: "LKR 76,800",},
                {name: "Yearly", costPerAd: "LKR 300", validity: "12 Months", adsPerMonth: 650, freeVoucher: "LKR 160,700", total: "LKR 254,444",},
            ],
        },
        'Travel & Adventure Gear': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 800", validity: "1 Month", adsPerMonth: 60, freeVoucher: "LKR 5,500", total: "LKR 43,500",},
                {name: "Quarterly", costPerAd: "LKR 550", validity: "3 Months", adsPerMonth: 50, freeVoucher: "LKR 54,500", total: "LKR 65,000",},
                {name: "Yearly", costPerAd: "LKR 620", validity: "12 Months", adsPerMonth: 40, freeVoucher: "LKR 324,000", total: "LKR 333,400", },
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 950", validity: "1 Month", adsPerMonth:  650, freeVoucher: "LKR 32,000", total: "LKR 43,000", },
                {name: "Quarterly", costPerAd: "LKR 320", validity: "3 Months", adsPerMonth: 750, freeVoucher: "LKR 344,000", total: "LKR 545,800",},
                {name: "Yearly", costPerAd: "LKR 300", validity: "12 Months", adsPerMonth: 760, freeVoucher: "LKR 130,000", total: "LKR 258,000",},
            ],
        },
        'Playgrounds': {
            plus: [
                {name: "Monthly", costPerAd: "LKR 500", validity: "1 Month", adsPerMonth: 70, freeVoucher: "LKR 19,500", total: "LKR 13,500",},
                {name: "Quarterly", costPerAd: "LKR 550", validity: "3 Months", adsPerMonth: 50, freeVoucher: "LKR 25,500", total: "LKR 46,500",},
                {name: "Yearly", costPerAd: "LKR 620", validity: "12 Months", adsPerMonth: 90, freeVoucher: "LKR 235,000", total: "LKR 456,400", },
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 750", validity: "1 Month", adsPerMonth: 640, freeVoucher: "LKR 87,000", total: "LKR 98,000", },
                {name: "Quarterly", costPerAd: "LKR 320", validity: "3 Months", adsPerMonth: 750, freeVoucher: "LKR 65,700", total: "LKR 34,500",},
                {name: "Yearly", costPerAd: "LKR 300", validity: "12 Months", adsPerMonth: 860, freeVoucher: "LKR 540,000", total: "LKR 658,000",},
            ],
        },
        // Default pricing (when no category is selected)
        default: {
            plus: [
                {name: "Monthly",costPerAd: "LKR 225",validity: "1 Month",adsPerMonth: 60,freeVoucher: "LKR 8,500",total: "LKR 13,500",},
                {name: "Quarterly", costPerAd: "LKR 213", validity: "3 Months", adsPerMonth: 60, freeVoucher: "LKR 25,500", total: "LKR 38,475",},
                {name: "Yearly", costPerAd: "LKR 180", validity: "12 Months", adsPerMonth: 60, freeVoucher: "LKR 102,000", total: "LKR 129,600",},
            ],
            premium: [
                {name: "Monthly", costPerAd: "LKR 300", validity: "1 Month", adsPerMonth: 80, freeVoucher: "LKR 10,000", total: "LKR 18,000",},
                {name: "Quarterly", costPerAd: "LKR 280", validity: "3 Months", adsPerMonth: 80, freeVoucher: "LKR 30,000", total: "LKR 50,000",},
                {name: "Yearly", costPerAd: "LKR 250", validity: "12 Months", adsPerMonth: 80, freeVoucher: "LKR 120,000", total: "LKR 150,000",},
            ],
        }
    };

    // Get current pricing based on selected category
    const getCurrentPricing = () => {
        if (selectedCategory && categoryPricing[selectedCategory as keyof typeof categoryPricing]) {
            return categoryPricing[selectedCategory as keyof typeof categoryPricing];
        }
        return categoryPricing.default;
    };

    const plans = getCurrentPricing();

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
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

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="grid md:grid-cols-2 gap-6 items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Unlock RentEasy Membership Benefits</h1>
                        <p className="text-gray-600 mb-6"> Explore our membership plans and unlock benefits designed to enhance
                        your online <span className="font-semibold">visibility</span> and accelerate your
                        <span className="font-semibold">sales growth</span>.
                        </p>
                    </div>
                    <img src='/images/membership.jpg' alt="Membership Benefits" className="rounded-lg shadow-lg"/>
                </div>

                {/* Steps */}
                <h2 className="text-2xl font-semibold mb-6">Sign Up in 3 Easy Steps</h2>

                {/* Step 1 */}
                <div className="mb-12">
                    <h3 className="font-bold mb-4">1. What's your Business Category?</h3>
                    {selectedCategory && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-700 font-medium">Selected: {selectedCategory}</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { label: "Vehicals", image: '/images/vehical.gif',height: "130px", width: "180px", },
                            { label: "Real Estate & Space", image: '/images/realstate.gif' ,height: "100px", width: "100px"},
                            { label: "Event & Party Supplies", image: '/images/event.gif' ,height: "100px", width: "100px"},
                            { label: "Tools & Equipment", image:'/images/tools.gif' ,height: "100px", width: "100px"},
                            { label: "Electronics", image: '/images/electronics.gif' ,height: "100px", width: "100px"},
                            { label: "Cloathing & Costumes", image: '/images/clothing.gif' ,height: "100px", width: "100px"},
                            { label: "Travel & Adventure Gear", image: '/images/travel.gif' ,height: "130px", width: "190px"},
                            { label: "Playgrounds", image: '/images/playground.gif' ,height: "150px", width: "200px"},
                        ].map((benefit, i) => (
                            <div
                            key={i}
                            className={`border p-4 rounded-lg text-sm cursor-pointer transition-all ${
                                selectedCategory === benefit.label
                                ? "border-green-600 bg-green-50"
                                : "hover:border-green-600"
                            }`}
                            onClick={() => handleCategorySelect(benefit.label)}
                            >
                            <img
                            src={benefit.image}
                            alt={benefit.label}
                            style={{ height: benefit.height, width: benefit.width }}
                            className="mx-auto mb-2"
                            />

                            <p className="text-sm">{benefit.label}</p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Step 2 */}
                <div className="mb-12">
                <h3 className="font-bold mb-4">2. Pick a Plan</h3>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                    {["plus", "premium"].map((tab) => (
                    <button key={tab} onClick={() => setPlanType(tab as "plus" | "premium")}
                        className={`px-6 py-2 border-b-2 capitalize ${ planType === tab
                            ? "border-green-600 text-green-600 font-semibold" : "border-transparent text-gray-500"
                        }`}
                    >
                        {tab}
                    </button>
                    ))}
                </div>

                {/* Plan Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {plans[planType].map((plan, i) => (
                    <div
                        key={i}
                        className="border rounded-lg p-6 shadow hover:shadow-lg relative"
                    >
                        {/* Show Popular badge only for Quarterly */}
                        {plan.name === "Quarterly" && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl">Popular</span>
                        )}

                        <h4 className="font-semibold mb-2">{plan.name}</h4>
                        <ul className="text-sm text-gray-600 mb-4 space-y-1">
                            <li>✅ Cost per ad {plan.costPerAd}</li>
                            <li>✅ Validity: {plan.validity}</li>
                            <li>✅ {plan.adsPerMonth} ads per month</li>
                            <li>✅ Free Voucher: {plan.freeVoucher}</li>
                        </ul>
                        <p className="text-xl font-bold mb-4">{plan.total}</p>
                        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"> Select Plan </button>
                    </div>
                    ))}
                </div>
                </div>

            {/* Step 3 */}
                <div className="mb-12">
                    <h3 className="font-bold mb-4">3. Tell us about you</h3>
                    <form className="grid md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Full Name" className="border p-3 rounded" />
                        <input type="email" placeholder="Email" className="border p-3 rounded" />
                        <input type="text"  placeholder="Business Name" className="border p-3 rounded"/>
                        <input type="tel" placeholder="Phone Number" className="border p-3 rounded"/>
                    </form>
                </div>

            {/* Benefits */}
                <div>
  <h2 className="text-2xl font-semibold mb-6">Benefits of being a Member</h2>
  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
    {[
      { label: "Add more images to your Ad", image:'/images/addimages.png' },
      { label: "Your own shop on RentEasy", image: "/images/shop.jpg" },
      { label: "Track Buyer Interest", image: "/images/chart.png" },
      { label: "Verified seller and member", image: "/images/sequrity.png" },
      { label: "Free Promo Codes", image: "/images/promoCode.png" },
      { label: "Ad Analytics", image: "/images/marketing.png" },
      { label: "Re-Post your Ads Autometically", image: "/images/repost.png" },
      { label: "Customer Suport", image: "/images/customerSupport.png" },
      { label: "Build Trust your Online shop", image: "/images/handshake.png" },
    ].map((item, i) => (
      <button key={i} className="p-4 border rounded-lg hover:shadow">
        <img
          src={item.image}
          alt={item.label}
          className="h-10 mx-auto mb-2"
        />
        {item.label}
      </button>
    ))}
  </div>
</div>

            </div>

            <Footer />
        </div>
    );
}