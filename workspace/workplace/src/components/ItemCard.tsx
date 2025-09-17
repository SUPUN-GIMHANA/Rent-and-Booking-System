import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Item } from '@/lib/mockData';
import { MoreHorizontal, Eye, Heart, MapPin, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onEdit?: (item: Item) => void;
  onDelete?: (itemId: string) => void;
  onToggleStatus?: (itemId: string) => void;
}

export function ItemCard({ item, onEdit, onDelete, onToggleStatus }: ItemCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: () => void) => {
    setIsLoading(true);
    try {
      action();
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <Badge className={`absolute top-2 right-2 ${getStatusColor(item.status)}`}>
            {item.status}
          </Badge>
          <Badge variant="outline" className="absolute top-2 left-2 bg-white">
            {item.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${item.price.toLocaleString()}
              {item.type === 'rent' && <span className="text-sm font-normal">/month</span>}
            </span>
            <Badge variant="outline">{item.category}</Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{item.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" disabled={isLoading}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={() => handleAction(() => onEdit(item))}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            )}
            {onToggleStatus && (
              <DropdownMenuItem onClick={() => handleAction(() => onToggleStatus(item.id))}>
                {item.status === 'active' ? (
                  <>
                    <ToggleLeft className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <ToggleRight className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                onClick={() => handleAction(() => onDelete(item.id))}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}