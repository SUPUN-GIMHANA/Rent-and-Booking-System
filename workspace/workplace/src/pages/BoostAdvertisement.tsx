import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockItems, boostPackages, Item, BoostPackage } from '@/lib/mockData';
import { Zap, TrendingUp, Star, Clock, CreditCard, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function BoostAdvertisement() {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const activeItems = mockItems.filter(item => item.status === 'active');
  const boostedItems = mockItems.filter(item => item.isBoosted);

  const handleBoostItem = async () => {
    if (!selectedItem || !selectedPackage) {
      toast.error('Please select an item and boost package');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Item boosted successfully with ${selectedPackage.name}!`);
      setIsPaymentOpen(false);
      setSelectedItem('');
      setSelectedPackage(null);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getItemById = (id: string): Item | undefined => {
    return mockItems.find(item => item.id === id);
  };

  const isItemBoosted = (item: Item): boolean => {
    return item.isBoosted && item.boostExpiry ? new Date(item.boostExpiry) > new Date() : false;
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Zap className="h-8 w-8 text-yellow-500" />
                Boost Advertisement
              </h1>
              <p className="text-muted-foreground">
                Increase visibility and get more views for your listings
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{boostedItems.length}</p>
                    <p className="text-sm text-muted-foreground">Boosted Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">+{boostedItems.reduce((sum, item) => sum + item.views, 0)}</p>
                    <p className="text-sm text-muted-foreground">Boost Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$319.97</p>
                    <p className="text-sm text-muted-foreground">Boost Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Boost Packages */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Boost Packages</h2>
              <div className="space-y-4">
                {boostPackages.map((pkg) => (
                  <Card key={pkg.id} className={`cursor-pointer transition-all ${
                    selectedPackage?.id === pkg.id ? 'ring-2 ring-primary' : ''
                  }`} onClick={() => setSelectedPackage(pkg)}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          {pkg.name}
                        </CardTitle>
                        <Badge variant="outline">{pkg.duration} days</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-primary">${pkg.price}</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {pkg.multiplier}x visibility
                        </Badge>
                      </div>
                      
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Select Item to Boost */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Select Item to Boost</h2>
              
              <div className="space-y-4">
                <Select value={selectedItem} onValueChange={setSelectedItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an item to boost" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.title} - ${item.price.toLocaleString()}
                        {isItemBoosted(item) && ' (Currently Boosted)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedItem && (
                  <Card>
                    <CardContent className="p-4">
                      {(() => {
                        const item = getItemById(selectedItem);
                        if (!item) return null;
                        
                        return (
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.location}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{item.views} views</Badge>
                                {isItemBoosted(item) && (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Boosted
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}

                <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      size="lg"
                      disabled={!selectedItem || !selectedPackage}
                      onClick={() => setIsPaymentOpen(true)}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Boost Now - ${selectedPackage?.price || 0}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Complete Payment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold">Order Summary</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Package:</span>
                            <span>{selectedPackage?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{selectedPackage?.duration} days</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${selectedPackage?.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={handleBoostItem}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Pay with Credit Card'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handleBoostItem}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Pay with PayPal'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Currently Boosted Items */}
          {boostedItems.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Currently Boosted Items</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {boostedItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Zap className="h-3 w-3 mr-1" />
                              Boosted
                            </Badge>
                            {item.boostExpiry && (
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Until {new Date(item.boostExpiry).toLocaleDateString()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}