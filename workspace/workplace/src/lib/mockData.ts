export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: 'active' | 'inactive' | 'sold';
  views: number;
  likes: number;
  createdAt: string;
  image: string;
  location: string;
  type: 'rent' | 'sale';
  isBoosted?: boolean;
  boostExpiry?: string;
  isCommercial?: boolean;
}

export interface Comment {
  id: string;
  itemId: string;
  userName: string;
  message: string;
  rating: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface BoostPackage {
  id: string;
  name: string;
  duration: number; // days
  price: number;
  features: string[];
  multiplier: number; // view multiplier
}

export interface CommercialAd {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  position: 'banner' | 'sidebar' | 'featured';
  duration: number; // days
  price: number;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  expiryDate: string;
}

export interface Payment {
  id: string;
  type: 'boost' | 'commercial';
  itemId?: string;
  adId?: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  paymentMethod: string;
}

export interface Analytics {
  totalItems: number;
  activeItems: number;
  totalViews: number;
  totalEarnings: number;
  mostViewedItems: Item[];
  recentActivity: string[];
  boostRevenue: number;
  commercialRevenue: number;
}

export const boostPackages: BoostPackage[] = [
  {
    id: '1',
    name: 'Basic Boost',
    duration: 7,
    price: 9.99,
    features: ['2x visibility', 'Priority in search', 'Featured badge'],
    multiplier: 2
  },
  {
    id: '2',
    name: 'Premium Boost',
    duration: 14,
    price: 19.99,
    features: ['3x visibility', 'Top of search results', 'Featured badge', 'Social media promotion'],
    multiplier: 3
  },
  {
    id: '3',
    name: 'Ultimate Boost',
    duration: 30,
    price: 39.99,
    features: ['5x visibility', 'Homepage featured', 'Top of search results', 'Featured badge', 'Social media promotion', 'Email newsletter'],
    multiplier: 5
  }
];

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'Luxury Apartment Downtown',
    description: 'Beautiful 2-bedroom apartment in the heart of the city',
    price: 1200,
    category: 'Apartment',
    status: 'active',
    views: 245,
    likes: 18,
    createdAt: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    location: 'Downtown',
    type: 'rent',
    isBoosted: true,
    boostExpiry: '2024-02-15'
  },
  {
    id: '2',
    title: 'Cozy Studio Near University',
    description: 'Perfect for students, fully furnished studio apartment',
    price: 800,
    category: 'Studio',
    status: 'active',
    views: 189,
    likes: 12,
    createdAt: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
    location: 'University District',
    type: 'rent'
  },
  {
    id: '3',
    title: 'Modern House for Sale',
    description: '3-bedroom house with garden and garage',
    price: 350000,
    category: 'House',
    status: 'sold',
    views: 567,
    likes: 45,
    createdAt: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
    location: 'Suburbs',
    type: 'sale'
  },
  {
    id: '4',
    title: 'Office Space Downtown',
    description: 'Professional office space for rent',
    price: 2500,
    category: 'Commercial',
    status: 'inactive',
    views: 123,
    likes: 8,
    createdAt: '2024-01-25',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    location: 'Business District',
    type: 'rent',
    isCommercial: true
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    itemId: '1',
    userName: 'John Doe',
    message: 'Great location and very clean apartment!',
    rating: 5,
    createdAt: '2024-01-16',
    status: 'approved'
  },
  {
    id: '2',
    itemId: '1',
    userName: 'Sarah Smith',
    message: 'Is parking included in the rent?',
    rating: 4,
    createdAt: '2024-01-17',
    status: 'pending'
  },
  {
    id: '3',
    itemId: '2',
    userName: 'Mike Johnson',
    message: 'Perfect for students, highly recommend!',
    rating: 5,
    createdAt: '2024-01-21',
    status: 'approved'
  }
];

export const mockCommercialAds: CommercialAd[] = [
  {
    id: '1',
    title: 'Premium Real Estate Services',
    description: 'Professional property management and consultation',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
    link: 'https://example.com',
    position: 'banner',
    duration: 30,
    price: 299.99,
    status: 'active',
    createdAt: '2024-01-01',
    expiryDate: '2024-02-01'
  },
  {
    id: '2',
    title: 'Home Insurance Solutions',
    description: 'Protect your property with comprehensive coverage',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    link: 'https://example.com',
    position: 'sidebar',
    duration: 14,
    price: 149.99,
    status: 'active',
    createdAt: '2024-01-10',
    expiryDate: '2024-01-24'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    type: 'boost',
    itemId: '1',
    amount: 19.99,
    status: 'completed',
    createdAt: '2024-01-15',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    type: 'commercial',
    adId: '1',
    amount: 299.99,
    status: 'completed',
    createdAt: '2024-01-01',
    paymentMethod: 'PayPal'
  }
];

export const mockAnalytics: Analytics = {
  totalItems: 4,
  activeItems: 2,
  totalViews: 1124,
  totalEarnings: 4500,
  mostViewedItems: mockItems.sort((a, b) => b.views - a.views).slice(0, 3),
  recentActivity: [
    'New comment on "Luxury Apartment Downtown"',
    'Item "Modern House for Sale" marked as sold',
    'New inquiry for "Cozy Studio Near University"',
    'Item "Office Space Downtown" deactivated',
    'Boost activated for "Luxury Apartment Downtown"',
    'Commercial ad "Premium Real Estate Services" published'
  ],
  boostRevenue: 319.97,
  commercialRevenue: 449.98
};