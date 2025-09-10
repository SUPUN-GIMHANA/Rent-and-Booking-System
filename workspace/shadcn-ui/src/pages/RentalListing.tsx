import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import SearchResults from '@/components/search/SearchResults';
import { mockRentalItems } from '@/data/mockData';
import { FilterOptions, RentalCategory } from '@/types/rental';

export default function RentalListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentLocation, setCurrentLocation] = useState('Colombo, Sri Lanka');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') as RentalCategory || undefined,
    priceRange: [0, 100000],
    sortBy: 'newest'
  });

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams(prev => {
      if (query) {
        prev.set('q', query);
      } else {
        prev.delete('q');
      }
      return prev;
    });
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setSearchParams(prev => {
      if (newFilters.category) {
        prev.set('category', newFilters.category);
      } else {
        prev.delete('category');
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onLocationSelect={handleLocationSelect}
        onSearch={handleSearch}
        currentLocation={currentLocation}
      />
      
      <SearchResults
        items={mockRentalItems}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        searchQuery={searchQuery}
        location={currentLocation}
      />
    </div>
  );
}