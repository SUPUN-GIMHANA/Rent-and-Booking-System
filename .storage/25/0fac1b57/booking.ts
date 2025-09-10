export interface BookingData {
  itemId: string;
  date: string;
  timeSlot?: {
    start: string;
    end: string;
    available: boolean;
    price?: number;
  };
  totalPrice: number;
  bookingType: 'single' | 'multiple';
}