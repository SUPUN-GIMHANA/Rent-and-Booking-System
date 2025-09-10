import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RentalItem, TimeSlot } from '@/types/rental';
import { CalendarDays, Clock, CreditCard, MapPin, Star } from 'lucide-react';

interface BookingModalProps {
  item: RentalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (bookingData: any) => void;
}

export default function BookingModal({ item, isOpen, onClose, onConfirmBooking }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [bookingType, setBookingType] = useState<'single' | 'multiple'>('single');

  if (!item) return null;

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return item.availability.some(slot => slot.date === dateStr && slot.available);
  };

  const getTimeSlots = () => {
    if (!selectedDate) return [];
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    const dayAvailability = item.availability.find(slot => slot.date === dateStr);
    
    if (item.category === 'vehicles') {
      return item.timeSlots || [];
    } else if (item.category === 'playgrounds') {
      return dayAvailability?.timeSlots || [];
    }
    
    return [];
  };

  const calculateTotal = () => {
    if (!selectedDate) return 0;
    
    if (selectedTimeSlot) {
      return selectedTimeSlot.price || item.price;
    }
    
    return item.price;
  };

  const handleBooking = () => {
    if (!selectedDate) return;
    
    const bookingData = {
      itemId: item.id,
      date: selectedDate.toISOString().split('T')[0],
      timeSlot: selectedTimeSlot,
      totalPrice: calculateTotal(),
      bookingType
    };
    
    onConfirmBooking(bookingData);
  };

  const timeSlots = getTimeSlots();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {item.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item Details */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <img 
                  src={item.images[0]} 
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{item.averageRating}</span>
                  <span className="text-sm text-muted-foreground">({item.ratings.length})</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location.address}</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Nearby Places:</h4>
                  {item.location.nearbyPlaces.slice(0, 3).map((place) => (
                    <div key={place.name} className="flex justify-between text-xs">
                      <span>{place.name}</span>
                      <span className="text-muted-foreground">{place.distance}km</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Interface */}
          <div className="md:col-span-2 space-y-4">
            {/* Calendar */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <CalendarDays className="h-5 w-5 mr-2" />
                Select Date
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => !isDateAvailable(date) || date < new Date()}
                className="rounded-md border"
              />
            </div>

            {/* Time Slots */}
            {timeSlots.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Select Time Slot
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      className="justify-between"
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      <span>{slot.start} - {slot.end}</span>
                      {slot.price && (
                        <span>LKR {slot.price.toLocaleString()}</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Summary */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Booking Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Item:</span>
                    <span>{item.title}</span>
                  </div>
                  
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{selectedDate.toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {selectedTimeSlot && (
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTimeSlot.start} - {selectedTimeSlot.end}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>LKR {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleBooking}
            disabled={!selectedDate}
            className="flex items-center"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}