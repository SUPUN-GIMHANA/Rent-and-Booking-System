import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import CategoryGrid from '@/components/categories/CategoryGrid';
import RentalCard from '@/components/rental/RentalCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRentalItems } from '@/data/mockData';
import { RentalCategory, RentalItem } from '@/types/rental';
import { BookingData } from '@/types/booking';
import { MapPin, Star, Users, Shield, Clock, CreditCard, Smartphone, Globe } from 'lucide-react';
import Footer from './footer';

export default function HomePage() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('');
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  const handleLocationSelectClick = () => {
    setMapOpen(true);
  };

  const heroSlides = [
  {
    image: "/images/post0.png",
   
  },
  {
    image: "/images/post1.png",
  },
  {
    image: "/images/post2.png",
  },
  {
    image: "/images/post4.png",
  },
  {
    image: "/images/post5.jpg",
  },
  {
    image: "/images/post6.jpg",
  },
];

const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, 3000); // 1 second per slide

  return () => clearInterval(interval);
}, []);

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

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
  };

  const handleSearch = (query: string) => {
    navigate(`/browse?q=${encodeURIComponent(query)}`);
  };

  const handleCategorySelect = (category: RentalCategory) => {
    navigate(`/browse?category=${category}`);
  };

  const handleBookNow = (item: RentalItem) => {
    setSelectedItem(item);
  };

  const handleToggleFavorite = (itemId: string) => {
    setFavoriteItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleContact = (ownerId: string) => {
    console.log('Contact owner:', ownerId);
  };

  const handleConfirmBooking = (bookingData: BookingData) => {
    console.log('Booking confirmed:', bookingData);
    setSelectedItem(null);
  };

  const featuredItems = mockRentalItems.slice(0, 3);

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
      <section
        className="relative h-[300px] flex items-center justify-center text-center text-white transition-all duration-700"
        style={{
          backgroundImage: `url(${heroSlides[currentSlide].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6"></h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 transition-opacity duration-500"></p>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white w-6" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <CategoryGrid onCategorySelect={handleCategorySelect} />
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Rentals</h2>
            <p className="text-muted-foreground">
              Discover our most popular and highly-rated rental items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredItems.map((item) => (
              <RentalCard
                key={item.id}
                item={item}
                onBookNow={handleBookNow}
                onToggleFavorite={handleToggleFavorite}
                onContact={handleContact}
                isFavorite={favoriteItems.includes(item.id)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => navigate('/browse')}
            >
              View All Rentals
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RentEasy?</h2>
            <p className="text-muted-foreground">
              We make renting simple, safe, and convenient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Verified Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our rental items and owners are verified for your safety and peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Location-Based Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find rentals near you with distance calculations and nearby amenities information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real-Time Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Check real-time availability and book instantly with our calendar system.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Multiple payment options with secure transaction processing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Community Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Read honest reviews from our community to make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Mobile Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access RentEasy on any device with our responsive design.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10k+</div>
              <div className="text-muted-foreground">Items Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5k+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
      
        <Footer />
    </div>
  );
}