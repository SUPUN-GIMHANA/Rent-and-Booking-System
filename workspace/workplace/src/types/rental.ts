export interface RentalItem {
  reviews: boolean;
  id: string;
  title: string;
  description: string;
  category: RentalCategory;
  subcategory: string;
  images: string[];
  price: number;
  priceType: 'hourly' | 'daily' | 'weekly' | 'monthly';
  location: Location;
  owner: Owner;
  amenities: string[];
  ratings: Rating[];
  averageRating: number;
  availability: AvailabilitySlot[];
  isVerified: boolean;
  timeSlots?: TimeSlot[];
}

export interface Location {
  id: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyPlaces: NearbyPlace[];
}

export interface NearbyPlace {
  name: string;
  type: 'main_road' | 'supermarket' | 'bus_stand' | 'railway_station' | 'school' | 'hospital' | 'restaurant';
  distance: number; // in kilometers
}

export interface Owner {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  isVerified: boolean;
  responseTime: string;
}

export interface Rating {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AvailabilitySlot {
  date: string;
  available: boolean;
  timeSlots?: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  price?: number;
}

export interface Booking {
  id: string;
  itemId: string;
  userId: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

export type RentalCategory = 
  | 'vehicles'
  | 'real_estate'
  | 'event_items'
  | 'tools_equipment'
  | 'electronics'
  | 'costumes_clothing'
  | 'travel_adventure'
  | 'playgrounds';

export interface CategoryConfig {
  id: RentalCategory;
  name: string;
  icon: string;
  subcategories: string[];
  color: string;
}

export interface FilterOptions {
  category?: RentalCategory;
  subcategory?: string;
  priceRange: [number, number];
  location?: string;
  radius?: number;
  rating?: number;
  availability?: string;
  sortBy: 'price_low' | 'price_high' | 'rating' | 'distance' | 'newest';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  isVerified: boolean;
  favoriteItems: string[];
  bookings: Booking[];
}