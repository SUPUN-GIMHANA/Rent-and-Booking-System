import { RentalItem, Location, Owner } from '@/types/rental';

const mockOwners: Owner[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    isVerified: true,
    responseTime: '< 1 hour'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8bb?w=100&h=100&fit=crop&crop=face',
    rating: 4.9,
    isVerified: true,
    responseTime: '< 30 min'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 4.7,
    isVerified: false,
    responseTime: '< 2 hours'
  }
];

const mockLocations: Location[] = [
  {
    id: '1',
    address: '123 Main Street, Colombo 03',
    city: 'Colombo',
    coordinates: { lat: 6.9271, lng: 79.8612 },
    nearbyPlaces: [
      { name: 'Galle Road', type: 'main_road', distance: 0.5 },
      { name: 'Keells Super', type: 'supermarket', distance: 0.8 },
      { name: 'Bambalapitiya Railway Station', type: 'railway_station', distance: 1.2 },
      { name: 'Royal College', type: 'school', distance: 0.3 }
    ]
  },
  {
    id: '2',
    address: '456 Kandy Road, Kandy',
    city: 'Kandy',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    nearbyPlaces: [
      { name: 'Kandy-Colombo Road', type: 'main_road', distance: 0.2 },
      { name: 'Cargills Food City', type: 'supermarket', distance: 0.6 },
      { name: 'Kandy Bus Stand', type: 'bus_stand', distance: 0.4 },
      { name: 'Kandy Hospital', type: 'hospital', distance: 1.1 }
    ]
  }
];

export const mockRentalItems: RentalItem[] = [
  {
    id: '1',
    title: 'Luxury Toyota Camry 2023',
    description: 'Comfortable sedan perfect for city drives and long trips. Features leather seats, GPS navigation, and excellent fuel economy.',
    category: 'vehicles',
    subcategory: 'Cars (Sedan, SUV, Van)',
    images: [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop'
    ],
    price: 8000,
    priceType: 'daily',
    location: mockLocations[0],
    owner: mockOwners[0],
    amenities: ['GPS Navigation', 'Leather Seats', 'Air Conditioning', 'Bluetooth', 'Backup Camera'],
    ratings: [
      { id: '1', userId: '1', userName: 'Alice', rating: 5, comment: 'Excellent car, very clean and comfortable!', date: '2024-01-15' },
      { id: '2', userId: '2', userName: 'Bob', rating: 4, comment: 'Good service, car was as described.', date: '2024-01-10' }
    ],
    averageRating: 4.8,
    availability: [
      { date: '2024-01-20', available: true },
      { date: '2024-01-21', available: false },
      { date: '2024-01-22', available: true }
    ],
    isVerified: true,
    timeSlots: [
      { start: '06:00', end: '18:00', available: true, price: 4000 },
      { start: '18:00', end: '06:00', available: true, price: 5000 }
    ]
  },
  {
    id: '2',
    title: 'Modern 2BR Apartment in Colombo',
    description: 'Beautiful apartment with city view, fully furnished with modern amenities. Perfect for short-term stays.',
    category: 'real_estate',
    subcategory: 'Apartments / Houses',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    price: 15000,
    priceType: 'daily',
    location: mockLocations[0],
    owner: mockOwners[1],
    amenities: ['WiFi', 'Kitchen', 'Washing Machine', 'Air Conditioning', 'Parking', 'Security'],
    ratings: [
      { id: '3', userId: '3', userName: 'Carol', rating: 5, comment: 'Amazing place, great location!', date: '2024-01-12' }
    ],
    averageRating: 4.9,
    availability: [
      { date: '2024-01-20', available: true },
      { date: '2024-01-21', available: true },
      { date: '2024-01-22', available: false }
    ],
    isVerified: true
  },
  {
    id: '3',
    title: 'Professional DSLR Camera Kit',
    description: 'Canon EOS R5 with multiple lenses, tripod, and accessories. Perfect for photography and videography.',
    category: 'electronics',
    subcategory: 'Cameras (DSLR, GoPro)',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop'
    ],
    price: 5000,
    priceType: 'daily',
    location: mockLocations[1],
    owner: mockOwners[2],
    amenities: ['Multiple Lenses', 'Tripod', 'Memory Cards', 'Extra Batteries', 'Camera Bag'],
    ratings: [
      { id: '4', userId: '4', userName: 'David', rating: 5, comment: 'Excellent equipment, well maintained!', date: '2024-01-08' }
    ],
    averageRating: 4.7,
    availability: [
      { date: '2024-01-20', available: false },
      { date: '2024-01-21', available: true },
      { date: '2024-01-22', available: true }
    ],
    isVerified: false
  },
  {
    id: '4',
    title: 'Badminton Court - Premium Sports Complex',
    description: 'Indoor badminton court with professional flooring and lighting. Equipment rental available.',
    category: 'playgrounds',
    subcategory: 'Badminton courts',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&h=600&fit=crop'
    ],
    price: 2000,
    priceType: 'hourly',
    location: mockLocations[0],
    owner: mockOwners[0],
    amenities: ['Professional Court', 'Equipment Rental', 'Changing Rooms', 'Parking', 'Air Conditioning'],
    ratings: [
      { id: '5', userId: '5', userName: 'Emma', rating: 4, comment: 'Great court, good facilities.', date: '2024-01-14' }
    ],
    averageRating: 4.6,
    availability: [
      { 
        date: '2024-01-20', 
        available: true,
        timeSlots: [
          { start: '06:00', end: '07:00', available: true },
          { start: '07:00', end: '08:00', available: false },
          { start: '08:00', end: '09:00', available: true },
          { start: '09:00', end: '10:00', available: true }
        ]
      }
    ],
    isVerified: true
  },
  {
    id: '5',
    title: 'Complete Wedding Decoration Package',
    description: 'Everything you need for a beautiful wedding - chairs, tables, lighting, flowers, and decorations.',
    category: 'event_items',
    subcategory: 'Decorations',
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop'
    ],
    price: 50000,
    priceType: 'daily',
    location: mockLocations[1],
    owner: mockOwners[1],
    amenities: ['Chairs & Tables', 'Lighting Setup', 'Flower Arrangements', 'Backdrop', 'Setup Service'],
    ratings: [
      { id: '6', userId: '6', userName: 'Frank', rating: 5, comment: 'Made our wedding day perfect!', date: '2024-01-05' }
    ],
    averageRating: 4.9,
    availability: [
      { date: '2024-01-20', available: true },
      { date: '2024-01-21', available: false },
      { date: '2024-01-22', available: true }
    ],
    isVerified: true
  }
];