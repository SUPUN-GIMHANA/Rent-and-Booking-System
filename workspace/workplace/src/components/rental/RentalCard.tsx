import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RentalItem } from '@/types/rental';
import {Heart,Star,MapPin,Clock,Shield,MessageCircle,Calendar} from 'lucide-react';

interface RentalCardProps {
  item: RentalItem;
  onBookNow: (item: RentalItem) => void;
  onToggleFavorite: (itemId: string) => void;
  onContact: (ownerId: string) => void;
  isFavorite?: boolean;
}

export default function RentalCard({item, onBookNow, onContact, isFavorite = false}: RentalCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number, type: string) => {
    return `LKR ${price.toLocaleString()}/${type.replace('ly', '')}`;
  };

  const getAvailabilityStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAvailability = item.availability.find(slot => slot.date === today);
    return todayAvailability?.available ? 'Available Today' : 'Check Calendar';
  };

  function onToggleFavorite(id: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Image Carousel */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.images[currentImageIndex]} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
        
        {/* Image Indicators */}
        {item.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {item.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onToggleFavorite(item.id)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>

        {/* Verified Badge */}
        {item.isVerified && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.averageRating}</span>
            <span className="text-sm text-muted-foreground">({item.ratings.length})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{item.location.city}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Owner Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.owner.avatar} alt={item.owner.name} />
              <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{item.owner.name}</p>
              <p className="text-xs text-muted-foreground">
                Response: {item.owner.responseTime}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContact(item.owner.id)}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Reviews
          </Button>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {item.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{item.amenities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(item.price, item.priceType)}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Calendar className="h-4 w-4" />
            <span className={`${getAvailabilityStatus() === 'Available Today' ? 'text-green-600' : 'text-orange-600'}`}>
              {getAvailabilityStatus()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          onClick={() => onBookNow(item)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}