import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import CategoryGrid from '@/components/categories/CategoryGrid';
import RentalCard from '@/components/rental/RentalCard';
import BookingModal from '@/components/booking/BookingModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRentalItems } from '@/data/mockData';
import { RentalCategory, RentalItem } from '@/types/rental';
import { 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  Clock, 
  CreditCard,
  Smartphone,
  Globe
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('Colombo, Sri Lanka');
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

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

  const handleConfirmBooking = (bookingData: any) => {
    console.log('Booking confirmed:', bookingData);
    setSelectedItem(null);
  };

  const featuredItems = mockRentalItems.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onLocationSelect={handleLocationSelect}
        onSearch={handleSearch}
        currentLocation={currentLocation}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Rent Anything,
            <br />
            <span className="text-yellow-400">Anywhere</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            From vehicles to venues, equipment to electronics - find everything you need for rent in Sri Lanka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Start Browsing
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              List Your Items
            </Button>
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Renting?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust RentEasy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse Rentals
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              List Your Items
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}