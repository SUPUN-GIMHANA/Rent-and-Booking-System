import { useState } from 'react';
import { RentalItem, FilterOptions } from '@/types/rental';
import { BookingData } from '@/types/booking';
import RentalCard from '@/components/rental/RentalCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import BookingModal from '@/components/booking/BookingModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Grid, List, MapPin } from 'lucide-react';

interface SearchResultsProps {
  items: RentalItem[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  searchQuery: string;
  location: string;
}

export default function SearchResults({ 
  items, 
  filters, 
  onFiltersChange, 
  searchQuery, 
  location 
}: SearchResultsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

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
    // In a real app, this would open a chat/messaging interface
    console.log('Contact owner:', ownerId);
  };

  const handleConfirmBooking = (bookingData: BookingData) => {
    // In a real app, this would process the booking
    console.log('Booking confirmed:', bookingData);
    setSelectedItem(null);
    // Show success message
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 100000],
      sortBy: 'newest'
    });
  };

  const filteredItems = items.filter(item => {
    // Apply filters
    if (filters.category && item.category !== filters.category) return false;
    if (filters.subcategory && item.subcategory !== filters.subcategory) return false;
    if (filters.rating && item.averageRating < filters.rating) return false;
    if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) return false;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.subcategory.toLowerCase().includes(query) ||
        item.location.city.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.averageRating - a.averageRating;
      case 'distance':
        // In a real app, this would calculate actual distance
        return 0;
      case 'newest':
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Rentals'}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{sortedItems.length} items found</span>
            {location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>in {location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex items-center space-x-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`md:w-80 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <FilterSidebar
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Results Grid/List */}
        <div className="flex-1">
          {sortedItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground mb-4">
                  <Grid className="h-12 w-12 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {sortedItems.map((item) => (
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
          )}
        </div>
      </div>

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