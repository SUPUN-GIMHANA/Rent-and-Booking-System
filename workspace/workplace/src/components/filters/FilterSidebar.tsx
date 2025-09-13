import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FilterOptions, RentalCategory } from '@/types/rental';
import { RENTAL_CATEGORIES } from '@/data/categories';
import { Star, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({ filters, onFiltersChange, onClearFilters }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);

  const handleCategoryChange = (category: RentalCategory, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : undefined
    });
  };

  const handleSubcategoryChange = (subcategory: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      subcategory: checked ? subcategory : undefined
    });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    onFiltersChange({
      ...filters,
      priceRange: value
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating
    });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy
    });
  };

  const getSelectedCategory = () => {
    return RENTAL_CATEGORIES.find(cat => cat.id === filters.category);
  };

  const hasActiveFilters = () => {
    return filters.category || filters.subcategory || filters.rating || 
           filters.priceRange[0] > 0 || filters.priceRange[1] < 100000;
  };

  return (
    <div className="space-y-4">
      {/* Active Filters */}
      {hasActiveFilters() && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getSelectedCategory()?.name}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCategoryChange(filters.category!, false)}
                  />
                </Badge>
              )}
              {filters.subcategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.subcategory}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleSubcategoryChange(filters.subcategory!, false)}
                  />
                </Badge>
              )}
              {filters.rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.rating}+ Stars
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRatingChange(filters.rating!)}
                  />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Nearest First</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {RENTAL_CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.category === category.id}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <label htmlFor={category.id} className="text-sm font-medium cursor-pointer">
                {category.icon} {category.name}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Subcategory Filter */}
      {filters.category && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Subcategory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getSelectedCategory()?.subcategories.map((subcategory) => (
              <div key={subcategory} className="flex items-center space-x-2">
                <Checkbox
                  id={subcategory}
                  checked={filters.subcategory === subcategory}
                  onCheckedChange={(checked) => 
                    handleSubcategoryChange(subcategory, checked as boolean)
                  }
                />
                <label htmlFor={subcategory} className="text-sm cursor-pointer">
                  {subcategory}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range (LKR)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>LKR {priceRange[0].toLocaleString()}</span>
            <span>LKR {priceRange[1].toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">& up</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}