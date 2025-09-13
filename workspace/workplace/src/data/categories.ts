import { CategoryConfig } from '@/types/rental';

export const RENTAL_CATEGORIES: CategoryConfig[] = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: '🚗',
    color: 'bg-blue-500',
    subcategories: [
      'Cars (Sedan, SUV, Van)',
      'Motorbikes / Scooters',
      'Bicycles',
      'Trucks / Lorries',
      'Boats / Jet Skis'
    ]
  },
  {
    id: 'real_estate',
    name: 'Real Estate & Space',
    icon: '🏠',
    color: 'bg-green-500',
    subcategories: [
      'Apartments / Houses',
      'Office space / Co-working',
      'Event halls / Conference rooms',
      'Storage units'
    ]
  },
  {
    id: 'event_items',
    name: 'Event & Party Supplies',
    icon: '🎉',
    color: 'bg-purple-500',
    subcategories: [
      'Chairs / Tables',
      'Tents / Canopies',
      'Sound systems / Speakers',
      'Lights / Projectors',
      'Decorations',
      'Bouncy castles / Games'
    ]
  },
  {
    id: 'tools_equipment',
    name: 'Tools & Equipment',
    icon: '🔧',
    color: 'bg-orange-500',
    subcategories: [
      'Power tools',
      'Gardening tools',
      'Construction equipment',
      'Cleaning machines'
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    color: 'bg-red-500',
    subcategories: [
      'Cameras (DSLR, GoPro)',
      'Laptops / Tablets',
      'Projectors',
      'Gaming consoles'
    ]
  },
  {
    id: 'costumes_clothing',
    name: 'Clothing & Costumes',
    icon: '👗',
    color: 'bg-pink-500',
    subcategories: [
      'Wedding dresses / Suits',
      'Traditional wear',
      'Party costumes',
      'Theater costumes'
    ]
  },
  {
    id: 'travel_adventure',
    name: 'Travel & Adventure Gear',
    icon: '🎒',
    color: 'bg-teal-500',
    subcategories: [
      'Camping gear',
      'Hiking gear',
      'Surfboards / Kayaks',
      'Drones'
    ]
  },
  {
    id: 'playgrounds',
    name: 'Playgrounds',
    icon: '⚽',
    color: 'bg-yellow-500',
    subcategories: [
      'Indoor courts',
      'Outdoor courts',
      'Swimming pools',
      'Badminton courts',
      'Cricket grounds'
    ]
  }
];