import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RENTAL_CATEGORIES } from '@/data/categories';
import { RentalCategory } from '@/types/rental';

interface CategoryGridProps {
  onCategorySelect: (category: RentalCategory) => void;
}

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold  -mt-4">What are you looking to rent?</h2>
        <p className="text-muted-foreground mt-2">
          Choose from our wide range of rental categories
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {RENTAL_CATEGORIES.map((category) => (
          <Card 
            key={category.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
              <Badge variant="secondary" className={`${category.color} text-white text-xs`}>
                {category.subcategories.length} types
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}